import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job seeker are not allowed to access this resource",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllaplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role == "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed access to these resoures!",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role == "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed access to these resoures!",
          400
        )
      );
    }
    const { id } = req.params;
    const applicatonDelete = await Application.findById(id);
    if (!applicatonDelete) {
      return next(new ErrorHandler("Oops application not found!", 404));
    }
    await applicatonDelete.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appication deleted successfully",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler(
        "Employer are not allowed access to these resoures!",
        400
      )
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume file required"));
  }

  const { resume } = req.files;

  const allowedFormat = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormat.includes(resume.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type, please upload img/jpg/webp format",
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload resume", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  if (!jobId) {
    return next(new ErrorHandler("Job not found", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  if (
    !name ||
    !email ||
    !phone ||
    !coverLetter ||
    !address ||
    !employerID ||
    !resume ||
    !applicantID
  ) {
    return next(new ErrorHandler("Provide all information", 400));
  }
  const myapplication = await Application.create({
    name,
    email,
    phone,
    address,
    coverLetter,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application submitted",
    myapplication,
  });
});
