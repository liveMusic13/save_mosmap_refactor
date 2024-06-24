import { actions as dataMapSettingsAction } from '@/store/data-map-settings/dataMapSettings.slice'
import { RootState } from '@/store/store'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './SelectTailes.module.scss'

const SelectTailes: FC<{formState:any, setFormState:any}> = ({formState, setFormState}) => {
  const data = useSelector((state:RootState) => state.dataMapSettings)
  const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
  const [isMouse, setIsMouse] = useState<boolean>(false)
  const dispatch = useDispatch()


  const handleClick = (option:any) => () => {
    setFormState((prev: any) => ({...prev, ['tiles_id']: option.id}))

    dispatch(dataMapSettingsAction.editDataMapSettings({['tiles_id']: option.id}))

    setIsViewOptions(false)
  }

  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleMouseEnter = (option: any) => () => {
    setHoveredOption(option.name);
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

  const targetOption = (data.tiles_list && data) ? data.tiles_list.filter((elem:any) => elem.id === data.tiles_id) : [{name: ''}]
  console.log(targetOption)
  return (
    <div className={styles.wrapper_selectData} onClick={()=> setIsViewOptions(!isViewOptions)}>
      <div className={styles.block__selectData}>
        {/* <p>{formState['tiles_name']}</p> */}
        <p>{targetOption[0].name}</p>
        <img src="../images/icons/arrow.svg" alt="arrow" />
      </div>
      {
        isViewOptions && (
          <div className={styles.block__options} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {
              (data.tiles_list && data) && data.tiles_list.map((option:{name: string, id: string}) => (
                <p 
                  key={option.name} 
                  className={formState[option.name] === option.name ? `${styles.option} ${styles.active}` : hoveredOption === option.name ? `${styles.option} ${styles.target}` : styles.option} 
                  onClick={handleClick(option)}
                  onMouseEnter={handleMouseEnter(option)}
                  onMouseLeave={handleMouseLeave}
                >
                  {option.name}
                </p>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default SelectTailes