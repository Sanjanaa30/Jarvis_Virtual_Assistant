// src/pages/Customize.jsx
import React, { useRef, useState, useContext } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { LuImagePlus } from "react-icons/lu";
import { userDataContext } from "../context/userContext";

function Customize() {
  const {
    serverUrl,
    setUserData,
    userData,
    loadingUser,
    refreshUser: handleCurrentUser,
  } = useContext(userDataContext);

  // local state for image handling
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);

  const inputImage = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-gradient-to-t from-black to-[#030353c5]
        flex flex-col items-center justify-center
        px-4
      "
    >
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 mt-5 text-center">
        Select Your Assistant&apos;s Appearance
      </h1>

      <div
        className="
          w-full max-w-5xl
          flex flex-wrap justify-center items-center
          gap-3 sm:gap-4 md:gap-6
          pt-6 sm:pt-8 md:pt-10
        "
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload card */}
        <div
          className="
            w-20 h-32
            sm:w-24 sm:h-36
            md:w-28 md:h-44
            lg:w-36 lg:h-56
            bg-[#030326]
            border-2 border-[blue]
            rounded-2xl
            overflow-hidden
            cursor-pointer
            flex items-center justify-center
            hover:border-4 hover:border-white
            hover:shadow-2xl hover:shadow-blue-600
            hover:scale-105
            transition-transform duration-300
          "
          onClick={() => inputImage.current?.click()}
        >
          {!frontendImage && <LuImagePlus className="text-white w-2/3 h-2/3" />}
          {frontendImage && (
            <img
              src={frontendImage}
              alt="Uploaded"
              className="h-full w-full object-cover rounded-2xl"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      <button
        type="button"
        className="
          inline-flex items-center justify-center
          mt-5
          px-8 md:px-8
          py-2.5 md:py-3
          bg-white
          text-black
          text-base md:text-lg
          rounded-full
          shadow-sm
          hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black
          transition-colors duration-200 font-bold
        "
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
