import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { newTodo, getAllTodo, deleteTodo, updateTodo } from '../../../controllers/todoControllers'

import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .put(newTodo)


handler
    .use(isAuthenticatedUser)
    .get(getAllTodo)

handler
    .use(isAuthenticatedUser)
    .patch(updateTodo)


handler
    .use(isAuthenticatedUser)
    .delete(deleteTodo)

export default handler;