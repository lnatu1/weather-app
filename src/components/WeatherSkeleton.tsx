import Card from "./Card";
import Skeleton from "./Skeleton";

const ConditionSkeleton = () => {
  return (
    <div>
      <Skeleton width="70px" height="20px" />
      <div className="mt-2 flex justify-center">
        <Skeleton width="50px" height="15px" />
      </div>
    </div>
  );
};

const WeatherSkeleton = () => {
  return (
    <Card>
      <Skeleton width="70px" height="20px" />
      <div className="flex items-center justify-center gap-6 mt-4">
        <Skeleton width="100px" height="100px" rounded="rounded-full" />
        <div className="text-center">
          <Skeleton width="70px" height="20px" />
          <div className="mt-4">
            <Skeleton width="70px" height="20px" />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-center mt-8">
        <ConditionSkeleton />
        <ConditionSkeleton />
        <ConditionSkeleton />
      </div>
    </Card>
  );
};

export default WeatherSkeleton;
