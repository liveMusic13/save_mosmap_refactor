import { useSettings } from '@/hooks/useSettings'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { RootState } from '@/store/store'
import { IBlockSettings } from '@/types/props.types'
import { IFields, ILists, IMaps } from '@/types/slice.types'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './DataSettings.module.scss'
import AddData from './add-data/AddData'
import { arrColumn } from './column.data'
import OptionSetting from './option-setting/OptionSetting'

const widthConfig: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(25/1440*100vw)',
    'Название': 'calc(155/1440*100vw)',
    'Тип': 'calc(90/1440*100vw)',
    'Текст для списка': 'calc(100/1440*100vw)',
    'Текст для карты': 'calc(100/1440*100vw)',
    'Адрес': 'calc(80/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(25/1440*100vw)',
    'Название': 'calc(195/1440*100vw)',
    'Множ. выбор': 'calc(190/1440*100vw)',
    'Вкл/Выкл': 'calc(190/1440*100vw)',
    'Действие': 'calc(150/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(25/1440*100vw)',
    'Название': 'calc(135/1440*100vw)',
    'Множ. выбор': 'calc(110/1440*100vw)',
    'Иконка': 'calc(80/1440*100vw)',
    'Цвет': 'calc(80/1440*100vw)',
    'Действие': 'calc(330/1440*100vw)',
  },
};

const widthConfigTable: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(15/1440*100vw)',
    'Название': 'calc(195/1440*100vw)',
    'Тип': 'calc(90/1440*100vw)',
    'Текст для списка': 'calc(120/1440*100vw)',
    'Текст для карты': 'calc(120/1440*100vw)',
    'Адрес': 'calc(100/1440*100vw)',
    'Действие': 'calc(296/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(25/1440*100vw)',
    'Название': 'calc(325/1440*100vw)',
    'Множ. выбор': 'calc(190/1440*100vw)',
    'Вкл/Выкл': 'calc(190/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(20/1440*100vw)',
    'Название': 'calc(135/1440*100vw)',
    'Множ. выбор': 'calc(90/1440*100vw)',
    'Иконка': 'calc(120/1440*100vw)',
    'Цвет': 'calc(120/1440*100vw)',
    'Действие': 'calc(467/1440*100vw)',
  },
};

const widthConfigMobile: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(85/1440*100vw)',
    'Название': 'calc(125/1440*100vw)',
    'Тип': 'calc(120/1440*100vw)',
    'Текст для списка': 'calc(220/1440*100vw)',
    'Текст для карты': 'calc(220/1440*100vw)',
    'Адрес': 'calc(120/1440*100vw)',
    'Действие': 'calc(400/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(85/1440*100vw)',
    'Название': 'calc(155/1440*100vw)',
    'Множ. выбор': 'calc(190/1440*100vw)',
    'Вкл/Выкл': 'calc(190/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(85/1440*100vw)',
    'Название': 'calc(125/1440*100vw)',
    'Множ. выбор': 'calc(210/1440*100vw)',
    'Иконка': 'calc(120/1440*100vw)',
    'Цвет': 'calc(120/1440*100vw)',
    'Действие': 'calc(530/1440*100vw)',
  },
};

const DataSettings: FC<IBlockSettings> = ({title}) => {
  const {mapFunc, fieldsFunc, getIconsFunc, listsFunc} = useSettings()
  const {fields, getIcons, lists, maps} = useSelector((state: RootState) => state.dataSettings)
  const {width} = useWindowDimensions()
  const widthConfigAdaptive  = (width && width <= 767.98) ? widthConfigMobile : (width && (width > 767.98 && width <= 991.98)) ? widthConfigTable : widthConfig

  const dataMap =  title === 'Поля' ? fields : title === 'Карта' ? maps : lists
  const length = title === 'Поля' ? 7 : title === 'Карта' ? 5 : 6;

  useEffect(()=> {
    if (title === 'Поля') fieldsFunc()
    if (title === 'Карта') mapFunc()
    if (title === 'Группы объектов') {
      getIconsFunc()
      listsFunc()
    }
  }, [])

  return (
    <div className={styles.wrapper_settings}>
      <div className={styles.block__title}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.block__content}>
        <div className={styles.block__columnTitle} style={(width && width <= 767.98) ? {gridTemplateRows: `repeat(${length}, 1fr)`} : { gridTemplateColumns: `repeat(${length}, 1fr)` }}>
          {arrColumn.map((titleColumn) => {
            const columnWidth = widthConfigAdaptive[title][titleColumn.name] || 'auto';
            const shouldDisplay = !(title === 'Поля' && [7, 8, 9, 10].includes(titleColumn.id)) &&
                                  !(title === 'Карта' && [3, 4, 5, 6, 8, 9].includes(titleColumn.id)) &&
                                  !(title === 'Группы объектов' && [3, 4, 5, 6, 10].includes(titleColumn.id));
            return shouldDisplay ? (
              <h3 key={titleColumn.id} className={styles.column__title} style={(width && width <= 767.98) ? {height: columnWidth} : { minWidth: columnWidth, textAlign: titleColumn.name === '#' ? 'center' : 'start' }}>
                {titleColumn.name}
              </h3>
            ) : null;
          })}
        </div>
        {
          dataMap.map((setting: IFields | ILists | IMaps, index: number) => (<OptionSetting key={setting.id} title={title} data={setting} index={index + 1} length={length}/>))
        }
        {
          (width && width > 767.98) && title !== 'Карта' && ( <AddData title={title} /> )
        }
      </div>
      {(width && width <= 767.98) && title !== 'Карта' && ( <AddData title={title} /> )}
    </div>
  )
}

export default DataSettings







// import { useSettings } from '@/hooks/useSettings'
// import { RootState } from '@/store/store'
// import { IBlockSettings } from '@/types/props.types'
// import { extractData } from '@/utils/convertData'
// import { FC, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import styles from './DataSettings.module.scss'
// import { arrColumn } from './column.data'
// import Testop from './testop/Testop'

// const DataSettings: FC<IBlockSettings> = ({title}) => {
//   const {mapFunc, fieldsFunc, getIconsFunc, listsFunc} = useSettings()
//   const {fields, getIcons, lists, maps} = useSelector((state: RootState) => state.dataSettings)

//   const dataMap =  title === 'Поля' ? fields : title === 'Карта' ? maps : lists
//   const length = title === 'Поля' ? 6 : title === 'Карта' ? 5 : 6;
//   const forGrid = title === 'Поля' ? 1 : 0;

//   const allData = {
//     fields,
//     lists,
//     maps
//   }

//   useEffect(()=> {
//     if (title === 'Поля') fieldsFunc()
//     if (title === 'Карта') mapFunc()
//     if (title === 'Группы объектов') {
//       getIconsFunc()
//       listsFunc()
//     }
//   }, [])

//   return (
//     <div className={styles.wrapper_settings}>
//       <div className={styles.block__title}>
//         <h2 className={styles.title}>{title}</h2>
//       </div>
//       <div className={styles.block__content}>
//           {
//             arrColumn.map((titleColumn, index) => {
//               const displayFileds = titleColumn.id === 7 || titleColumn.id === 8 || titleColumn.id === 9 || titleColumn.id === 10 ? {display: 'none'} : {}
//               const displayMaps = titleColumn.id === 3 || titleColumn.id === 4 || titleColumn.id === 5 || titleColumn.id === 6 || titleColumn.id === 8 || titleColumn.id === 9 ? {display: 'none'} : {}
//               const displayObjects = titleColumn.id === 3 || titleColumn.id === 4 || titleColumn.id === 5 || titleColumn.id === 6 || titleColumn.id === 10 ? {display: 'none'} : {}

//               if (title === 'Поля') {
//                 return ( 
//                   <div key={titleColumn.id} className={styles.block__columnTitle}>
//                     <h3 className={styles.column__title} style={displayFileds}>{titleColumn.name}</h3>
//                     <Testop style={displayFileds} data={extractData(allData, titleColumn.name, title)} title={title} titleColumnName={titleColumn.name} />
//                   </div>
//                 )  
//               } else if (title === 'Карта') {
//                 return ( 
//                   <div key={titleColumn.id} className={styles.block__columnTitle}>
//                   <h3 className={styles.column__title} style={displayMaps}>{titleColumn.name}</h3>
//                   <Testop style={displayMaps} data={extractData(allData, titleColumn.name, title)} title={title} titleColumnName={titleColumn.name} />
//                   </div>
//                 )  
//               } else {
//                 return ( 
//                   <div key={titleColumn.id} className={styles.block__columnTitle}>
//                   <h3 className={styles.column__title} style={displayObjects}>{titleColumn.name}</h3>
//                   <Testop style={displayObjects} data={extractData(allData, titleColumn.name, title)} title={title} titleColumnName={titleColumn.name}/>
//                   </div>
//                 )
//               }
//             })
//           }
//       </div>
//     </div>
//   )
// }

// export default DataSettings


// {/* <div className={styles.block__columnTitle} style={{gridTemplateColumns: `repeat(${length + forGrid}, 1fr)`}}>
//           {
//             arrColumn.map(titleColumn => {
//               if (title === 'Поля') {
//                 return ( 
//                   <h3 key={titleColumn.id} className={styles.column__title} style={titleColumn.id === 7 || titleColumn.id === 8 || titleColumn.id === 9 || titleColumn.id === 10 ? {display: 'none'} : {}}>{titleColumn.name}</h3>
//                 )  
//               } else if (title === 'Карта') {
//                 return ( 
//                   <h3 key={titleColumn.id} className={styles.column__title} style={titleColumn.id === 3 || titleColumn.id === 4 || titleColumn.id === 5 || titleColumn.id === 6 || titleColumn.id === 8 || titleColumn.id === 9 ? {display: 'none'} : {}}>{titleColumn.name}</h3>
//                 )  
//               } else {
//                 return ( 
//                   <h3 key={titleColumn.id} className={styles.column__title} style={titleColumn.id === 3 || titleColumn.id === 4 || titleColumn.id === 5 || titleColumn.id === 6 || titleColumn.id === 10 ? {display: 'none'} : {}}>{titleColumn.name}</h3>
//                 )
//               }
//             })
//           }
//         </div>
//         {
//           dataMap.map((setting: IFields | ILists | IMaps, index: number) => (<OptionSetting title={title} data={setting} index={index + 1} length={length}/>))
//         } */}