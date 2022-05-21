import '../styles/globals.css'
import '../i18n'
import { wrapper } from '../redux/store'

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
