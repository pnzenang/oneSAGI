const StatItem = ({ count, icon, title, color, bcg, borderColor }) => {
  return (
    <div
      className={`h-40 md:h-48 xl:h-52  rounded-lg bg-base-200 shadow  border-b-8 ${borderColor} `}
    >
      <div>
        <div className="flex w-full items-center justify-between px-8 pt-8">
          <h3 className={`text-5xl lg:text-6xl xl:text-7xl font-bold ${color}`}>
            {count}
          </h3>

          <div
            className={`text-3xl md:text-4xl xl:text-5xl ${bcg} p-2 lg:p-4  rounded ${color}`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className="flex justify-center px-8 pt-4 ">
        <h3 className="truncate text-2xl md:text-3xl xl:text-4xl tex font-medium  capitalize">
          {title}
        </h3>
      </div>
    </div>
  );
};
export default StatItem;
