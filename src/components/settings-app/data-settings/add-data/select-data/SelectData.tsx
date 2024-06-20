import { ISelectData } from '@/types/props.types';
import { FC, useState } from 'react';
import styles from './SelectData.module.scss';

const SelectData: FC<ISelectData> = ({valueSelect, setValueSelect}) => {
  const data:string[] = ['Строка', 'Число', 'Текст']
  const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
  const [isMouse, setIsMouse] = useState<boolean>(false)

  const handleClick = (option:string) => () => {
    setValueSelect(option)
    setIsViewOptions(false)
  }

  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleMouseEnter = (option: string) => () => {
    setHoveredOption(option);
  }

  const handleMouseLeave = () => {
    setHoveredOption(null);
  }

  const mouseEnter = () => {
    setIsMouse(true)
  }

  const mouseLeave = () => {
    setIsMouse(false)
  }

  return (
    <div className={styles.wrapper_selectData} onClick={()=> setIsViewOptions(!isViewOptions)}>
      <div className={styles.block__selectData}>
        <p>{valueSelect}</p>
        <img src="../images/icons/arrow.svg" alt="arrow" />
      </div>
      {
        isViewOptions && (
          <div className={styles.block__options} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {
              data.map(option => (
                <p 
                  key={option} 
                  className={valueSelect === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option} 
                  onClick={handleClick(option)}
                  onMouseEnter={handleMouseEnter(option)}
                  onMouseLeave={handleMouseLeave}
                >
                  {option}
                </p>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default SelectData