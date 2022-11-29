import React from 'react';
import { Main } from '../components/Main';
import Footer from './Footer';
import Header from './Header';
import { ToastContainer, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        limit={10}
        transition={Zoom}
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
