const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className=" border-y-2 border-gray-500 w-2/3 mx-auto p-4">
      <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-700 mb-3">
        ---{heading}---
      </h1>
      <p className="text-sm lg:text-md text-center text-gray-500">
        {subHeading}
      </p>
    </div>
  );
};

export default SectionTitle;
