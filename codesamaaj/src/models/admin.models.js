import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

    canGiveFeedback: {
        type: Boolean,
        default: false,
    },
    descriptionCharLimit: {
        type: Number,
        default: 200,
    }

})

const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;