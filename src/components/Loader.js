import React from 'react'
import ReactDOM from 'react-dom/client';
import loaderGif from '../assets/images/searching.gif';

const Loader = () => {
  return ReactDOM.createPortal(
      <div className="wrapper">
          <div className="loader">
              <img src={loaderGif} alt="loading" />
          </div>
      </div>,
      document.getElementById("loader")
  )
}


export default Loader