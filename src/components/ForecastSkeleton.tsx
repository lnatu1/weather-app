import Card from "./Card";
import Skeleton from "./Skeleton";

const SkeletonLine = () => {
  return (
    <div className="mb-4">
      <Skeleton width="70px" height="10px" />
      <div className="flex items-center gap-4 font-medium mt-4">
        <Skeleton width="50px" height="10px" />
        <div className="flex items-center gap-4 text-gray-400">
          <Skeleton width="25px" height="25px" rounded="rounded-full" />
          <Skeleton width="150px" height="10px" rounded="rounded-full" />
        </div>
        <div className="ml-auto">
          <Skeleton width="50px" height="10px" />
        </div>
      </div>
    </div>
  );
};

const ForecastSkeleton = () => {
  return (
    <div className="mt-4">
      <Card>
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine />
      </Card>
    </div>
  );
};

export default ForecastSkeleton;
