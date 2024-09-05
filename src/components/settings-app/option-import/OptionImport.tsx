import { dataService } from '@/services/data.service'
import { RootState } from '@/store/store'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SelectImportExport from '../select-import-export/SelectImportExport'
import styles from './OptionImport.module.scss'

const OptionImport: FC = () => {
  const {option} = useSelector((state:RootState) => state.importExportData)
  const [targetOptions, setTargetOptions] = useState<{ [key: string]: string }>({});
  const [isCheckbox, setIsCheckbox] = useState(false)
  const {query} = useRouter()

  useEffect(() => {
    const fields = { ...option.text_field, ...option.list_field };
    const defaultOptions: { [key: string]: string } = {};

    Object.keys(fields).forEach((key) => {
      defaultOptions[key] = 'Не загружать'; // Устанавливаем значение по умолчанию
    });

    defaultOptions['dataId'] = 'Нет'; // Устанавливаем значение по умолчанию для dataId
    defaultOptions['Широта'] = 'Нет';
    defaultOptions['Долгота'] = 'Нет';
    defaultOptions['ID дома mosmap'] = 'Нет';

    setTargetOptions(defaultOptions); // Устанавливаем начальные состояния
  }, [option]);

  const renderFields = () => {
    const fields = { ...option.text_field, ...option.list_field }; // Объединяем объекты
    const data = ['Не загружать', ...(option.file_field || []) ]

    return Object.keys(fields).map((key) => {
      const value = fields[key]; // Получаем значение по ключу
      return (
        <div key={key} className={styles.block__select}>
          <p className={styles.label__select}>{value}</p>
          <SelectImportExport
            data={data}
            targetOption={targetOptions[key]}
            setTargetOption={(selectedOption: string) => 
              setTargetOptions(prev => ({ ...prev, [key]: selectedOption }))
            }
          />
        </div>
      );
    });
  };

  const dataId = ['Нет', ...(option.file_field || []) ]

  const renderCoordinate = () => {
    const fields = ['Широта', 'Долгота', 'ID дома mosmap']; // Объединяем объекты

    return fields.map((key) => {
      const value = key; // Получаем значение по ключу
      return (
        <div key={key} className={styles.block__select}>
          <p className={styles.label__select}>{value}</p>
          <SelectImportExport
            data={dataId}
            targetOption={targetOptions[key]}
            setTargetOption={(selectedOption: string) => 
              setTargetOptions(prev => ({ ...prev, [key]: selectedOption }))
            }
          />
        </div>
      );
    });
  };
  
  const handleCheckboxClick = () => {
    setIsCheckbox(!isCheckbox);
  };

  const onClickSend = async () => {
    if (typeof query.map === 'string') {
      const response = await dataService.import_done(Number(query.map), option.separator, option.encoding, option.uploadfile)
      console.log(response)
    } 
  }

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
            <div className={styles.block__select}>
              <p className={styles.label__select}>Идентификатор</p>
                <SelectImportExport
                  data={dataId}
                  targetOption={targetOptions['dataId']}
                  setTargetOption={(selectedOption: string) => 
                    setTargetOptions(prev => ({ ...prev, ['dataId']: selectedOption }))
                  }
                />
            </div>
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
  )
}

export default OptionImport