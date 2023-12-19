// import MonitorModel from "../../../models/moniteringModel";
// import ChangeModel from "../../../models/changeModel";
// import {connect,disconnect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server'
// import axios from 'axios';



export async function GET(req,res){
    try{
        await connect();

        console.log("HI")

        // const changeModel=await ChangeModel.find({});
        // const monitorModel=await MonitorModel.find({});

        // console.log(monitorModel);

        return NextResponse.json({
            "message":"Saved Data successfully",
            "success":true
        },{status:200})
    }
    catch(err){
        return NextResponse.json({
            "message":"Error while saving image to change model",
            "success":false
        },{status:500})
    }
}