import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

    canGiveFeedback: {
        type: Boolean,
        default: false,
    },
    descriptionCharLimit: {
        type: Number,
        default: 200,
    },
    description: {
        type: String,
        default: '',
    }

})

const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;