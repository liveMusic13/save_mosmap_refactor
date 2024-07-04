// import { IOptionBlock } from '@/types/props.types';
// import { FC, useEffect, useState } from 'react';
// import { ColorPicker, useColor } from 'react-color-palette';
// import "react-color-palette/css";
// import { useDispatch } from 'react-redux';
// import styles from './OptionBlock.module.scss';

// const OptionBlock: FC<IOptionBlock> = ({option, index, listItems, handleChange, deleteOption, newListItems, setNewListItems}) => {
//   const dispatch = useDispatch();
//   const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
//   const [color, setColor] = useColor(option.color ? `#${option.color}` : 'rgba(0, 0, 0, .6)');
//   const [isViewColor, setIsViewColor] = useState(false)
  
//   // console.log('Color hex:', color.hex);
//   // console.log('option.color:', option.color);

//   useEffect(()=> {
//     setNewListItems(prev => {
//       let data = listItems.filter(elem => elem.id === option.id)
//       data[0].color = color.hex
//       return [...prev, data[0]]
//     })
//   }, [color])

//   const handleMouseEnter = () => {
//     setIsMouseEnter(true);
//   };
//   const handleMouseLeave = () => {
//     setIsMouseEnter(false);
//   };

//   const renderColumn = () => {
//     if (listItems && listItems.length > 0) {
//       if (listItems[0].color !== undefined && listItems[0].icon_name !== undefined) {
//         return (
//           <>
//             <input type="text" style={{width: 'calc(186/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
//             <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
//               <svg className={styles.img__close} style={option.color ? {color: `#${option.color}`} : {color: 'rgba(0, 0, 0, .6)'}}>
//                 <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
//               </svg>
//             </div>
//             {/* { !isViewColor ?
//               <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
//                 <div className={styles.block} style={{backgroundColor: typeof color.hex === 'string' ? color.hex : '#000'}} onClick={() => setIsViewColor(true)}></div>
//               </div>
//               :
//               <div className={styles.block__colors_parent}>
//                 <div className={styles.block__colors}>
//                   <ColorPicker color={color} onChange={setColor} />
//                   <button onClick={()=> setIsViewColor(false)}>Закрыть</button>
//                 </div>
//               </div>
//             } */}
            
//               <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
//                 <div className={styles.block} style={{backgroundColor: typeof color.hex === 'string' ? color.hex : 'rgba(0, 0, 0, .6)'}} onClick={() => setIsViewColor(true)}></div>
//                 { isViewColor &&
//                   <div className={styles.block__colors_parent}>
//                     <div className={styles.block__colors}>
//                       <ColorPicker hideInput={['hex']} color={color} onChange={setColor} />
//                       <button onClick={()=> setIsViewColor(false)}>Закрыть</button>
//                     </div>
//                   </div>
//                 }
//               </div>
//           </>
//         )
//       } else if (listItems[0].icon_name !== undefined) {
//         return (
//           <>
//             <input type="text" style={{width: 'calc(279/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
//             <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
//               <svg className={styles.img__close} style={option.color ? {color: `#${option.color}`} : {color: 'rgba(0, 0, 0, .6)'}}>
//                 <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
//               </svg>              
//             </div>          
//           </>
//         )
//       } else if (listItems[0].color !== undefined) {
//         return (
//           <>
//             <input type="text" style={{width: 'calc(279/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>

//             <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
//               <div className={styles.block} style={{backgroundColor: typeof color.hex === 'string' ? color.hex : 'rgba(0, 0, 0, .6)'}} onClick={() => setIsViewColor(true)}></div>
//               { isViewColor &&
//                 <div className={styles.block__colors_parent}>
//                   <div className={styles.block__colors}>
//                     <ColorPicker color={color} onChange={setColor} />
//                     <button onClick={()=> setIsViewColor(false)}>Закрыть</button>
//                   </div>
//                 </div>
//               }
//             </div>
//           </>
//         )
//       }
//     }
//   }

//   const style = {
//     backgroundColor: isMouseEnter ? 'rgba(242, 242, 242, 1)' : index % 2 === 0 ? undefined : 'rgba(242, 242, 242, .5)',
//   };

//   return (
//     <div className={styles.block__option} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <p className={styles.index}>{index + 1}</p>
//       {renderColumn()}
//       <button className={styles.button__close} onClick={() => deleteOption(option.id)}>
//         <svg className={styles.img__close} style={{color: 'rgba(0, 0, 0, .6)'}}>
// 					<use xlinkHref={'/images/svg/sprite.svg#close'}></use>
// 				</svg>
//       </button>
//     </div>
//   )
// }

// export default OptionBlock


import { IOptionBlock } from '@/types/props.types';
import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
// import "react-colorful/dist/index.css";
import { useDispatch } from 'react-redux';
import styles from './OptionBlock.module.scss';
import ChoiceIcon from './choise-icon/ChoiceIcon';

const OptionBlock: FC<IOptionBlock> = ({option, index, listItems, setListItems, handleChange, deleteOption}) => {
  const dispatch = useDispatch();
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [color, setColor] = useState(option.color ? `${option.color}` : 'rgba(0, 0, 0, .6)');
  const [isViewColor, setIsViewColor] = useState(false)
  const [isViewIcon, setIsViewIcon] = useState(false)
  console.log(color)
  useEffect(() => {
    if (option.color || option.color === '') {
      setListItems((prev: any) => {
        const updatedListItems = prev.map((item: any) => {
          if (item.id === option.id) {
            return { ...item, color: color };
          }
          return item;
        });
        return updatedListItems;
      });
      console.log(option.color, option.id, option.name, color);
    }
  }, [color]);


  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  const renderColumn = () => {
    if (listItems && listItems.length > 0) {
      if (listItems[0].color !== undefined && listItems[0].icon_name !== undefined) {
        return (
          <>
            <input type="text" style={{width: 'calc(186/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
            <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
              {/* <svg className={styles.img__close} style={option.color ? {color: `#${option.color}`} : {color: 'rgba(0, 0, 0, .6)'}}> */}
              <svg className={styles.img__close} style={{color: color}} onClick={()=> setIsViewIcon(true)}>
                <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
              </svg>
              {
                isViewIcon && <ChoiceIcon setIsViewIcon={setIsViewIcon} setListItems={setListItems} option={option} />
              }
            </div>
            
              <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
              <div className={styles.block} style={{backgroundColor: color, border: '1px solid rgba(0, 0, 0, 0.3)'}} onClick={() => setIsViewColor(true)}></div> 
                { isViewColor &&
                  <div className={styles.block__colors_parent}>
                    <div className={styles.block__colors}>
                      <HexColorPicker color={color} onChange={setColor} />
                      <button className={styles.button__colors} onClick={()=> setIsViewColor(false)}>Закрыть</button>
                    </div>
                  </div>
                }
              </div>
          </>
        )
      } else if (listItems[0].icon_name !== undefined) {
        return (
          <>
            <input type="text" style={{width: 'calc(279/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
            <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
              <svg className={styles.img__close} style={option.color ? {color: `#${option.color}`} : {color: 'rgba(0, 0, 0, .6)'}}>
                <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
              </svg>              
            </div>          
          </>
        )
      } else if (listItems[0].color !== undefined) {
        return (
          <>
            <input type="text" style={{width: 'calc(279/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>

            <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
              <div className={styles.block} style={{backgroundColor: typeof color === 'string' ? color : 'rgba(0, 0, 0, .6)'}} onClick={() => setIsViewColor(true)}></div>
              { isViewColor &&
                <div className={styles.block__colors_parent}>
                  <div className={styles.block__colors}>
                    <HexColorPicker color={color} onChange={setColor} />
                    <button className={styles.button__colors} onClick={()=> setIsViewColor(false)}>Закрыть</button>
                  </div>
                </div>
              }
            </div>
          </>
        )
      } else {
        return (
          <input type="text" style={{width: 'calc(599/1440*100vw)'}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
        )
      }
    }
  }

  const style = {
    backgroundColor: isMouseEnter ? 'rgba(242, 242, 242, 1)' : index % 2 === 0 ? undefined : 'rgba(242, 242, 242, .5)',
  };

  return (
    <div className={styles.block__option} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <p className={styles.index}>{index + 1}</p>
      {renderColumn()}
      <button className={styles.button__close} onClick={() => deleteOption(option.id)}>
        <svg className={styles.img__close} style={{color: 'rgba(0, 0, 0, .6)'}}>
					<use xlinkHref={'/images/svg/sprite.svg#close'}></use>
				</svg>
      </button>
    </div>
  )
}

export default OptionBlock