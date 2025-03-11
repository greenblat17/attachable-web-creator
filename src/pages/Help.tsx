
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  ChevronDown, 
  Mail, 
  Phone, 
  FileText, 
  ExternalLink,
  MessageCircleQuestion,
  Info,
  FileQuestion
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqItems = [
  {
    question: "Как подать обращение в службу поддержки?",
    answer: "Вы можете подать обращение через раздел «Обращения», нажав на кнопку «Создать обращение». Заполните необходимую форму, укажите тему обращения и подробно опишите вашу проблему или запрос."
  },
  {
    question: "Где найти необходимые документы?",
    answer: "Все документы доступны в разделе «Документы». Вы можете воспользоваться фильтрами и поиском для быстрого нахождения нужных вам файлов."
  },
  {
    question: "Как получить доступ к отчетам?",
    answer: "Все отчеты находятся в разделе «Отчеты». Вы можете просматривать отчеты за различные периоды и экспортировать их в необходимом формате."
  },
  {
    question: "Какие форматы файлов поддерживает система?",
    answer: "Система поддерживает следующие форматы файлов для загрузки: PDF, DOCX, XLSX, JPG, PNG. Максимальный размер загружаемого файла составляет 10 МБ."
  },
  {
    question: "Как изменить контактную информацию?",
    answer: "Для изменения контактной информации обратитесь к вашему менеджеру или отправьте запрос через раздел «Обращения», выбрав тему «Изменение данных»."
  },
  {
    question: "Что делать при возникновении технических проблем?",
    answer: "В случае возникновения технических проблем, пожалуйста, обратитесь в службу поддержки по телефону +7 (495) 123-45-67 или создайте обращение в разделе «Обращения», выбрав категорию «Техническая проблема»."
  },
];

// Useful resources data
const resourceLinks = [
  {
    title: "Руководство пользователя",
    description: "Подробная инструкция по использованию личного кабинета",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    link: "#"
  },
  {
    title: "Часто задаваемые вопросы",
    description: "Ответы на самые распространенные вопросы",
    icon: <FileQuestion className="w-5 h-5 text-blue-500" />,
    link: "#"
  },
  {
    title: "Видеоинструкции",
    description: "Обучающие видео по работе с системой",
    icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
    link: "#"
  },
  {
    title: "База знаний",
    description: "Полезные статьи и рекомендации",
    icon: <Info className="w-5 h-5 text-blue-500" />,
    link: "#"
  }
];

// Contact information
const contactItems = [
  {
    icon: <Phone className="w-5 h-5 text-blue-500" />,
    title: "Телефон",
    value: "+7 (495) 123-45-67",
    description: "Пн-Пт, с 9:00 до 18:00"
  },
  {
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    title: "Email",
    value: "support@company.ru",
    description: "Мы отвечаем в течение 24 часов"
  },
  {
    icon: <MessageCircleQuestion className="w-5 h-5 text-blue-500" />,
    title: "Онлайн-чат",
    value: "В приложении",
    description: "Доступен в рабочие часы"
  }
];

const Help = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "contacts" | "resources">("faq");
  
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
                <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-medium text-gray-800">
                  Помощь
                </h2>
              </div>
              <Button variant="outline" onClick={() => window.location.href = "mailto:support@company.ru"}>
                <Mail className="w-4 h-4 mr-2" />
                Написать в поддержку
              </Button>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              <Button 
                variant={activeTab === "faq" ? "default" : "outline"}
                onClick={() => setActiveTab("faq")}
              >
                Частые вопросы
              </Button>
              <Button 
                variant={activeTab === "contacts" ? "default" : "outline"}
                onClick={() => setActiveTab("contacts")}
              >
                Контакты
              </Button>
              <Button 
                variant={activeTab === "resources" ? "default" : "outline"}
                onClick={() => setActiveTab("resources")}
              >
                Полезные ресурсы
              </Button>
            </div>
            
            {/* FAQ Section */}
            {activeTab === "faq" && (
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Часто задаваемые вопросы</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium text-gray-700">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            
            {/* Contacts Section */}
            {activeTab === "contacts" && (
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Контактная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactItems.map((item, index) => (
                    <div key={index} className="p-5 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="flex items-center mb-3">
                        {item.icon}
                        <h4 className="font-medium ml-2">{item.title}</h4>
                      </div>
                      <p className="text-gray-800 font-medium mb-1">{item.value}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Часы работы службы поддержки</h4>
                  <p className="text-gray-600 mb-4">
                    Наша служба поддержки доступна с понедельника по пятницу с 9:00 до 18:00 (МСК).
                    В выходные и праздничные дни служба поддержки не работает.
                  </p>
                  <p className="text-gray-600">
                    Среднее время ответа на обращения: 4 часа в рабочее время.
                  </p>
                </div>
              </div>
            )}
            
            {/* Resources Section */}
            {activeTab === "resources" && (
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Полезные ресурсы</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourceLinks.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.link}
                      className="p-5 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200 flex items-start"
                    >
                      <div className="mr-4 mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Не нашли ответ на свой вопрос?</h4>
                  <p className="text-gray-600 mb-4">
                    Если вы не нашли ответ на свой вопрос в часто задаваемых вопросах или базе знаний,
                    вы всегда можете связаться с нашей службой поддержки.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => window.location.href = "mailto:support@company.ru"}>
                      <Mail className="w-4 h-4 mr-2" />
                      Написать на email
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = "/requests"}>
                      <MessageCircleQuestion className="w-4 h-4 mr-2" />
                      Создать обращение
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Help;
