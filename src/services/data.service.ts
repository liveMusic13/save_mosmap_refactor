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
  import_done: async (map: number, separator: string, encoding: string, uploadfile: string) => {
    try {
      const formData = new FormData();
      formData.append('uploadfile', uploadfile); // Добавляем uploadfile в FormData
      formData.append('separator', separator); // Добавляем разделитель в FormData
      formData.append('encoding', encoding); // Добавляем кодировку в FormData

      const response = await $axiosAuth.post(`/api/import_done.php?map=${map}`, formData)

      console.log(response.data);

      return response.data
    } catch (error) {
      console.log(error);
    }
  },
}
