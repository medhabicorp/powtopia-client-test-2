import React from "react";
import vissionImg from "../../assets/About images/vission.jpg";
import impactImg from "../../assets/About images/impact.jpg";
import teamImg from "../../assets/About images/team.jpg";
import partnerImg from "../../assets/About images/partner.jpg";
import SectionTitle from "../../components/SectionTitle";

const AboutUS = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <SectionTitle
          heading={"About Us"}
          subHeading={
            "Lets tell you about our mission, teams, partner and work ethics"
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          <div className="text-center">
            <img
              src={vissionImg}
              alt="Vision and Mission"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold dark:text-white text-secondary">
              Our Vision and Mission
            </h3>
            <p className="mt-4 text-lg text-info dark:text-gray-300">
              We envision a world where every pet has a safe, loving home. Our
              mission is to bridge the gap between pets in need and families
              ready to provide them with love and care.
            </p>
          </div>
          <div className="text-center">
            <img
              src={impactImg}
              alt="Our Impact"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold dark:text-white text-secondary">
              Our Impact
            </h3>
            <p className="mt-4 text-lg text-info dark:text-gray-300">
              Thanks to our dedicated community, we’ve helped countless pets
              find their forever homes, making a positive impact one adoption at
              a time.
            </p>
          </div>
          <div className="text-center">
            <img
              src={teamImg}
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold dark:text-white text-secondary">
              Our Team
            </h3>
            <p className="mt-4 text-lg text-info dark:text-gray-300">
              Our passionate team works tirelessly to connect pets with loving
              families. Together, we make a difference in pets' lives every day.
            </p>
          </div>
          <div className="text-center">
            <img
              src={partnerImg}
              alt="Our Partners"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold dark:text-white text-secondary">
              Our Partners and Supporters
            </h3>
            <p className="mt-4 text-lg text-info dark:text-gray-300">
              We collaborate with trusted partners to expand our reach and
              provide better care and opportunities for pets in need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUS;
