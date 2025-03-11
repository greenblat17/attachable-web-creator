
import { useState } from "react";
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
  const [activeItem, setActiveItem] = useState("news");

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen p-6">
      <div className="mb-10">
        <h1 className="text-blue-500 text-2xl font-semibold">Company Name</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem 
          icon={<Home className="text-blue-500" />} 
          label="Новости" 
          active={activeItem === "news"} 
          to="/" 
        />
        <NavItem 
          icon={<BarChart3 />} 
          label="Отчеты" 
          active={activeItem === "reports"} 
          to="/reports" 
        />
        <NavItem 
          icon={<ShieldAlert />} 
          label="Обращения" 
          active={activeItem === "requests"} 
          to="/requests" 
        />
        <NavItem 
          icon={<FileText />} 
          label="Документы" 
          active={activeItem === "documents"} 
          to="/documents" 
        />
        <NavItem 
          icon={<HelpCircle />} 
          label="Помощь" 
          active={activeItem === "help"} 
          to="/help" 
        />
      </nav>
    </aside>
  );
};
