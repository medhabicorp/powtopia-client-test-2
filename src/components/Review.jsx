import React, { useEffect, useState } from "react";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SectionTitle from "./SectionTitle";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch the review data
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= reviews.length ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-gray-50 py-10 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <SectionTitle
          heading={"Heartwarming Words from Our Happy Clients"}
          subHeading={"See how our pet adopters found love and companionship!"}
        />

        <div className="relative overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-secondary hover:text-primary focus:outline-none z-10"
          >
            <FaArrowLeft />
          </button>

          {/* Review Cards */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center m-4">
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-secondary dark:text-white mb-2">
                    {review.name}
                  </h3>

                  <div className="flex justify-center items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < Math.round(review.rating)
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-info dark:text-gray-300 mb-4 text-sm">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-secondary hover:text-primary focus:outline-none z-10"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
