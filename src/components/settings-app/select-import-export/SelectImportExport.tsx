import { FC, useState } from 'react';
import styles from './SelectImportExport.module.scss';

const SelectImportExport: FC<{data:string[]}> = ({data, targetOption, setTargetOption}) => {
  const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  // const [targetOption, setTargetOption] = useState<string>('')


  const handleClick = (option:any) => () => {
    // setFormState((prev: any) => ({...prev, ['tiles_id']: option.id}))
    // setData((prev:string) => ([...prev, option]))
    setTargetOption(option)
    setIsViewOptions(false)
  }

  const handleMouseEnter = (option: any) => () => {
    setHoveredOption(option);
  }

  const handleMouseLeave = () => {
    setHoveredOption(null);
  }

  return (
    <div className={styles.wrapper_selectData} onClick={()=> setIsViewOptions(!isViewOptions)}>
      <div className={styles.block__selectData}>
        <p>{targetOption}</p>
        <img src="/images/icons/arrow.svg" alt="arrow" />
      </div>
      {
        isViewOptions && (
          <div className={styles.block__options}>
            {
              data.map((option:string) => (
                <p 
                  key={option} 
                  // className={formState[option] === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option} 
                  className={targetOption === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option} 
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

export default SelectImportExport