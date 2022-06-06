import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { addFriend, searchUser, sendFriend, removeFriend } from '../../../controllers/friendControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();



handler
    .use(isAuthenticatedUser)
    .get(searchUser)

handler
    .use(isAuthenticatedUser)
    .put(addFriend)

handler
    .use(isAuthenticatedUser)
    .post(sendFriend)

handler
    .use(isAuthenticatedUser)
    .delete(removeFriend)


export default handler;