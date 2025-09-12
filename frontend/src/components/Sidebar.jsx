import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout"; // ✅ Import logout hook
import {
  BellIcon,
  HomeIcon,
  UsersIcon,
  ChevronsLeft,
  ChevronsRight,
  LogOutIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const { logout } = useLogout(); // ✅ Get logout function
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMinimized, setIsMinimized] = useState(false);

  // 🔔 Fetch friend requests
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const notificationCount = incomingRequests.length + acceptedRequests.length;

  return (
    <aside
      className={`${
        isMinimized ? "w-20" : "w-64"
      } bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-10 transition-all duration-300`}
    >
      {/* Top Section with Logo + Minimize Button */}
      <div className="flex items-center justify-between p-0">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="btn btn-ghost btn-sm ml-auto"
        >
          {isMinimized ? (
            <ChevronsRight className="size-5" />
          ) : (
            <ChevronsLeft className="size-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          {!isMinimized && <span>Home</span>}
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          {!isMinimized && <span>Friends</span>}
        </Link>

        <Link
          to="/Meetnewfriends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/Meetnewfriends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          {!isMinimized && <span>Meet New Friends</span>}
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case relative ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          {!isMinimized && <span>Notifications</span>}
          {notificationCount > 0 && (
            <span className="badge badge-primary absolute right-2 top-2">
              {notificationCount}
            </span>
          )}
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-base-300 mt-auto p-3 flex flex-col gap-3">
        <Link to="/userpage" className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={authUser?.profilePic || "/default-avatar.png"}
                alt="User Avatar"
              />
            </div>
          </div>
          {!isMinimized && (
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
