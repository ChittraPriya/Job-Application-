const applicationSchema = new mongoose.Schema({
    applicant: { required: true },
    status: { type: String, 
        enum: ['applied', 'reviewing', 'interview', 'rejected', 'accepted'], defalut: 'applied',
    },
    coverLetter: {type: String},
    resume: { type: String },
    appliedAt: { type: String, default: Date.Now},
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reviewedAt: { type: Date},
    notes: { type: String}
}, {timestamps: true})

//Compound index to ensure a user can apply on;ly once for the job

module.exports = mongoose.model( 'Application', applicationSchema , 'applications')