
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Название должно содержать не менее 5 символов",
  }),
  category: z.string({
    required_error: "Выберите категорию обращения",
  }),
  priority: z.string({
    required_error: "Выберите приоритет обращения",
  }),
  description: z.string().min(20, {
    message: "Описание должно содержать не менее 20 символов",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface NewRequestFormProps {
  onSuccess?: () => void;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      priority: "средний",
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Обращение создано",
        description: "Ваше обращение успешно отправлено",
      });
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Введите название обращения" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Техническая поддержка">Техническая поддержка</SelectItem>
                    <SelectItem value="Документооборот">Документооборот</SelectItem>
                    <SelectItem value="Консультация">Консультация</SelectItem>
                    <SelectItem value="Финансы">Финансы</SelectItem>
                    <SelectItem value="Отчетность">Отчетность</SelectItem>
                    <SelectItem value="Разработка">Разработка</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Приоритет</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите приоритет" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="высокий">Высокий</SelectItem>
                    <SelectItem value="средний">Средний</SelectItem>
                    <SelectItem value="низкий">Низкий</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Подробно опишите вашу проблему или вопрос" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onSuccess} className="w-full sm:w-auto">
            Отмена
          </Button>
          <Button type="submit" className="w-full sm:w-auto">Отправить</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewRequestForm;
