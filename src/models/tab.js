import mongoose from 'mongoose';
const { Schema } = mongoose;

const TabSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dataPoints: {
        type : Array , 
        "default" : []
    },
    date: {
        type: Date,
        Default: Date.now
    }
});

export const Tab = mongoose.model('tab', TabSchema);