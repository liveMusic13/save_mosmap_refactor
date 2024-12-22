import useWindowDimensions from '@/hooks/useWindowDimensions';
import { IOptionBlock } from '@/types/props.types';
import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './OptionBlock.module.scss';
import ChoiceIcon from './choise-icon/ChoiceIcon';

const OptionBlock: FC<IOptionBlock> = ({option, index, listItems, setListItems, handleChange, deleteOption, viewColor, setViewColor, viewIcon, setViewIcon}) => {
  const {width} = useWindowDimensions()
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [color, setColor] = useState(option.color ? `${option.color}` : 'rgba(0, 0, 0, .6)');

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

  const objStyleField = {
    zero: (width && width <= 767.98) ? 'calc(500/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(680/1440*100vw)' : 'calc(599/1440*100vw)',
    one: (width && width <= 767.98) ? 'calc(500/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(486/1440*100vw)' : 'calc(279/1440*100vw)',
    two: (width && width <= 767.98) ? 'calc(500/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(386/1440*100vw)' : 'calc(186/1440*100vw)', 
  }

  const renderColumn = () => {
    if (listItems && listItems.length > 0) {
      if (listItems[0].color !== undefined && listItems[0].icon_name !== undefined) {
        return (
          <>
            <input type="text" style={{width: objStyleField.two}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
            <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
              <svg className={styles.img__close} style={{color: color}} onClick={()=> setViewIcon({id: option.id, isView:true})}>
                <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
              </svg>
              {
                (viewIcon.id === option.id && viewIcon.isView) && <ChoiceIcon setViewIcon={setViewIcon} setListItems={setListItems} option={option} />
              }
            </div>
            
              <div className={styles.solo__block} style={{width: 'calc(186/1440*100vw)'}}>
                  <div className={styles.block} style={{backgroundColor: color, border: '1px solid rgba(0, 0, 0, 0.3)'}} onClick={() => setViewColor({id: option.id, isView:true})}></div> 
                { (viewColor.id === option.id && viewColor.isView) &&
                  <div className={styles.block__colors_parent}>
                    <div className={styles.block__colors}>
                      <HexColorPicker color={color} onChange={setColor} />
                      <button className={styles.button__colors} onClick={()=> setViewColor({id: option.id, isView:false})}>Закрыть</button>
                    </div>
                  </div>
                }
              </div>
          </>
        )
      } else if (listItems[0].icon_name !== undefined) {
        return (
          <>
            <input type="text" style={{width: objStyleField.one}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
            <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
              <svg className={styles.img__close} style={{color: color}} onClick={()=> setViewIcon({id: option.id, isView:true})}>
                <use xlinkHref={`/images/svg/sprite.svg#${option.icon_name}`}></use>
              </svg>
              {
                (viewIcon.id === option.id && viewIcon.isView) && <ChoiceIcon setViewIcon={setViewIcon} setListItems={setListItems} option={option} />
              }
            </div>          
          </>
        )
      } else if (listItems[0].color !== undefined) {
        return (
          <>
            <input type="text" style={{width: objStyleField.one}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>

            <div className={styles.solo__block} style={{width: 'calc(279/1440*100vw)'}}>
            <div className={styles.block} style={{backgroundColor: color, border: '1px solid rgba(0, 0, 0, 0.3)'}} onClick={() => setViewColor({id: option.id, isView:true})}></div> 
              { (viewColor.id === option.id && viewColor.isView) &&
                  <div className={styles.block__colors_parent}>
                    <div className={styles.block__colors}>
                      <HexColorPicker color={color} onChange={setColor} />
                      <button className={styles.button__colors} onClick={()=> setViewColor({id: option.id, isView:false})}>Закрыть</button>
                    </div>
                  </div>
                }
            </div>
          </>
        )
      } else {
        return (
          <input type="text" style={{width: objStyleField.zero}} className={styles.field} value={listItems[index].name} onChange={(e) => handleChange(e.target.value, option.id)}/>
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