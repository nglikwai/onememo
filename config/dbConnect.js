import mongoose from 'mongoose'

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    mongoose.connect("mongodb+srv://nglikwai:dse00com@cluster0.evmdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export default dbConnect;