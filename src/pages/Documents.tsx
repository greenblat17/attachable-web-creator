
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { 
  FolderOpen, 
  Search, 
  FileText, 
  File, 
  Plus,
  Filter,
  Download
} from "lucide-react";
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

// Sample document data
interface Document {
  id: string;
  title: string;
  date: string;
  type: string;
  category: string;
  size: string;
}

const sampleDocuments: Document[] = [
  {
    id: "DOC-2023-0001",
    title: "Договор № 125-П от 15.01.2023",
    date: "15.01.2023",
    type: "PDF",
    category: "Договоры",
    size: "1.2 МБ"
  },
  {
    id: "DOC-2023-0002",
    title: "Акт выполненных работ за май 2023",
    date: "05.06.2023",
    type: "PDF",
    category: "Акты",
    size: "0.8 МБ"
  },
  {
    id: "DOC-2023-0003",
    title: "Счет № 256 от 10.06.2023",
    date: "10.06.2023",
    type: "PDF",
    category: "Счета",
    size: "0.5 МБ"
  },
  {
    id: "DOC-2023-0004",
    title: "Техническая спецификация оборудования",
    date: "20.05.2023",
    type: "DOCX",
    category: "Документация",
    size: "2.4 МБ"
  },
  {
    id: "DOC-2023-0005",
    title: "Инструкция по эксплуатации системы",
    date: "15.04.2023",
    type: "PDF",
    category: "Документация",
    size: "3.1 МБ"
  },
  {
    id: "DOC-2023-0006",
    title: "Коммерческое предложение Q2 2023",
    date: "22.03.2023",
    type: "XLSX",
    category: "Коммерческие предложения",
    size: "1.7 МБ"
  }
];

const DocumentItem = ({ document }: { document: Document }) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "DOCX":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "XLSX":
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {getIconByType(document.type)}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{document.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-sm text-gray-500">
              Добавлен: {document.date}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-50">
                {document.type}
              </Badge>
              <Badge variant="secondary">
                {document.category}
              </Badge>
              <Badge variant="outline" className="text-gray-500">
                {document.size}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="w-4 h-4" />
          Скачать
        </Button>
      </div>
    </div>
  );
};

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const filteredDocuments = sampleDocuments.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         document.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || document.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from documents
  const categories = Array.from(new Set(sampleDocuments.map(doc => doc.category)));

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
                <FolderOpen className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-medium text-gray-800">
                  Документы
                </h2>
              </div>
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Загрузить документ
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск документов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map(document => (
                  <DocumentItem key={document.id} document={document} />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  Документов не найдено
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Documents;
