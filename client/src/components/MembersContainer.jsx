import { useAllMembersContext } from "../pages/AllMembers";
import Member from "./Member";

const MembersContainer = () => {
  const { data } = useAllMembersContext();
  const { members } = data;

  if (members.length === 0)
    return (
      <>
        <h1 className="text-3xl">
          Welcome delegate, There is no Members to display... please add
          members.
        </h1>
      </>
    );
  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
      {members.map((member) => {
        return <Member key={member._id} {...member} />;
      })}
    </ul>
  );
};
export default MembersContainer;
