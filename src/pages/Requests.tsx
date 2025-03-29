
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { ShieldAlert, Search, Filter, ArrowUpDown, Eye, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import NewRequestForm from "../components/NewRequestForm";

// Sample request data
type RequestStatus = "новый" | "в работе" | "завершен" | "отклонен";
type RequestPriority = "высокий" | "средний" | "низкий";

interface Request {
  id: string;
  title: string;
  date: string;
  status: RequestStatus;
  priority: RequestPriority;
  category: string;
}

const sampleRequests: Request[] = [
  {
    id: "REQ-2023-0001",
    title: "Проблема с доступом к системе",
    date: "15.05.2023",
    status: "новый",
    priority: "высокий",
    category: "Техническая поддержка"
  },
  {
    id: "REQ-2023-0002",
    title: "Запрос на изменение параметров договора",
    date: "20.05.2023",
    status: "в работе",
    priority: "средний",
    category: "Документооборот"
  },
  {
    id: "REQ-2023-0003",
    title: "Консультация по новым услугам",
    date: "22.05.2023",
    status: "завершен",
    priority: "низкий",
    category: "Консультация"
  },
  {
    id: "REQ-2023-0004",
    title: "Уточнение деталей платежа",
    date: "25.05.2023",
    status: "в работе",
    priority: "средний",
    category: "Финансы"
  },
  {
    id: "REQ-2023-0005",
    title: "Запрос на предоставление отчетности",
    date: "01.06.2023",
    status: "завершен",
    priority: "низкий",
    category: "Отчетность"
  },
  {
    id: "REQ-2023-0006",
    title: "Сбой в работе личного кабинета",
    date: "05.06.2023",
    status: "новый",
    priority: "высокий",
    category: "Техническая поддержка"
  },
  {
    id: "REQ-2023-0007",
    title: "Вопрос по интеграции API",
    date: "10.06.2023",
    status: "отклонен",
    priority: "средний",
    category: "Разработка"
  }
];

const RequestItem = ({ request }: { request: Request }) => {
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "новый": return "bg-blue-100 text-blue-800";
      case "в работе": return "bg-yellow-100 text-yellow-800";
      case "завершен": return "bg-green-100 text-green-800";
      case "отклонен": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: RequestPriority) => {
    switch (priority) {
      case "высокий": return "bg-red-100 text-red-800";
      case "средний": return "bg-yellow-100 text-yellow-800";
      case "низкий": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{request.title}</h3>
        <div className="flex space-x-1">
          <Badge variant="outline" className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(request.priority)}>
            {request.priority}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {request.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Badge variant="secondary">{request.category}</Badge>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          Просмотреть
        </Button>
      </div>
    </div>
  );
};

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const filteredRequests = sampleRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Журавлёв А.А." />
        
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <ShieldAlert className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-medium text-gray-800">
                  Обращения
                </h2>
              </div>
              <Button 
                variant="default" 
                onClick={() => setIsDrawerOpen(true)}
              >
                <Plus className="mr-1 w-4 h-4" />
                Новое обращение
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск обращений..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="новый">Новый</SelectItem>
                        <SelectItem value="в работе">В работе</SelectItem>
                        <SelectItem value="завершен">Завершен</SelectItem>
                        <SelectItem value="отклонен">Отклонен</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <RequestItem key={request.id} request={request} />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  Обращений не найдено
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl">Новое обращение</DrawerTitle>
            <DrawerDescription className="text-center">
              Заполните форму для создания нового обращения
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-2">
            <NewRequestForm onSuccess={handleDrawerClose} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Requests;
