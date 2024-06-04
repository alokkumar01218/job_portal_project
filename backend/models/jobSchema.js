import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title :{
        type: String,
        required : [true, "Please provide job title"],
        minLength: [3, "Must constain atlest 3 characters"],
        maxLength: [50, "Cannot exceed 50 characters"]
    },
    description: {
        type: String,
        required: true,
        minLength: [50, "Must have atleast 50 characters"],
        maxLength: [350, "Cannot exceed 350 characters"]
    },
    category: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Must contain atleast 4 digits"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary From must contain atleast 4 digits"],
        maxLength: [9, "Salary From cannot exceed 9 digits"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "slaryTo must contain atleast 4 digits"],
        maxLength: [9, "salaryTo cannot exceed 9 digits"]
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});
export const Job = mongoose.model("Job", jobSchema);