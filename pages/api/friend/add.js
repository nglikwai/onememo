import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { addFriend, searchUser, sendFriend } from '../../../controllers/friendControllers'
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


export default handler;