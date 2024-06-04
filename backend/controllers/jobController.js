import { Job } from "../models/jobSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncerror.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker are not allowed to post jobs", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide all the information", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please either provide fixed salary or ranged salary")
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot enter both fixed salary and ranged salary")
    );
  }
  const postedBy = req.user._id;
  const jobPosts = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job posted successfully",
    jobPosts,
  });
});

export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker are not allowed to post jobs", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker are not allowed to post jobs", 400)
    );
  }
  const { id } = req.params;
  let jobUpdate = await Job.findById(id);
  if (!jobUpdate) {
    return next(new ErrorHandler("Oops job not found!", 404));
  }
  jobUpdate = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job updated successfullyl",
  });
});

export const deleteJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker are not allowed to delete jobs", 400)
    );
  }
  const { id } = req.params;
  const deleteJob = await Job.findById(id);
  if (!deleteJob) {
    return next(new ErrorHandler("Opps job not found", 404));
  }
  await deleteJob.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleJob = await Job.findById(id);
    if (!singleJob) {
      return next(new ErrorHandler("job not found", 404));
    }
    res.status(200).json({
      success: true,
      singleJob,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID/ Cast Error", 404));
  }
});
