// import { truncateDescription } from '@/utils/descriptionLength';
// import { FC, useState } from 'react';
// import SelectImportExport from '../select-import-export/SelectImportExport';
// import styles from './BlockImport.module.scss';

// const BlockImport: FC = () => {
//   const [nameFile, setNameFile] = useState<string>('')
//   const [delimiter, setDelimiter] = useState<string>('')
//   const [dataEncoding, setDataEncoding] = useState<string[]>(['Автоопределение', 'UTF-8', 'Windows-1251'])

//   const handleChangeRowTwo = (value:string) => {
//     setDelimiter(value)
//   }

//   const handleFileChange = (event:any) => {
// 		const selectedFile = event.target.files[0];
//     console.log(event.target.files)
//     setNameFile(selectedFile.name)
// 		// if (selectedFile) {
// 		// 	const formData = new FormData();
// 		// 	formData.append('uploaded_file', selectedFile);
// 		// }
// 	};

//   return (
//     <div className={styles.block__import}>
//       <h2 className={styles.title}>
//         Отправка данных на сервер
//       </h2>
//       <div className={styles.block__form}>
//         <div className={styles.row}>
//           <input type="file" onChange={handleFileChange} className={styles.input__file} />
//           <button className={styles.button__input_file}>ВЫБРАТЬ ФАЙЛ</button>
//           <p className={nameFile === '' ? `${styles.name__file}` : `${styles.name__file} ${styles.isFile}`}>{truncateDescription(nameFile, 29)}</p>
//         </div>
//         <div className={styles.row__two}>
//           <div className={`${styles.block__input} ${delimiter !== '' && styles.has_content}`}>
//             <label htmlFor='Разделитель' className={styles.input__label}>Разделитель:</label>
//             <input type="text" className={styles.input__login} id='Разделитель' value={delimiter} onChange={(e) => handleChangeRowTwo(e.target.value)}/>
//           </div>
//           <div className={styles.block__select}>
//             <p className={styles.label__select}>Кодировка</p>
//             <SelectImportExport data={dataEncoding} />
//           </div>
//         </div>
//         <button className={`${styles.button__input_file} ${styles.download}`}>Загрузить</button>
//       </div>
//     </div>
//   )
// }


import { dataService } from '@/services/data.service'; // Импортируйте ваш сервис
import { actions as importExportDataAction } from '@/store/import-export-data/ImportExportData.slice';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { truncateDescription } from '@/utils/descriptionLength';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectImportExport from '../select-import-export/SelectImportExport';
import styles from './BlockImport.module.scss';

const BlockImport: FC = () => {
  const dispatch = useDispatch()
  const [nameFile, setNameFile] = useState<string>('');
  const [delimiter, setDelimiter] = useState<string>(';');
  const [dataEncoding, setDataEncoding] = useState<string[]>(['Автоопределение', 'UTF-8', 'Windows-1251']);
  const [targetOption, setTargetOption] = useState<string>('UTF-8')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {query} = useRouter()
  

  const handleChangeRowTwo = (value: string) => {
    setDelimiter(value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNameFile(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('Файл не выбран');
      return;
    }

    try {
      if (typeof query.map === 'string') dispatch(importExportDataAction.addImportOptions(await dataService.import(Number(query.map), selectedFile, delimiter, targetOption)))

      console.log('Файл успешно загружен');
      dispatch(viewSettingsAction.activeIsImportSettingsData(''))
    } catch (error) {
      console.log('Ошибка при загрузке файла:', error);
    }
  };

  return (
    <div className={styles.block__import}>
      <h2 className={styles.title}>Отправка данных на сервер</h2>
      <div className={styles.block__form}>
        <div className={styles.row}>
          <input type="file" onChange={handleFileChange} className={styles.input__file} />
          <button className={styles.button__input_file}>ВЫБРАТЬ ФАЙЛ</button>
          <p className={nameFile === '' ? `${styles.name__file}` : `${styles.name__file} ${styles.isFile}`}>
            {truncateDescription(nameFile, 29)}
          </p>
        </div>
        <div className={styles.row__two}>
          <div className={`${styles.block__input} ${delimiter !== '' && styles.has_content}`}>
            <label htmlFor='Разделитель' className={styles.input__label}>Разделитель:</label>
            <input
              type="text"
              className={styles.input__login}
              id='Разделитель'
              value={delimiter}
              onChange={(e) => handleChangeRowTwo(e.target.value)}
            />
          </div>
          <div className={styles.block__select}>
            <p className={styles.label__select}>Кодировка</p>
            <SelectImportExport data={dataEncoding} targetOption={targetOption} setTargetOption={setTargetOption} />
          </div>
        </div>
        <button
          className={`${styles.button__input_file} ${styles.download}`}
          onClick={handleUpload}
        >
          Загрузить
        </button>
      </div>
    </div>
  );
};

export default BlockImport