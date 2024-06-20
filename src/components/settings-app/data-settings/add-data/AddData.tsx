import { settingsService } from '@/services/settings.service'
import { ICheckedStates } from '@/types/data.types'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './AddData.module.scss'
import SelectData from './select-data/SelectData'

// const AddData: FC = ({ title }) => {
//   const titleFieldsCheckbox:string[] = ['Текст для списка', 'Текст для карты', 'Адрес' ]
//   const titleObjectsCheckbox:string[] = ['Множ. выбор', 'Иконка', 'Цвет' ]
//   const [checkedStates, setCheckedStates] = useState<boolean[]>({});

//   const renderCheckbox = (title: string) => {
//     switch (title) {
//       case 'Поля':
//         return (
//           titleFieldsCheckbox.map(checkbox => ( 
//               <div className={styles.block__checkbox}>
//                 <input type="checkbox" className={styles.checkbox} />
//                 <div className={styles.square}></div>
//                 <img src="../images/icons/ok.svg" alt="ok" />
//                 <p className={styles.checkbox__name}>{checkbox}</p>
//               </div>
//             ))
//         )
//       case 'Группы объектов':
//         return (
//           titleObjectsCheckbox.map(checkbox => ( 
//             <div className={styles.block__checkbox}>
//               <input type="checkbox" className={styles.checkbox} />
//               <div className={styles.square}></div>
//               <img src="../images/icons/ok.svg" alt="ok" />
//               <p className={styles.checkbox__name}>{checkbox}</p>
//             </div>
//           ))
//         )
//       default:
//         return null
//     }
//   }

  

//   return (
//     <div className={styles.wrapper_addData}>
//       <input type="text" placeholder='Название' className={styles.addNames} />
//       <SelectData />
//       {/* {
//         titleCheckbox.map(checkbox => ( 
//           <div className={styles.block__checkbox}>
//             <input type="checkbox" className={styles.checkbox} /> 
//             <p className={styles.checkbox__name}>{checkbox}</p>
//           </div>
//         ))
//       } */}
//       {
//         renderCheckbox(title)
//       }
//     </div>
//   )
// }

// export default AddData

const AddData: FC<{title:string}> = ({ title }) => {
  const {query} = useRouter()
  const dispatch = useDispatch()
  const titleFieldsCheckbox:string[] = ['Текст для списка', 'Текст для карты', 'Адрес' ]
  const titleObjectsCheckbox:string[] = ['Множ. выбор', 'Иконка', 'Цвет' ]
  const [valueSelect, setValueSelect] = useState<string>('Строка')

  const allCheckboxes = [...titleFieldsCheckbox, ...titleObjectsCheckbox];

  const initialCheckedStates = allCheckboxes.reduce((acc, curr) => ({ ...acc, [curr]: false }), {});

  const [checkedStates, setCheckedStates] = useState<ICheckedStates>(initialCheckedStates);
  const [inputValue, setInputValue] = useState<string>('')

  const handleCheckboxChange = (checkbox: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStates(prevState => ({ ...prevState, [checkbox]: event.target.checked }));
  };

  useEffect(()=> {
    console.log(checkedStates)
  }, [checkedStates])

  const onClick = (title:string) => {
    if (title === 'Поля') {
      const typeSelect = valueSelect === 'Строка' ? 0 : valueSelect === 'Число' ? 1 : 5

      const data = {
        address: checkedStates['Адрес'] ? 1 : 0 ,
        name: inputValue,
        id: '',
        on_list: checkedStates['Текст для списка'] ? 1 : 0 ,
        on_map: checkedStates['Текст для карты'] ? 1 : 0 ,
        type: typeSelect,
      }

      if (typeof query.map === 'string') settingsService.editFields(query.map, dispatch, data)
    } else {
      const data = {
        mode: checkedStates['Множ. выбор'] ? 1 : 0 ,
        name: inputValue,
        id: '',
        color: checkedStates['Цвет'] ? 1 : 0 ,
        icon: checkedStates['Иконка'] ? 1 : 0,
      }

      if (typeof query.map === 'string') settingsService.editLists(query.map, dispatch, data)
    }
  }

  const renderCheckbox = (title: string) => {
    const checkboxes = title === 'Поля' ? titleFieldsCheckbox : titleObjectsCheckbox;

    return checkboxes.map(checkbox => ( 
      <div key={checkbox} className={styles.block__checkbox}>
        <input 
          type="checkbox" 
          className={styles.checkbox} 
          checked={checkedStates[checkbox] || false}
          onChange={handleCheckboxChange(checkbox)}
        />
        {
          checkedStates[checkbox] ? <img src="../images/icons/ok.svg" alt="ok" className={styles.image__ok} /> : <div className={styles.square}></div>
        }
        <p className={styles.checkbox__name}>{checkbox}</p>
      </div>
    ));
  }

  return (
    <div className={styles.wrapper_addData}>
      <input type="text" placeholder='Название' className={styles.addNames} value={inputValue} onChange={e => setInputValue(e.target.value)} />
      {title === 'Поля' && <SelectData valueSelect={valueSelect} setValueSelect={setValueSelect} />}
      {
        renderCheckbox(title)
      }
      <button className={styles.button__add} onClick={() => onClick(title)}>добавить</button>
    </div>
  )
}
export default AddData