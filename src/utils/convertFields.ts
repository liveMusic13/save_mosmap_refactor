// export const convertImportDoneField = (
//   targetOptions: { [key: string]: { value: string, type: 'text' | 'list' } }, 
//   fileFieldData: string[], 
//   dataIdData: string[]
// ) => {
//   const result: { [key: string]: string } = {};

//   Object.keys(targetOptions).forEach((key) => {
//     const selectedOption = targetOptions[key].value;
//     const fieldType = targetOptions[key].type;

//     // Выбираем массив для поиска в зависимости от ключа
//     // const dataArray = (key === 'Широта' || key === 'Долгота' || key === 'ID дома mosmap' || key === 'dataId')
//     //   ? dataIdData
//     //   : fileFieldData;
//     const dataArray = (key === 'dataId')
//       ? dataIdData
//       : fileFieldData;
//       console.log(dataIdData, fileFieldData)

//     const index = dataArray.indexOf(selectedOption);
//     const valueIndex = index !== -1 ? index : -1;

//     // Обрабатываем значения в зависимости от ключа
//     if (key === 'ID дома mosmap') {
//       result['house_id'] = valueIndex.toString();
//     } else if (key === 'Широта') {
//       result['lat'] = valueIndex.toString();
//     } else if (key === 'Долгота') {
//       result['lng'] = valueIndex.toString();
//     } else if (key === 'dataId') {
//       result['identificator'] = valueIndex.toString();
//     } else {
//       result[`fill_${fieldType}[${key}]`] = valueIndex.toString();
//     }
//   });

//   console.log(result);
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
    
    // Выбираем соответствующий массив данных
    const dataArray = (key === 'dataId') ? dataIdData : fileFieldData;

    // Логика для dataIdData: индекс элемента минус 1
    let valueIndex;
    if (key === 'dataId') {
      valueIndex = selectedOption === 'Нет' ? -1 : dataArray.indexOf(selectedOption) - 1;
    } else {
      // Логика для fileFieldData остаётся неизменной
      valueIndex = dataArray.indexOf(selectedOption);
    }

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



