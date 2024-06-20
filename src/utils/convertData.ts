import { IFields, ILists, IMaps } from "@/types/slice.types";
import { AllData, ExtractedData } from "@/types/utils.data";

export const extractData = (allData: AllData, titleColumnName: string, title: string): ExtractedData[] => {
  let dataArray: (IFields | ILists | IMaps)[] = [];

  // Выбираем массив данных в зависимости от значения title
  if (title === 'Поля') {
      dataArray = allData.fields;
  } else if (title === 'Карта') {
      dataArray = allData.maps;
  } else {
      dataArray = allData.lists;
  }

  // Создаем массив для хранения извлеченных данных
  const extractedDataArray: ExtractedData[] = dataArray.map(data => {
      let extractedData: ExtractedData = {};

      // Проверяем значение titleColumnName и заполняем extractedData
      switch (titleColumnName) {
          case 'Название':
              extractedData.name = data.name;
              break;
          case 'Тип':
              if ('type_name' in data) {
                  extractedData.type_name = (data as IFields).type_name;
              }
              break;
          case 'Текст для списка':
              if ('namefield' in data) {
                  extractedData.namefield = (data as IFields).namefield;
              }
              break;
          case 'Текст для карты':
              if ('nameonmap' in data) {
                  extractedData.nameonmap = (data as IFields).nameonmap;
              }
              break;
          case 'Адрес':
              if ('address' in data) {
                  extractedData.address = (data as IFields).address;
              }
              break;
          case 'Множ. выбор':
              if ('mode' in data) {
                  extractedData.mode = (data as ILists | IMaps).mode;
              }
              break;
          case 'Иконка':
              if ('icon' in data) {
                  extractedData.icon = (data as ILists).icon;
              }
              break;
          case 'Цвет':
              if ('color' in data) {
                  extractedData.color = (data as ILists).color;
              }
              break;
          case 'Вкл/Выкл':
              if ('visible' in data) {
                  extractedData.visible = (data as IMaps).visible;
              }
              break;
          default:
              break;
      }

      return extractedData;
  });

  return extractedDataArray;
};