import { FaSuitcaseRolling } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";

import { toast } from "react-toastify";
import { StatItem } from "../components";
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("Unauthorized to access this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, vestedMembers, pendingMembers } = useLoaderData();
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-6 ">
      <StatItem
        title="active associations"
        count={users}
        icon={<FaUsersViewfinder />}
        bcg="bg-base-100"
        borderColor="border-primary"
        color="text-primary"
      />
      <StatItem
        title="total membership"
        count={vestedMembers + pendingMembers}
        icon={<FaUsersViewfinder />}
        bcg="bg-base-100"
        borderColor="border-primary"
        color="text-primary"
      />
      <StatItem
        title="vested members"
        count={vestedMembers}
        icon={<FaCircleCheck />}
        bcg="bg-green-100"
        borderColor="border-green-700"
        color="text-green-700"
      />
      <StatItem
        title="pending matriculations"
        count={pendingMembers}
        icon={<FaSuitcaseRolling />}
        bcg="bg-amber-100"
        borderColor="border-amber-500"
        color="text-amber-500"
      />
      {/* <StatItem
        title="individual payment "
        count={`$ ${1 * 23}`}
        icon={<FaMagnifyingGlassDollar />}
        bcg="bg-green-300"
        borderColor="border-green-300"
        color="text-primary"
      /> */}
      {/* <StatItem
        title="individual payment "
        count={`$ ${1 * 23}`}
        icon={<TbUserDollar />}
        bcg="bg-green-300"
        borderColor="border-green-300"
        color="text-primary"
      /> */}
      {/* <StatItem
        title="This month Total Contribution "
        count={`$ ${vestedMembers * 23}`}
        icon={<FaMagnifyingGlassDollar />}
        bcg="bg-green-300"
        borderColor="border-green-300"
        color="text-primary"
      /> */}
    </div>
  );
};
export default Admin;
