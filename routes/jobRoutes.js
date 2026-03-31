const express = require('express')
const { getAllJobs, getJobById, createJob, deleteJob, updateJob, getRecruiterJobs, getJobApplicationzxc, getJobApplication } = require('../controllers/jobController');
const { isAuthenticated, allowRoles } = require('../middlewares/auth');

const jobRouter = express.Router()

//public Routes
jobRouter.get('/', getAllJobs);
jobRouter.get('/:id', getJobById);

//protected Routes
jobRouter.post('/', isAuthenticated, allowRoles(["recruiter"]), createJob);
jobRouter.put('/:id',isAuthenticated, allowRoles(["recruiter"]), updateJob);
jobRouter.delete('/:id',isAuthenticated,allowRoles(["recruiter"]), deleteJob);
jobRouter.get('/recruiter/jobs', isAuthenticated, allowRoles(["recruiter"]),getRecruiterJobs);
jobRouter.get('/recruiter/jobs/:id/applications', isAuthenticated,allowRoles(["recruiter"]), getJobApplication)

module.exports = jobRouter