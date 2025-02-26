import { Link } from "react-router-dom";
import dogImg from "../assets/bannerGirlPet2.png";
import SectionTitle from "./SectionTitle";

const CallToAction = () => {
  return (
    <div className="w-[100%] mx-auto flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 py-10">
      <SectionTitle
        heading={"Adopt a Companion"}
        subHeading={"Find a Friend, Love Your Life"}
      />
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center bg-gray-200 dark:bg-gray-800 lg:px-12 py-4 rounded-lg">
        <div className="flex flex-col gap-4 items-left lg:items-start px-8 lg:px-16 justify-start">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Adopt Love, Give Hope
          </h1>
          <p className="text-gray-800 dark:text-gray-300">
            At <span className="font-semibold">POWTOPIA</span>, we believe that
            every pet deserves a loving home and a second chance at happiness.
            When you choose to adopt, you’re not just welcoming a furry friend
            into your life – you’re giving hope to a soul who’s been waiting for
            love. These loyal companions have so much affection to give, and
            they’ll fill your days with joy, laughter, and unconditional
            friendship. By adopting, you’re making a difference, saving a life,
            and gaining a loyal family member who will be forever grateful. Open
            your heart, adopt love, and let your journey of unforgettable
            memories begin.
            <span className="font-semibold">POWTOPIA</span> – because every paw
            deserves a place to call home.
          </p>
          <Link to="/petListing">
            <button className="w-full border-2 my-2 bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition cursor-pointer">
              Adopt a Pet
            </button>
          </Link>
        </div>
        <img
          src={dogImg}
          alt="Adopt a Pet"
          className="h-[300px] lg:h-[500px] bg-purple-800 rounded-full shadow-md dark:shadow-gray-700"
        />
      </div>
    </div>
  );
};

export default CallToAction;
