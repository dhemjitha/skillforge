import mongoose from 'mongoose';

const cohortSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Cohort = mongoose.models.Cohort || mongoose.model("Cohort", cohortSchema);

export default Cohort;