// Card.jsx
import React from "react";

function Card({ image }) {
  return (
    <div
      className="
        w-15 h-25           /* mobile */
        sm:w-24 sm:h-36     /* small screens (≥640px) */
        md:w-28 md:h-44     /* medium screens (≥768px) */
        lg:w-36 lg:h-55     /* large screens (≥1024px) */
        bg-[#030326]
        border-2 border-[blue]
        rounded-2xl
        overflow-hidden
        cursor-pointer
        hover:border-4 hover:border-white
        hover:shadow-2xl hover:shadow-blue-600
        hover:scale-105
        transition-transform duration-300
      "
    >
      <img
        src={image}
        alt="card image"
        className="h-full w-full object-cover rounded-2xl"
      />
    </div>
  );
}

export default Card;
