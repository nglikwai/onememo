const Todo = require('../models/todo');
const mongoose = require('mongoose');

const TodoList = ['hi', 'buy milk', '6252', '12pm, ss, meet terrance gym', 'pw:3123456', 'ac: boc 9294 5929 5929 9592', 'code:0719', 'hi', 'buy milk', '6252', '12pm, ss, meet terrance gym', 'pw:3123456', 'ac: boc 9294 5929 5929 9592', 'code:0719', 'hi', 'buy milk', '6252', '12pm, ss, meet terrance gym', 'pw:3123456', 'ac: boc 9294 5929 5929 9592', 'code:0719']


mongoose.connect('mongodb+srv://nglikwai:dse00com@cluster0.evmdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const seedTodos = async () => {
    try {

        await Todo.deleteMany();
        console.log('Todo are deleted');

        for (let todo of TodoList) {
            await Todo.create({ 'todo': todo })
        }




        console.log('All Todo are added.');

        process.exit()


    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

// const updateAll = async () => {
//     try {
//         Todo.updateMany({}, { avatar})

//         console.log('All updated.');

//         process.exit()
//     } catch (error) {
//         console.log(error.message);
//         process.exit()
//     }
// }

// updateAll()

