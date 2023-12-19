import {connect,disconnect} from "../../../dbConfig/dbConfig";
import ChangeModel from "../../../models/changeModel";
import { NextResponse } from "next/server";
import axios from 'axios';


export async function POST(req,res){
    try{
        await connect();
        const allChangeModel=await ChangeModel.find({});
        // const regionID=allChangeModel.
        console.log(allChangeModel);

        // for(const singleChangeImages of allChangeModel){
        //     const image1=singleChangeImages['imageData1'];
        //     const image2=singleChangeImages['imageData2'];

        //     const changeModelPrediction = await axios.post("http://localhost:8080/generate_heatmap",{
        //         image1:image1,
        //         image2:image2
        //     })

        //     console.log(changeModelPrediction);

        //     const updateChangeModel = ChangeModel.updateOne({regionId})
        // }
    }
    catch(err){
        console.log("Error in calling Change detection model");
        NextResponse.json({
            "message":"Error in calling Change detection model",
            "success":false
        },{status:500})
    }
}