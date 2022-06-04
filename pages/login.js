import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'

import { getSession } from 'next-auth/client'

export default function LoginPage() {
    return (

        <Login />

    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}