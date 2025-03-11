
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  ShieldAlert, 
  FileText, 
  HelpCircle 
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, to }) => {
  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`}>
      <span className="mr-3 text-xl">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active item based on current path
  const getIsActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen p-6">
      <div className="mb-10">
        <h1 className="text-blue-500 text-2xl font-semibold">Company Name</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem 
          icon={<Home className={getIsActive('/') ? "text-blue-500" : ""} />} 
          label="Новости" 
          active={getIsActive('/')} 
          to="/" 
        />
        <NavItem 
          icon={<BarChart3 className={getIsActive('/reports') ? "text-blue-500" : ""} />} 
          label="Отчеты" 
          active={getIsActive('/reports')} 
          to="/reports" 
        />
        <NavItem 
          icon={<ShieldAlert className={getIsActive('/requests') ? "text-blue-500" : ""} />} 
          label="Обращения" 
          active={getIsActive('/requests')} 
          to="/requests" 
        />
        <NavItem 
          icon={<FileText className={getIsActive('/documents') ? "text-blue-500" : ""} />} 
          label="Документы" 
          active={getIsActive('/documents')} 
          to="/documents" 
        />
        <NavItem 
          icon={<HelpCircle className={getIsActive('/help') ? "text-blue-500" : ""} />} 
          label="Помощь" 
          active={getIsActive('/help')} 
          to="/help" 
        />
      </nav>
    </aside>
  );
};
