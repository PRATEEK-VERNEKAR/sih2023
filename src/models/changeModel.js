import mongoose from "mongoose";

const changeModelSchema=mongoose.Schema({
    "regionID":{
        type:String,
        required:[true,"region id is required"]
    },
    "imageData1":{
        "dateTime":{
            type:String
        },
        "image":{
            data:Buffer,
            contentType:String
        },
        "predicted":Boolean
    },
    "imageData2":{
        "dateTime":{
            type:String
        },
        "image":{
            data:Buffer,
            contentType:String
        },
        "predicted":Boolean
    },
    "outputImg":{
        "image":{
            data:Buffer,
            contentType:String
        }
    }
})

const ChangeModel=mongoose.models.changemodels || mongoose.model('changemodels',changeModelSchema);

export default ChangeModel;