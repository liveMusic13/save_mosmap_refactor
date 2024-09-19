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
  // import_done: async (map: number, option:any, targetOptions: { [key: string]: string }) => {
  //   const {separator, encoding, uploadfile} = option

  //   try {
  //     const formData = new FormData();
  //     formData.append('uploadfile', uploadfile); // Добавляем uploadfile в FormData
  //     formData.append('separator', separator); // Добавляем разделитель в FormData
  //     formData.append('encoding', encoding); // Добавляем кодировку в FormData
  //     formData.append('encoding', encoding);
      
  //     // Вызов функции для получения данных из convertImportDoneField
  //     const convertedFields = convertImportDoneField(option, targetOptions);

  //     // Добавляем данные из convertImportDoneField в FormData
  //     Object.keys(convertedFields).forEach((key) => {
  //       formData.append(key, convertedFields[key]);
  //     });

  //     const response = await $axiosAuth.post(`/api/import_done.php?map=${map}`, formData)

  //     console.log(response.data);

  //     return response.data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  import_done: async (map: number, option: any, requestBody: { [key: string]: string }) => {
    const { separator, encoding, uploadfile } = option;
  
    try {
      // const formData = new FormData();
      // formData.append('uploadfile', uploadfile); // Добавляем uploadfile в FormData
      // formData.append('separator', separator); // Добавляем разделитель в FormData
      // formData.append('encoding', encoding); // Добавляем кодировку в FormData
  
      const dataTest = {
        'uploadfile': uploadfile,
        'separator': separator,
        'encoding': encoding,
        ...requestBody
      }
      
      // Добавляем данные из requestBody в FormData
      // for (const key in requestBody) {
      //   if (requestBody.hasOwnProperty(key)) {
      //     console.log('key', key, requestBody[key])
      //     formData.append(key, requestBody[key]);
      //   }
      // }

      

      // console.log(formData)

      // const response = await $axiosAuth.post(`/api/import_done.php?map=${map}`, formData);
      const response = await $axiosAuth.post(`/api/import_done.php?map=${map}`, dataTest);

      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  // import_done: async (mapId: number, option: any, requestBody: any) => {
  //   try {
  //     // Проверь, что отправляется с помощью axios или другого метода
  //     const response = await axios.post(`/api/import_done`, {
  //       mapId,
  //       option,
  //       ...requestBody,  // Убедись, что requestBody передаётся здесь корректно
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error('Error during import_done request:', error);
  //   }
  // },
}
