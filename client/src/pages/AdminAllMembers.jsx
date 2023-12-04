import { toast } from "react-toastify";
import { AdminAllMembersContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, redirect } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/all-members-admin");

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};
const AdminAllMembersContext = createContext();

const AdminAllMembers = () => {
  const { data } = useLoaderData();

  return (
    <AdminAllMembersContext.Provider value={{ data }}>
      <SearchContainer />
      <AdminAllMembersContainer />
    </AdminAllMembersContext.Provider>
  );
};
export const useAdminAllMembersContext = () =>
  useContext(AdminAllMembersContext);
export default AdminAllMembers;
