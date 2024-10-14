import { ACCESSIBLYMAP } from '@/app.constants'
import { arrayEditingObjects, arrayImportExport, arrayNumIcons, arrayNumSettingIcons } from '@/components/header/icons.data'
import { useAuth } from '@/hooks/useAuth'
import Cookies from 'js-cookie'
import { FC } from 'react'
import ButtonEditing from '../buttons/button-editing/ButtonEditing'
import ButtonSettings from '../buttons/button-settings/ButtonSettings'
import Button from '../buttons/button/Button'
import styles from './BurgerMenu.module.scss'

const BurgerMenu: FC = () => {
  const {isAuth} = useAuth()
  const searchParams = new URLSearchParams(window.location.search);
  const isEdit1 = Cookies.get(ACCESSIBLYMAP) === searchParams.get('map')

  return (
    <div className={styles.wrapper_burger}>
      {	
			// (isAuth && isEdit1) && 
					arrayEditingObjects.map(icon => {
						return <ButtonEditing key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1) } />;
					})
				}
				<div className={styles.line}></div>
				{ arrayNumIcons.map(icon => {
					return <Button key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1) } />;
				})
      }
			<div className={styles.line}></div>
						{ 
						// (isAuth && isEdit1) && 
							(arrayImportExport.map(icon => {
								return <ButtonSettings key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1)} />
							}))
						}
      <div className={styles.line}></div>
				{ 
				// (isAuth && isEdit1) && 
					(arrayNumSettingIcons.map(icon => {
						return <ButtonSettings key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1) } />
					}))
				}
    </div>
  )
}

export default BurgerMenu