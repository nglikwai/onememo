import Room from '../models/room'
import Todo from '../models/todo'

import cloudinary from 'cloudinary'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Create all rooms   =>   /api/rooms
const getAllTodo = catchAsyncErrors(async (req, res) => {

    const todo = await Todo.find({ user: req.user._id, todo: { $regex: req.query.text } })


    res.status(200).json({ success: true, todo })

})


// Create new room   =>   /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {

    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/rooms',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })
})

// Get room details   =>   /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {

    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        room
    })
})


// Update room details   =>   /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {

    let room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    if (req.body.images) {

        // Delete images associated with the room
        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.v2.uploader.destroy(room.images[i].public_id)
        }

        let imagesLinks = []
        const images = req.body.images;

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bookit/rooms',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;

    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        room
    })

})


// Delete room   =>   /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {

    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    // Delete images associated with the room
    for (let i = 0; i < room.images.length; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
    }

    await room.remove();

    res.status(200).json({
        success: true,
        message: 'Room is deleted.'
    })

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


// Check Review Availability   =>   /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, room: roomId })

    let isReviewAvailable = false;
    if (bookings.length > 0) isReviewAvailable = true


    res.status(200).json({
        success: true,
        isReviewAvailable
    })

})



// Get all room reviews - ADMIN   =>   /api/reviews
const getRoomReviews = catchAsyncErrors(async (req, res) => {

    const room = await Room.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: room.reviews
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
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    newTodo,
    checkReviewAvailability,
    getRoomReviews,
    deleteTodo,
    updateTodo
}