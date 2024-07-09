import { RootState } from '@/store/store'
import { IChoiceIcon } from '@/types/props.types'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import styles from './ChoiceIcon.module.scss'

const ChoiceIcon: FC<IChoiceIcon> = ({setIsViewIcon, setListItems, option}) => {
  const {getIcons} = useSelector((state: RootState) => state.dataSettings)

  const addIcon = (icon:string) => {
    setListItems((prev: any) => {
      const updatedData = prev.map((elem: any) => {
        if (elem.id === option.id) {
          // Обновляем только свойство icon_name
          return { ...elem, icon_name: icon };
        }
        return elem;
      });
      return updatedData;
    });
  
    setIsViewIcon(false);
  }

  return (
    <div className={styles.wrapper_choiceIcon}>
      <div className={styles.block__icons}>
        {
          getIcons.map((elem:any) => (
            <svg className={styles.img__close} key={elem} onClick={() => addIcon(elem)} >
              <use xlinkHref={`/images/svg/sprite.svg#${elem}`}></use>
            </svg>
          )
          )
        }
      </div>
      <button className={styles.button__colors} onClick={()=> setIsViewIcon(false)}>Закрыть</button>
    </div>
  )
}

export default ChoiceIcon