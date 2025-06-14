import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: null,
        min: 1,
        max: 5,
    },
    reviews: {
        type: Number,
        default: null,
    },
    price: {
        type: Number,
        required: true,
    },
    mentorName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
