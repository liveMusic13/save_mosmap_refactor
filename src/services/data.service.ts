import { $axiosAuth } from "@/api";

export const dataService = {
  import: async (map: number, file: File, separator: string, encoding: string) => {
    try {
      // Создаем объект FormData
      const formData = new FormData();
      formData.append('file', file); // Добавляем файл в FormData
      formData.append('separator', separator); // Добавляем разделитель в FormData
      formData.append('encoding', encoding); // Добавляем кодировку в FormData
      // Отправляем запрос с FormData
      const response = await $axiosAuth.post(`/api/import_load.php?map=${map}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Указываем тип контента
        },
      });

      console.log(response.data);

      return response.data
    } catch (error) {
      console.log(error);
    }
  },
  import_done: async (map: number, option: any, requestBody: { [key: string]: string }) => {
    const { separator, encoding, uploadfile } = option;
  
    try {
      const dataTest = {
        'uploadfile': uploadfile,
        'separator': separator,
        'encoding': encoding,
        ...requestBody
      }
      const response = await $axiosAuth.post(`/api/import_done.php?map=${map}`, dataTest);

      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.log(error);

      return error
    }
  },
  export_done: async (map: number, filters: any, option:any, checkboxes:any) => {
    const { separator, encoding, uploadfile } = option;
    try {
      const data = {
        filters, 
        'uploadfile': uploadfile,
        'separator': separator,
        'encoding': encoding,
        ...checkboxes
      }

      const response = await $axiosAuth.post(`/api/export_done.php?map=${map}`, data);

      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.log(error);

      return error
    }
  }
}
