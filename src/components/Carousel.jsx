import React from "react";

const Carousel = () => {
  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="./images/auto1.jpg"
              className="d-block w-100"
              alt="auto1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="./images/auto2.jpg"
              className="d-block w-100"
              alt="auto2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="./images/auto3.jpg"
              className="d-block w-100"
              alt="auto3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
