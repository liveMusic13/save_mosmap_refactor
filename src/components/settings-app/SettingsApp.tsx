import { RootState } from '@/store/store'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmPopup from '../ui/confirm-popup/ConfirmPopup'
import styles from './SettingsApp.module.scss'
import BlockSettings from './block-settings/BlockSettings'
import DataSettings from './data-settings/DataSettings'
import SettingGroups from './data-settings/option-setting/setting-groups/SettingGroups'
import PopupEdit from './data-settings/popup-edit/PopupEdit'
import { arraySettingNames } from './settings.data'

const SettingsApp: FC = () => {
  const dispatch = useDispatch()
  const {isSettingsApp, isSettingsData, isViewPopupSettings, isViewDeletePopup, isPopupSettingGroups} = useSelector((state:RootState) => state.viewSettings)

  const _onClick = () => {
    if (isSettingsApp) dispatch(viewSettingsAction.defaultSettingsApp(''))
    if (isSettingsData) dispatch(viewSettingsAction.defaultSettingsData(''))
  }

  return (
    <div className={styles.wrapper_settingsApp}>
      <header className={styles.header__settingsApp}>
        <h2>{isSettingsApp ? 'Настройка карты' : isSettingsData ? 'Настройка объектов' : ''}</h2>
        <button className={styles.button__goMap} onClick={_onClick}>НА КАРТУ</button>
      </header>
      <div className={styles.block__content}>
        {isSettingsApp && <BlockSettings title='Настройка карты' />}
        {isSettingsData && arraySettingNames.map(setting => <DataSettings key={setting} title={setting} />)}
        {isViewPopupSettings && <PopupEdit/>}
        {isPopupSettingGroups && <SettingGroups/>}
      </div>
        { isViewDeletePopup && (
            <>
              <div style={{position: 'fixed', top: '0', left: '0', bottom: '0', right: '0', backgroundColor: 'black', opacity: '0.3', zIndex: '1000'}}></div>
              <ConfirmPopup popupFor='settings'/>
            </>
          )
        } 
    </div>
  )
}

export default SettingsApp

