import { toast } from "react-toastify";
import { MembersContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/members");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllMembersContext = createContext();

const AllMembers = () => {
  const { data } = useLoaderData();

  return (
    <AllMembersContext.Provider value={{ data }}>
      <SearchContainer />
      <MembersContainer />
    </AllMembersContext.Provider>
  );
};
export const useAllMembersContext = () => useContext(AllMembersContext);
export default AllMembers;
