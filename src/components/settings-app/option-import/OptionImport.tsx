import { dataService } from '@/services/data.service'
import { RootState } from '@/store/store'
import { convertImportDoneField } from '@/utils/convertFields'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SelectImportExport from '../select-import-export/SelectImportExport'
import styles from './OptionImport.module.scss'

// const OptionImport: FC = () => {
//   const {option} = useSelector((state:RootState) => state.importExportData)
//   const [targetOptions, setTargetOptions] = useState<{ [key: string]: string }>({});
//   const [isCheckbox, setIsCheckbox] = useState(false)
//   const {query} = useRouter()

//   useEffect(()=> {
//     console.log('targetOptions', targetOptions)
//   }, [targetOptions])

//   useEffect(() => {
//     const fields = { ...option.text_field, ...option.list_field };
//     const defaultOptions: { [key: string]: string } = {};

//     Object.keys(fields).forEach((key) => {
//       defaultOptions[key] = 'Не загружать'; // Устанавливаем значение по умолчанию
//     });

//     defaultOptions['dataId'] = 'Нет'; // Устанавливаем значение по умолчанию для dataId
//     defaultOptions['Широта'] = 'Нет';
//     defaultOptions['Долгота'] = 'Нет';
//     defaultOptions['ID дома mosmap'] = 'Нет';

//     setTargetOptions(defaultOptions); // Устанавливаем начальные состояния
//   }, [option]);

//   const renderFields = () => {
//     const fields = { ...option.text_field, ...option.list_field }; // Объединяем объекты
//     const data = ['Не загружать', ...(option.file_field || []) ]

//     return Object.keys(fields).map((key) => {
//       const value = fields[key]; // Получаем значение по ключу
//       console.log(value)
//       return (
//         <div key={key} className={styles.block__select}>
//           <p className={styles.label__select}>{value}</p>
//           <SelectImportExport
//             data={data}
//             targetOption={targetOptions[key]}
//             setTargetOption={(selectedOption: string) => 
//               setTargetOptions(prev => ({ ...prev, [key]: selectedOption }))
//             }
//           />
//         </div>
//       );
//     });
//   };

//   const dataId = ['Нет', ...Object.values(option.text_field || {}) as string[]];

//   const renderCoordinate = () => {
//     const fields = ['Широта', 'Долгота', 'ID дома mosmap']; // Объединяем объекты

//     return fields.map((key) => {
//       const value = key; // Получаем значение по ключу
//       return (
//         <div key={key} className={styles.block__select}>
//           <p className={styles.label__select}>{value}</p>
//           <SelectImportExport
//             data={dataId}
//             targetOption={targetOptions[key]}
//             setTargetOption={(selectedOption: string) => 
//               setTargetOptions(prev => ({ ...prev, [key]: selectedOption }))
//             }
//           />
//         </div>
//       );
//     });
//   };
  
//   const handleCheckboxClick = () => {
//     setIsCheckbox(!isCheckbox);
//   };

//   const onClickSend = async () => {
//     if (typeof query.map === 'string') {
//       const response = await dataService.import_done(Number(query.map), option, targetOptions)
//       console.log(response)
//     } 
//   }

//   return (
//     <div className={styles.wrapper_optionImport}>
//       <div className={styles.block__title}>
//         <h3 className={styles.title}>Настройка данных для загрузки на сервер</h3>
//       </div>
//       <div className={styles.block__content_wrapper}>
//         <div className={styles.block__content}>
//           <div className={styles.block__one}>
//             {renderFields()}
//           </div>
//           <div className={styles.block__id}>
//             <div className={styles.block__select}>
//               <p className={styles.label__select}>Идентификатор</p>
//                 <SelectImportExport
//                   data={dataId}
//                   targetOption={targetOptions['dataId']}
//                   setTargetOption={(selectedOption: string) => 
//                     setTargetOptions(prev => ({ ...prev, ['dataId']: selectedOption }))
//                   }
//                 />
//             </div>
//             <div className={styles.block__checkbox} onClick={handleCheckboxClick}>
//               <img src={isCheckbox ? "/images/icons/ok.svg" : "/images/icons/test.png"} alt="img" className={styles.image__checkbox}/>
//               <input type="checkbox" className={styles.input__checkbox} checked={isCheckbox} onChange={(e) => e.stopPropagation()} />
//               <span>Очистить список перед загрузкой.</span>
//             </div>
//           </div>
//           <div className={styles.block__coordinate}>
//             {renderCoordinate()}
//           </div>
//           <button className={styles.button__send} onClick={onClickSend}>отправить</button>
//         </div>
//       </div>
//     </div>
//   )
// }




const OptionImport: FC = () => {
  const { option } = useSelector((state: RootState) => state.importExportData);
  const [targetOptions, setTargetOptions] = useState<{ [key: string]: { value: string, type: 'text' | 'list' } }>({});
  const [isCheckbox, setIsCheckbox] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    const fields = { ...option.text_field, ...option.list_field };
    const defaultOptions: { [key: string]: { value: string, type: 'text' | 'list' } } = {};

    // Устанавливаем значение по умолчанию для text и list полей
    Object.keys(option.text_field || {}).forEach((key) => {
      defaultOptions[key] = { value: 'Не загружать', type: 'text' };
    });

    Object.keys(option.list_field || {}).forEach((key) => {
      defaultOptions[key] = { value: 'Не загружать', type: 'list' };
    });

    // Устанавливаем значение по умолчанию для координат и идентификаторов
    defaultOptions['dataId'] = { value: 'Нет', type: 'text' };
    defaultOptions['Широта'] = { value: 'Нет', type: 'text' };
    defaultOptions['Долгота'] = { value: 'Нет', type: 'text' };
    defaultOptions['ID дома mosmap'] = { value: 'Нет', type: 'text' };

    setTargetOptions(defaultOptions); // Устанавливаем начальные состояния
  }, [option]);

  const renderFields = () => {
    const fields = { ...option.text_field, ...option.list_field }; // Объединяем объекты
    const data = ['Не загружать', ...(option.file_field || [])];

    return Object.keys(fields).map((key) => {
      const value = fields[key]; // Получаем значение по ключу
      return (
        <div key={key} className={styles.block__select}>
          <p className={styles.label__select}>{value}</p>
          <SelectImportExport
            data={data}
            targetOption={targetOptions[key]?.value}
            setTargetOption={(selectedOption: string) => 
              setTargetOptions(prev => ({ 
                ...prev, 
                [key]: { value: selectedOption, type: key in option.text_field ? 'text' : 'list' }
              }))
            }
          />
        </div>
      );
    });
  };

  const dataId = ['Нет', ...Object.values(option.text_field || {}) as string[]];

  const renderCoordinate = () => {
    const fields = ['Широта', 'Долгота', 'ID дома mosmap'];
  
    return fields.map((key) => {
      return (
        <div key={key} className={styles.block__select}>
          <p className={styles.label__select}>{key}</p>
          <SelectImportExport
            data={dataId}
            targetOption={targetOptions[key]?.value}
            setTargetOption={(selectedOption: string) => {
              setTargetOptions((prev:any)=> {
                const updatedOptions = {
                  ...prev,
                  [key]: { value: selectedOption, type: 'text' }
                };
                return updatedOptions;
              });
            }}
          />
        </div>
      );
    });
  };
  
  const renderDataId = () => {
    return (
      <div className={styles.block__select}>
        <p className={styles.label__select}>Идентификатор</p>
        <SelectImportExport
          data={dataId}
          targetOption={targetOptions['dataId']?.value}
          setTargetOption={(selectedOption: string) => {
            setTargetOptions((prev:any) => {
              const updatedOptions = {
                ...prev,
                ['dataId']: { value: selectedOption, type: 'text' }
              };
              return updatedOptions;
            });
          }}
        />
      </div>
    );
  };
  

  const handleCheckboxClick = () => {
    setIsCheckbox(!isCheckbox);
  };

  const onClickSend = async () => {
    if (typeof query.map === 'string') {
      let requestBody = convertImportDoneField(targetOptions, option.file_field || [], dataId);
  
      // Добавляем поле erasebase, если чекбокс активен
      if (isCheckbox) {
        requestBody = { ...requestBody, erasebase: "on" };
      }

      // Проверь, что данные действительно в правильном формате
      console.log('Request Body: ', requestBody);
  
      // Если запрос отправляется как JSON, убедись, что requestBody содержит правильно сериализованные данные
      const response = await dataService.import_done(Number(query.map), option, requestBody);
  
      console.log(response);
    }
  };

  return (
    <div className={styles.wrapper_optionImport}>
      <div className={styles.block__title}>
        <h3 className={styles.title}>Настройка данных для загрузки на сервер</h3>
      </div>
      <div className={styles.block__content_wrapper}>
        <div className={styles.block__content}>
          <div className={styles.block__one}>
            {renderFields()}
          </div>
          <div className={styles.block__id}>
            {renderDataId()}
            <div className={styles.block__checkbox} onClick={handleCheckboxClick}>
              <img src={isCheckbox ? "/images/icons/ok.svg" : "/images/icons/test.png"} alt="img" className={styles.image__checkbox}/>
              <input type="checkbox" className={styles.input__checkbox} checked={isCheckbox} onChange={(e) => e.stopPropagation()} />
              <span>Очистить список перед загрузкой.</span>
            </div>
          </div>
          <div className={styles.block__coordinate}>
            {renderCoordinate()}
          </div>
          <button className={styles.button__send} onClick={onClickSend}>отправить</button>
        </div>
      </div>
    </div>
  );
};


export default OptionImport