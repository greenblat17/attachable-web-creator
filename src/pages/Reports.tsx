
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp 
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const Reports = () => {
  // Sample data for charts
  const monthlyData = [
    { name: 'Янв', value: 400 },
    { name: 'Фев', value: 300 },
    { name: 'Мар', value: 550 },
    { name: 'Апр', value: 480 },
    { name: 'Май', value: 600 },
    { name: 'Июн', value: 350 },
  ];

  const categoryData = [
    { name: 'Категория A', value: 400 },
    { name: 'Категория B', value: 300 },
    { name: 'Категория C', value: 200 },
    { name: 'Категория D', value: 380 },
  ];

  const quarterlyData = [
    { name: 'Q1', value: 1250 },
    { name: 'Q2', value: 1430 },
    { name: 'Q3', value: 1600 },
    { name: 'Q4', value: 1900 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Отчеты
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Performance Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="dashboard-card p-6"
              >
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium">Ежемесячные показатели</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Category Distribution Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="dashboard-card p-6"
              >
                <div className="flex items-center mb-4">
                  <PieChart className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium">Распределение по категориям</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Quarterly Trend Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="dashboard-card p-6 md:col-span-2"
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium">Квартальная динамика</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart
                    data={quarterlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
