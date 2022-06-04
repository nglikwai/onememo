import Room from '../models/room'
import Todo from '../models/todo'

import cloudinary from 'cloudinary'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Create all rooms   =>   /api/rooms
const getAllTodo = catchAsyncErrors(async (req, res) => {
    let { status } = req.query
    if (req.query.status == '') {
        status = ['completed', 'important', 'nonCompleted']
    }
    const todo = await Todo.find({ user: req.user._id, todo: { $regex: req.query.text }, status })


    res.status(200).json({ success: true, todo })

})



// Create a new review   =>   /api/reviews
const newTodo = catchAsyncErrors(async (req, res) => {

    const todo = req.body;

    const data = { ...todo, "user": req.user._id }
    const newTodo = await Todo.create(data);

    res.status(200).json({
        success: true,
    })

})





// Delete room review - ADMIN   =>   /api/reviews
const deleteTodo = catchAsyncErrors(async (req, res) => {

    await Todo.findByIdAndDelete(req.query.id)
    res.status(200).json({
        success: true
    })

})

const updateTodo = catchAsyncErrors(async (req, res) => {
    await Todo.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })

})


export {
    getAllTodo,
    newTodo,
    deleteTodo,
    updateTodo
}