import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Header from "../components/Header";



const Home = () => {
  
  return (
    
    <div>
 <Header/>
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: ` url('https://i.pinimg.com/1200x/c4/21/ff/c421ff0fa2d163b0464b91c131369d2a.jpg')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{ width: "400px", height: "150px" }}
          className="text-center p-4 rounded"
        >
          <h3 className="mt-1 text-white text-5xl">Wonderful Gifts</h3>
          <h6 className="mt-2 text-white text-lg">
            Give your family and friends a book
          </h6>

          <div className="mt-5">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search books"
                className="border px-3 py-2 rounded-lg w-full pr-10 bg-white"
              />

              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="mt-5 me-2">
        <h4 className="text-center">NEW ARRIVALS</h4>

        <h2 className="text-center">Explore Our Latest Collection</h2>

        {/* //cardse section */}

        <div className="text-center mt-3"></div>

        {/* end of second section   */}
      </div>
      {/* third section */}
      <div className="flex justify-evenly gap-8 px-4 py-12 items-center ">
        <div className="max-w-xl">
          <h4 className="mt-4 text-center">FEATURED AUTHORS</h4>
          <h3 className="mt-4 text-center">Captivates with every word</h3>

          <p className="mt-4 ms-10">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Nesciunt fuga nostrum illum distinctio
            eum quidem recusandae soluta aliquam laboriosam odit quas, nam
            molestias fugiat culpa rem nulla iste? Modi, molestias. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Sunt earum possimus
            accusantium necessitatibus id neque soluta quibusdam explicabo
            laborum? Deserunt vel quia voluptates dicta incidunt illo fuga
            pariatur sequi error.
          </p>
        </div>
        <div className="w-1/2">
          <img
            className="w-100 ms-30 rounded"
            src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
            alt=""
          />
        </div>
      </div>
      <div>
        <h5 className="text-center">TESTIMONIALS</h5>

        <h3 className="text-center">See What Others Are Saying</h3>
      </div>
      <div className=" p-4 rounded flex justify-center items-center me-8">
        <img
          className="w-40 h-40 rounded-full object-cover"
          src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
      </div>

      <h2 className="text-center">Treesa Joseph </h2>

      <div>
        <div className="ms-40 me-40 mt-5 text-justify">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro fuga
            optio libero voluptates aliquam quae officiis? Culpa excepturi
            neque, nihil dolorem suscipit temporibus, aspernatur amet non quasi
            animi similique doloremque! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aspernatur, illum odio eum dignissimos nostrum
            reprehenderit nihil totam debitis. Ratione quam excepturi
            perspiciatis ipsa corrupti suscipit nulla minus in asperiores sit?
          </p>
        </div>
      </div>



    </div>
  );
};

export default Home;
