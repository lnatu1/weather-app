interface SkeletonProps {
  rounded?: string;
  width?: string;
  height?: string;
}

const Skeleton = ({
  rounded = "rounded-lg",
  width = "70px",
  height = "10px",
}: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${rounded}`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
