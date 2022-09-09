import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { wrapper } from "../redux/store";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="main">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
