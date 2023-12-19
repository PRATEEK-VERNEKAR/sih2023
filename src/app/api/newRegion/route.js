import { connect, disconnect} from '@/dbConfig/dbConfig'
import Border from "../../../models/borderModel";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        await connect();
        const {regionID,name,states,neighborCountry,area,borderLength,govtBodies,roads,buildings,aircrafts,vehicles}=await req.json();
        const thershold = [buildings,0,roads,vehicles,aircrafts]
        
        const newRegion=new Border({regionID,name,states,neighborCountry,area,borderLength,govtBodies,thershold});

        console.log(govtBodies);
        // console.log("\n\nINDIA\n\n");
        const savedNewRegion = await newRegion.save()

        await disconnect()

        return NextResponse.json({
            message:"New Region Added",
            savedNewRegion
        })
    }
    catch(err){
        // console.log(err);
        return NextResponse.staus(500).json({
            message:"Error saving new region",
        })
    }
}