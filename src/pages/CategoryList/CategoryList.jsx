import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useParams } from "react-router-dom";
import PetCard from "../../components/PetCard";

const CategoryList = () => {
  const { name } = useParams();

  const { data: pets, isPending } = useQuery({
    queryKey: ["pets", name],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/pets/category/${name}`
      );
      return res.data;
    },
    enabled: !!name, // Only fetch if name is not null or undefined
  });
  // console.log(pets)

  return (
    <div className="bg-gray-50 dark:bg-gray-900  py-10">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets?.map((pet) => (
            <PetCard key={pet._id} pet={pet}></PetCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
