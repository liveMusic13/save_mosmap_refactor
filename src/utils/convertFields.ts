

// export const convertImportDoneField = (targetOptions: { [key: string]: { value: string, type: 'text' | 'list' } }, data: string[]) => {
//   const result: { [key: string]: string } = {};

//   Object.keys(targetOptions).forEach((key) => {
//     const selectedOption = targetOptions[key]?.value || 'Нет';
//     const fieldType = targetOptions[key]?.type || 'text';

//     // Выводим выбранное значение и массив данных для сравнения
//     console.log(`Processing key: ${key}, selectedOption: ${selectedOption}, fieldType: ${fieldType}`);
//     console.log(`Data array: `, data);
//     // Найдём индекс значения в массиве данных
//     const index = data.indexOf(selectedOption);
//     const valueIndex = index !== -1 ? index : 0;

//     console.log(`Key: ${key}, Value Index: ${valueIndex}`);

// //Проблема в том, что скорее всего оно ищет в массиве , который используется для опций в первом блоке. Поэтому всегда 0 возвращает

//     // Проверяем и задаем значения для конкретных полей
//     if (key === 'ID дома mosmap') {
//       result['house_id'] = valueIndex.toString();
//     } else if (key === 'Широта') {
//       result['lat'] = valueIndex.toString();
//     } else if (key === 'Долгота') {
//       result['lng'] = valueIndex.toString();
//     } else if (key === 'dataId') {
//       result['data_id'] = valueIndex.toString();
//     } else {
//       result[`fill_${fieldType}[${key}]`] = valueIndex.toString(); // Например: fill_text[0] = "1" или "0"
//     }

//     // // Логирование добавленных значений
//     // console.log(`Result after processing ${key}:`, result);
//   });

//   // console.log('Final result: ', result);
//   return result;
// };

export const convertImportDoneField = (
  targetOptions: { [key: string]: { value: string, type: 'text' | 'list' } }, 
  fileFieldData: string[], 
  dataIdData: string[]
) => {
  const result: { [key: string]: string } = {};

  Object.keys(targetOptions).forEach((key) => {
    const selectedOption = targetOptions[key].value;
    const fieldType = targetOptions[key].type;

    // Выбираем массив для поиска в зависимости от ключа
    const dataArray = (key === 'Широта' || key === 'Долгота' || key === 'ID дома mosmap' || key === 'dataId')
      ? dataIdData
      : fileFieldData;

    const index = dataArray.indexOf(selectedOption);
    const valueIndex = index !== -1 ? index : 0;

    // Обрабатываем значения в зависимости от ключа
    if (key === 'ID дома mosmap') {
      result['house_id'] = valueIndex.toString();
    } else if (key === 'Широта') {
      result['lat'] = valueIndex.toString();
    } else if (key === 'Долгота') {
      result['lng'] = valueIndex.toString();
    } else if (key === 'dataId') {
      result['identificator'] = valueIndex.toString();
    } else {
      result[`fill_${fieldType}[${key}]`] = valueIndex.toString();
    }
  });

  console.log(result);
  return result;
};

