
import React from "react";
import FAQImg from "../assets/FAQ-img.png";

const FAQ = () => {
  return (
    <section className="FAQ-section">
      <div className="form-container ">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 ">
            <img src={FAQImg} alt="FAQ image" className="w-100" />
          </div>

          <div className=" col-sm-12 col-md-6 col-lg-6 ">
            <p className="title">FAQ</p>
            <p>
              Clarifying any room for confusion in the measurement entry form
              exporting,or the data visualization
            </p>

            <form className="container">
              <div className="row ">
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                  <input
                    type="text"
                    placeholder="Foad"
                    className="form-control rounded-pill"
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                  <input
                    type="text"
                    placeholder="Foad2003@gmail.com"
                    className="form-control rounded-pill"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12 ">
                  <input
                    type="text"
                    placeholder="Enter Your Form"
                    className="form-control rounded-pill"
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12 ">
                 <textarea name="" id="" className="form-control text-center" placeholder="How do i input where the knee is ?"></textarea>
                </div>
              </div>

              <button className="btn rounded-pill">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;