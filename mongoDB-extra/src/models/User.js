import mongoose from 'mopngoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

export default mongoose.model('User', userSchema);