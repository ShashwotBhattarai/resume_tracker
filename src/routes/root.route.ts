import express, { Router } from "express";
import healthRoute from "./health.route";
import uploadCandidateInfoRoute from "./uploadCandidateInfo.route";
import generateS3UploadURL from "./generateS3UploadURL.route";
import getCandidateInfoRoute from "./getCandidateInfo.route";

const router: Router = express.Router();

router.use("/health", healthRoute);
router.use("/upload", uploadCandidateInfoRoute);
router.use("/uploadurl", generateS3UploadURL);
router.use("/getCandidateInfo", getCandidateInfoRoute);

export default router;
