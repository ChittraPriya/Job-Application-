const express = require('express')
const { isAuthenticated, allowRoles } = require('../middlewares/auth');
const { applyForJob, getUserApplications, updateApplicationStatus, getJobApplicationById } = require('../controllers/applicationController');

const applicationRouter = express.Router()

applicationRouter.use(isAuthenticated);

//user Routes
applicationRouter.post('/:jobId/apply', allowRoles(['user']), applyForJob);
applicationRouter.get('/', allowRoles(['user'], getUserApplications))

//recruiter routes
applicationRouter.put("/:applicationId", allowRoles(['recruiter']), updateApplicationStatus)

//shared routes -- user and recruiter 
applicationRouter.get('/:id', allowRoles(['user', 'recruiter']), getJobApplicationById)

module.exports = applicationRouter