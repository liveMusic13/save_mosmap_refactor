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
  export_done: async (map: number, adresFilterString:any, option:any, checkboxes:any) => {
    const { separator, encoding, uploadfile } = option;
    try {
      const data = {
        // 'map': map,
        // ...{
        //   adresFilterString
        // },
        'uploadfile': uploadfile,
        'separator': separator,
        'encoding': encoding,
        ...checkboxes
      }

      const params = new URLSearchParams(data);
    

      // const response = await $axiosAuth.get(`/api/export_done.php?map=${map}`);
      const response = await $axiosAuth.get(`/api/export_done.php${adresFilterString}&${params.toString()}`);
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.log(error);

      return error
    }
  },
  download_file: async(link:string) => {
    const modifiedLink = link.slice(2);
    
    try {
      const response = await $axiosAuth.get(modifiedLink)
      return response
    } catch (error) {
      console.log(error);
    }
  }
}
