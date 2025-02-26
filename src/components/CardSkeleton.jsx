import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => (
  <Card className="mt-6 dark:bg-gray-700">
    <CardHeader className="h-56">
      <Skeleton width="100%" height="100%" />
    </CardHeader>
    <CardBody>
      <Skeleton count={3} className="mb-2" />
    </CardBody>
    <CardFooter>
      <Skeleton width={100} height={30} />
    </CardFooter>
  </Card>
);

export default CardSkeleton;
