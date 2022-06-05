import User from '../models/user'
import Todo from '../models/Todo'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'


// Create all rooms   =>   /api/rooms
const searchUser = catchAsyncErrors(async (req, res) => {
    let { name } = req.query
    const user = await User.find({ name })
    res.status(200).json({ success: true, user })

})

const addFriend = catchAsyncErrors(async (req, res) => {
    let { name } = req.query
    const user = await User.findById(req.user._id)
    user.friendList.push(name)
    await user.save()
    const friend = await User.findOne({ name })
    console.log(friend)
    friend.friendList.push(user.name)
    await friend.save()
    res.status(200).json({ success: true })

})

const sendFriend = catchAsyncErrors(async (req, res) => {
    let { name, text } = req.query
    const user = await User.findOne({ name })
    await Todo.create({ todo: text, user: user._id, from: req.user.name })
    res.status(200).json({ success: true })

})


export {
    searchUser,
    addFriend,
    sendFriend
}