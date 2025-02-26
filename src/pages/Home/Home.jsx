import React from "react";
import Bannar from "../../components/Bannar";
import CallToAction from "../../components/CallToAction";
import AboutUS from "../AboutUS/AboutUS";
import FrequentlyAsk from "../../components/FrequentlyAsk";
import Review from "../../components/Review";
import PetCategory from "../../components/PetCategory";
import FeaturedPets from "../../components/FeaturedPets";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Bannar></Bannar>
      <PetCategory></PetCategory>
      <FeaturedPets></FeaturedPets>
      <CallToAction></CallToAction>
      <AboutUS></AboutUS>
      <Review></Review>
      <FrequentlyAsk></FrequentlyAsk>
    </div>
  );
};

export default Home;
