import { FC, useEffect, useState } from 'react'
import SelectImportExport from '../select-import-export/SelectImportExport'
import styles from './BlockExport.module.scss'

const BlockExport: FC = () => {
  const [nameFile, setNameFile] = useState<string>('')
  const [delimiter, setDelimiter] = useState<string>('')
  const [dataEncoding, setDataEncoding] = useState<string[]>(['UTF-8', 'Windows-1251'])
  const [checkboxData, setCheckboxData] = useState([
    {
      id: 1,
      name: 'Добавить координаты',
      isCheck: false
    },
    {
      id: 2,
      name: 'Добавить ID дома',
      isCheck: false
    },
  ])

  const handleChangeRowTwo = (value:string, forField:string) => {
    if (forField === 'Разделитель') {
      setDelimiter(value)
    } else {
      setNameFile(value)
    }
  }

  const handleCheckboxClick = (elem:any) => {
    setCheckboxData(prevData =>
      prevData.map(item =>
        item.id === elem.id ? { ...item, isCheck: !item.isCheck } : item
      )
    );
  };

  useEffect(()=> {
console.log(checkboxData)
  }, [checkboxData])

  return (
    <div className={styles.block__import}>
      <h2 className={styles.title}>
        Выгрузка данных
      </h2>
      <div className={styles.block__form}>
        <div className={styles.row}>
          <div className={`${styles.block__input} ${nameFile !== '' && styles.has_content}`}>
            <label htmlFor='Имя файла' className={styles.input__label}>Имя файла</label>
            <input type="text" className={styles.input__login} id='Имя файла' value={nameFile} onChange={(e) => handleChangeRowTwo(e.target.value, 'Имя файла')}/>
          </div>
        </div>
        <div className={styles.row__two}>
          <div className={styles.block__row_two}>
            <div className={`${styles.block__input} ${delimiter !== '' && styles.has_content}`}>
              <label htmlFor='Разделитель' className={styles.input__label}>Разделитель:</label>
              <input type="text" className={styles.input__login} id='Разделитель' value={delimiter} onChange={(e) => handleChangeRowTwo(e.target.value, 'Разделитель')}/>
            </div>
            <div className={styles.block__select}>
              <p className={styles.label__select}>Кодировка</p>
              <SelectImportExport data={dataEncoding} />
            </div>
          </div>
          <div className={styles.block__checkboxes}>
            {checkboxData.map(elem => (
              <div
                key={elem.id}
                className={styles.block__checkbox}
                onClick={() => handleCheckboxClick(elem)}
              >
                <img
                  src={elem.isCheck ? '/images/icons/ok.svg' : '/images/icons/test.png'}
                  alt="img"
                  className={styles.image__checkbox}
                />
                <input
                  type="checkbox"
                  className={styles.input__checkbox}
                  checked={elem.isCheck}
                  onChange={(e) => e.stopPropagation()}
                />
                <span>{elem.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className={`${styles.button__input_file} ${styles.download}`}>Загрузить</button>
      </div>
    </div>
  )
}

export default BlockExport