import { connect,disconnect } from '@/dbConfig/dbConfig';
import Border from '../../../models/borderModel';
import MonitorModel from '../../../models/moniteringModel';
import { NextResponse } from 'next/server';
export async function POST(req,res){
    
    await connect();
    const reqBody = await req.json();
    const {regionID} = reqBody;
    console.log("regionId is",regionID);
    
    const changes = await MonitorModel.findOne({regionID:regionID});
    

    const dateTimePairs = {};

    changes.imageData.forEach(item => {
    dateTimePairs[item.dateTime] = {
        image: item.image,
        classes: item.classes,
        output: item.output,
    };
    });


    return NextResponse.json(dateTimePairs);
}
