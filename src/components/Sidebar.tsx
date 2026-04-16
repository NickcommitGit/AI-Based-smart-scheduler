
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, FileText, Home, MessageSquare, User } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside className="fixed z-20 left-0 top-0 h-screen w-20 md:w-64 bg-theme-darkgray border-r border-gray-800 transition-all">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className="bg-theme-orange h-10 w-10 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">SS</span>
        </div>
        <h1 className="hidden md:block text-xl font-bold ml-3 text-white">
          Smart Scheduler
        </h1>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-2 px-2">
          <li>
          <Link
            to="/"
            className={cn(
              "flex items-center px-4 py-3 rounded-md transition-colors",
              isActive("/LandingPage")
                ? "bg-theme-orange text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            )}
          >
            <Home className="h-5 w-5" />
            <span className="hidden md:inline ml-3">Home</span>
          </Link>
          </li>
          
          <li>
            <Link
              to="/roadmap"
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive("/roadmap")
                  ? "bg-theme-orange text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              <Book className="h-5 w-5" />
              <span className="hidden md:inline ml-3">Roadmap</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/test"
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive("/test")
                  ? "bg-theme-orange text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              <FileText className="h-5 w-5" />
              <span className="hidden md:inline ml-3">Learn & Test</span>
            </Link>
          </li>

          <li>
            <Link
              to="/notes"
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive("/notes")
                  ? "bg-theme-orange text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              <FileText className="h-5 w-5" />
              <span className="hidden md:inline ml-3">Notes</span>
            </Link>
          </li>

          <li>
            <Link
              to="/discussion"
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive("/discussion")
                  ? "bg-theme-orange text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="hidden md:inline ml-3">Discussion</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/profile"
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive("/profile")
                  ? "bg-theme-orange text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline ml-3">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
