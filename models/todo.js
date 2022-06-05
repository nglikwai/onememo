import mongoose from 'mongoose';
import timeZone from 'mongoose-timezone'

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: [
                'nonCompleted',
                'completed',
                'important',
            ]
        },
        default: 'nonCompleted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

todoSchema.plugin(timeZone);

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema)