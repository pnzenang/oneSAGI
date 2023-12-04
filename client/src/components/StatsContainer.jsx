import { FaSuitcaseRolling } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats, data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 pt-6 ">
      <StatItem
        title="total members"
        count={defaultStats?.pending + defaultStats?.vested}
        icon={<FaUsersViewfinder />}
        bcg="bg-base-100"
        borderColor="border-primary"
        color="text-primary"
      />

      <StatItem
        title="vested members"
        count={defaultStats?.vested}
        icon={<FaCircleCheck />}
        bcg="bg-green-100"
        borderColor="border-green-600"
        color="text-green-600"
      />
      <StatItem
        title="pending matriculations"
        count={defaultStats?.pending}
        icon={<FaSuitcaseRolling />}
        bcg="bg-amber-100"
        borderColor="border-amber-500"
        color="text-amber-500"
      />
    </div>
  );
};
export default StatsContainer;
