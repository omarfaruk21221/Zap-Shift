import React from "react";

const ReviewCard = ({ review }) => {
  const { userName, user_photoURL, review: testimonial, user_email } = review;
  return (
    <div className="max-w-sm bg-base-100 p-6 rounded-xl shadow-xl ">
      {/* Quote icon */}
      <div className="text-teal-600 text-4xl leading-none mb-3">“</div>

      {/* Review text */}
      <p className="text-gray-600 leading-relaxed mb-4">{testimonial}</p>

      {/* Dashed line */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile section */}
      <div className="flex items-center gap-3">
        {/* Circle icon */}
        <div className="w-15 h-15 bg-secondary p-1 rounded-full">
          <img className="rounded-full" src={user_photoURL} alt={userName} />
        </div>

        {/* User details */}
        <div>
          <h4 className="font-semibold text-teal-800">{userName}</h4>
          <p className="text-gray-500 text-sm">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
