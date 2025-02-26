import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "./SectionTitle";

const PetCategory = () => {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const res = await axiosPublic.get("/pets");

      // Remove duplicate categories
      const uniqueCategories = [];
      const seenCategories = new Set();

      res.data.forEach((item) => {
        if (!seenCategories.has(item.category)) {
          seenCategories.add(item.category);
          uniqueCategories.push(item);
        }
      });

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="pt-4">
      <SectionTitle
        heading={"Explore Pet Categories"}
        subHeading={
          "Explore pet categories like Cats, Dogs, Rabbits, and Fish."
        }
      />

      {/* Category Section */}
      <div className="w-11/12 mx-auto mt-4">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          centeredSlides={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={4000}
          modules={[Pagination, Autoplay]}
          className="mySwiper mb-12"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <Link to={`/category/${item.category}`}>
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-32 lg:h-64 object-cover rounded-lg"
                />
                <h3 className="lg:text-xl uppercase text-center -mt-12 bg-gray-800 opacity-70 text-white px-2 py-1 rounded-lg inline-block w-full">
                  {item.category}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PetCategory;
