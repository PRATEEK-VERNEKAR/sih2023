import mongoose from "mongoose";

const moniteringModelSchema=mongoose.Schema({
    "regionID":{
        type:String,
        required:[true,"region id is required"]
    },
    "startDateTime":{
        type:Date
    },
    "imageData":[
        {
            "dateTime":{
                type:String
            },
            "image":{
                data:Buffer,
                contentType:String
            },
            "output":{
                data:Buffer,
                contentType:String
            },
            "classes":[Number],
            "predicted":Boolean,
            "sent":Boolean
        }
    ],
    "outputHeatImg":{
        "image":{
            data:Buffer,
            contentType:String
        }
    }
})

const MonitorModel=mongoose.models.monitormodels || mongoose.model('monitormodels',moniteringModelSchema);

export default MonitorModel;