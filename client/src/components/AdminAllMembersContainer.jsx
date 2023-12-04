import { useAdminAllMembersContext } from "../pages/AdminAllMembers";
import Member from "./Member";

const AdminAllMembersContainer = () => {
  const { data } = useAdminAllMembersContext();

  const { adminMembers } = data;

  if (adminMembers.length === 0)
    return (
      <>
        <h1 className="text-3xl">No Members to display...</h1>
      </>
    );
  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
      {adminMembers.map((member) => {
        return <Member key={member._id} {...member} />;
      })}
    </ul>
  );
};
export default AdminAllMembersContainer;
