import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, LogOutIcon, ShipIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  // 🔔 Fetch notifications
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const notificationCount = incomingRequests.length + acceptedRequests.length;

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center left-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 left-0">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          <div className="pl-5">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/Logo.png" alt="Nexora Logo" className="w-8 h-8" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Nexora
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/"}>
              <button className="btn btn-ghost btn-circle">
                <HomeIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>

            <Link to={"/notifications"} className="relative">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
              {notificationCount > 0 && (
                <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
                  {notificationCount}
                </span>
              )}
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />
          <div className="avatar">
            <div className="w-9 rounded-full">
               <Link to={"/userpage"}>
               
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
              </Link>
            </div>
          
          </div>
  
          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
