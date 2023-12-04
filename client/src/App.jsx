import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Mission,
  Necrology,
  Home,
  Team,
  Gallery,
  HomeLayout,
  Landing,
  Error,
  Login,
  Register,
  Updates,
  Contact,
  ResetPassword,
  ForgotPassword,
  DashboardLayout,
  AddMembers,
  AllMembers,
  Announcement,
  AssociationList,
  Stats,
  Profile,
  Admin,
  EditMember,
  AdminAllMembers,
  AdminEditMember,
} from "./pages";

import { ErrorElement } from "./components";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allMembersLoader } from "./pages/AllMembers";
import { loader as adminAllMembersLoader } from "./pages/AdminAllMembers";
import { action as addMemberAction } from "./pages/AddMembers";
import { loader as editMemberLoader } from "./pages/EditMember";
import { action as editMemberAction } from "./pages/EditMember";
import { loader as adminEditMemberLoader } from "./pages/AdminEditMember";
import { action as adminEditMemberAction } from "./pages/AdminEditMember";
import { action as deleteMemberAction } from "./pages/DeleteMember";
import { loader as deleteMemberLoader } from "./pages/DeleteMember";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statLoader } from "./pages/Stats";
import { action as profileAction } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "team",
        element: <Team />,
        errorElement: <ErrorElement />,
      },
      {
        path: "gallery",
        element: <Gallery />,
        errorElement: <ErrorElement />,
      },
      {
        path: "mission",
        element: <Mission />,
      },
      {
        path: "updates",
        element: <Updates />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "necrology",
        element: <Necrology />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    loader: dashboardLoader,
    children: [
      {
        path: "add-member",
        element: <AddMembers />,
        errorElement: <ErrorElement />,
        action: addMemberAction,
      },
      {
        index: true,
        element: <AllMembers />,
        errorElement: <ErrorElement />,
        loader: allMembersLoader,
      },
      {
        path: "stats",
        element: <Stats />,
        errorElement: <ErrorElement />,
        loader: statLoader,
      },
      {
        path: "announcement",
        element: <Announcement />,
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
        action: profileAction,
      },
      {
        path: "list",
        element: <AssociationList />,
        errorElement: <ErrorElement />,
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <ErrorElement />,
        loader: adminLoader,
      },
      {
        path: "all-members-admin",
        element: <AdminAllMembers />,
        errorElement: <ErrorElement />,
        loader: adminAllMembersLoader,
      },
      {
        path: "edit-member/:id",
        element: <EditMember />,
        errorElement: <ErrorElement />,
        action: editMemberAction,
        loader: editMemberLoader,
      },
      {
        path: "admin-edit-member/:id",
        element: <AdminEditMember />,
        errorElement: <ErrorElement />,
        action: adminEditMemberAction,
        loader: adminEditMemberLoader,
      },
      {
        path: "delete-member/:id",
        action: deleteMemberAction,
        loader: deleteMemberLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
