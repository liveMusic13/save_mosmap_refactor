import { useDeleteField } from '@/hooks/useDeleteField'
import { useDeleteMarker } from '@/hooks/useDeleteMarker'
import { useDeleteObject } from '@/hooks/useDeleteObject'
import { RootState } from '@/store/store'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ConfirmPopup.module.scss'

const ConfirmPopup: FC<{popupFor?: string}> = ({popupFor}) => {
  const buttons:string[] = ['Подтвердить', 'Отмена']
  // const {isViewPopup} = useSelector((state:RootState)=> state.viewSettings.editingObjects)
  const {editingObjects} = useSelector((state:RootState)=> state.viewSettings)
  const dispatch = useDispatch()
  const {deleteObject} = useDeleteObject()
  const {deleteMarker} = useDeleteMarker()
  const { deleteFieldFunc } = useDeleteField()

  const _onClick = async (buttonText: string) => {
    if (buttonText === 'Отмена') {
      console.log('fsdfsdfs')
      dispatch(viewSettingsAction.defaultIsViewPopupMarker(''));
      dispatch(viewSettingsAction.defaultIsViewPopupObject(''));
    } else {
      if (editingObjects.isViewPopup.isMarker) {
        await deleteMarker();
        dispatch(viewSettingsAction.defaultIsViewPopupMarker(''));
      } else if (editingObjects.isViewPopup.isObject) {
        await deleteObject();
        dispatch(viewSettingsAction.defaultIsViewPopupObject(''));
      }
    }
  };

  const onClickSettings = async (buttonText: string) => {
    if (buttonText === 'Отмена') {
      dispatch(viewSettingsAction.defaultIsViewDeletePopup(''))
    } else {
      await deleteFieldFunc()
      dispatch(viewSettingsAction.defaultIsViewDeletePopup(''))
    }
  }

  return (
      <div className={styles.wrapper_popup} style={popupFor === 'settings' ? {position: 'fixed'} : {}}>
        {editingObjects.isViewPopup.isMarker && <p className={styles.questions}>Удалить маркер ?</p> }
        {editingObjects.isViewPopup.isObject && <p className={styles.questions}>Удалить объект ?</p> }
        {popupFor === 'settings' && <p className={styles.questions}>Удалить поле?</p>}
        <div className={styles.block__button}>
          {
            buttons.map(button => ( <button key={button} onClick={() => popupFor === 'settings' ? onClickSettings(button) : _onClick(button)}>{button}</button> ))
          }
        </div>
      </div>
  )
}

export default ConfirmPopup