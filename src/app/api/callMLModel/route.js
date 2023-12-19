import MonitorModel from "../../../models/moniteringModel";
import Border from "@/models/borderModel";
import {connect,disconnect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
import axios from 'axios';


const delay = (ms)=> new Promise((resolve)=>setTimeout(resolve,ms));


export async function GET(req,res){
    try{

        await connect();
        const allMonitorRegions=await MonitorModel.find({});
        const allRegisteredRegions=await Border.find({});
        console.log(allRegisteredRegions);
        // await disconnect()

        const alertRegionID=[];

        for(const singleRegion of allMonitorRegions){
            const imageData=singleRegion['imageData'];

            console.log("For region ",singleRegion.regionID);

            const singleRegisteredRegion=allRegisteredRegions.filter((item)=>{return item.regionID===singleRegion.regionID});
            const tempThreshold=singleRegisteredRegion[0].threshold;
            console.log(tempThreshold);


            for(const singleImageData of imageData){
                if(!singleImageData.predicted){

                    const modelPrediction=await axios.post("http://localhost:8080/predict",{
                        image:singleImageData.image.data
                    });
                    
                    console.log("\t\tImage ID :- ",singleImageData._id);
                    
                    const countMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                    
                    modelPrediction.data.classes.forEach((num)=>{
                        if (countMap.hasOwnProperty(num)) {
                            countMap[num]++
                        }
                    })

                    console.log(countMap);
                    
                    const countMapArray = Object.values(countMap)
                    
                    console.log("countMapArray :- ",countMapArray)
                
                    const updatedImageData=await MonitorModel.updateOne(
                        {"_id":singleRegion._id,"imageData._id":singleImageData._id},
                        {$set:{"imageData.$.classes":countMapArray,
                        "imageData.$.predicted":true,
                        "imageData.$.output.data":modelPrediction.data.result,
                        "imageData.$.sent":false}}    
                    )

                    console.log("updatedImageData :- ",updatedImageData);
                
                    // for(let i=0;i<6;i++){
                    //     if(countMap[i]>tempThreshold[i]){
                    //         alertRegionID.push(singleRegion.regionID);
                    //     }
                    // }
                    
                    // console.log(alertRegionID)
                }
                // await delay(10000);
            }
        }

        


        return NextResponse.json({"message":"Objects Predicted Successfully"});
    }
    catch(err){
        return NextResponse.json({"message":"Error calling ML Model"},{status:500})
    }
}
