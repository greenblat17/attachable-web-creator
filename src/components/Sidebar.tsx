
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  ShieldAlert, 
  FileText, 
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, to, onClick }) => {
  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="mr-3 text-xl">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Determine active item based on current path
  const getIsActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="fixed top-5 left-5 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      
      <aside 
        className={`${
          isMobile 
            ? `fixed top-0 left-0 h-full z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out` 
            : 'relative'
        } w-72 bg-white border-r border-gray-100 h-screen p-6`}
      >
        <div className="mb-10">
          <h1 className="text-blue-500 text-2xl font-semibold">Company Name</h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem 
            icon={<Home className={getIsActive('/') ? "text-blue-500" : ""} />} 
            label="Новости" 
            active={getIsActive('/')} 
            to="/"
            onClick={closeSidebar}
          />
          <NavItem 
            icon={<BarChart3 className={getIsActive('/reports') ? "text-blue-500" : ""} />} 
            label="Отчеты" 
            active={getIsActive('/reports')} 
            to="/reports"
            onClick={closeSidebar}
          />
          <NavItem 
            icon={<ShieldAlert className={getIsActive('/requests') ? "text-blue-500" : ""} />} 
            label="Обращения" 
            active={getIsActive('/requests')} 
            to="/requests"
            onClick={closeSidebar}
          />
          <NavItem 
            icon={<FileText className={getIsActive('/documents') ? "text-blue-500" : ""} />} 
            label="Документы" 
            active={getIsActive('/documents')} 
            to="/documents"
            onClick={closeSidebar}
          />
          <NavItem 
            icon={<HelpCircle className={getIsActive('/help') ? "text-blue-500" : ""} />} 
            label="Помощь" 
            active={getIsActive('/help')} 
            to="/help"
            onClick={closeSidebar}
          />
        </nav>
      </aside>
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};
