import { ACCESSIBLYMAP } from '@/app.constants';
import Button from '@/components/ui/buttons/button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useSaveObject } from '@/hooks/useSaveObject';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import ButtonEditing from '../ui/buttons/button-editing/ButtonEditing';
import ButtonSettings from '../ui/buttons/button-settings/ButtonSettings';
import styles from './Header.module.scss';
import { arrayEditingObjects, arrayImportExport, arrayNumIcons, arrayNumMenuIcons, arrayNumSettingIcons } from './icons.data';

export function Header({data}:any) {
	const dispatch = useDispatch()
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const viewSettings = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const {map, accessiblyMap} = useSelector(
		(state: RootState) => state.userMap,
	);
	const {saveObjectMobile} = useSaveObject()
	const { width } = useWindowDimensions();
	const {isAuth} = useAuth()
	const searchParams = new URLSearchParams(window.location.search);

	/////
  const title = useSelector((state:RootState) => state.dataMapSettings.data.title)
	////
	
	const isEdit = accessiblyMap.some(elem => elem === map)

	const isEdit1 = Cookies.get(ACCESSIBLYMAP) === searchParams.get('map')

	return (
		<header className={styles.header}>
			<div className={styles.map__buttons}>
				{
					(width && width <= 767.98) && ( <div className={viewSettings.isBurger ? `${styles.block__burger} ${styles.close}` : styles.block__burger} onClick={()=> dispatch(viewSettingsAction.toggleBurger(''))}>
						<button></button> 
					</div>
					)
				}
				{ !(width && width <= 767.98) && 
					<>
						{
							arrayEditingObjects.map(icon => {
								return <ButtonEditing key={icon.id} icon={icon} />;
							})
						}
						<div className={styles.line}></div>
						{ arrayNumIcons.map(icon => {
							return <Button key={icon.id} icon={icon} />;
						})}
						<div className={styles.line}></div>
						{
							(arrayImportExport.map(icon => {
								return <ButtonSettings key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1)} />
							}))
						}
						<div className={styles.line}></div>
						{
							(arrayNumSettingIcons.map(icon => {
								return <ButtonSettings key={icon.id} icon={icon} isDisabled={!(isAuth && isEdit1)} />
							}))
						}
					</>
				}
				
				{((width && width <= 767.98)) && <button className={styles.crd__button} disabled={!(isAuth && isEdit1)} onClick={()=> {
						if (viewSettings.editingObjects.isMobileEditCrd) {
							dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
							dispatch(viewSettingsAction.toggleIsMobileEditCrd(''))

							const timeoutId = setTimeout(()=> {
								saveObjectMobile()
							}, 1000)
							return () => clearTimeout(timeoutId)
						} else {
							dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
							dispatch(viewSettingsAction.toggleIsMobileEditCrd(''))
						}
							}}><svg className={styles.crd__marker} style={viewSettings.editingObjects.isMobileEditCrd ? {color: 'red'} : {color: '#26a69a'}}>
									<use
										xlinkHref={'/images/svg/sprite.svg#target'}
									></use>
								</svg></button> }
				<div className={styles.block__title}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<h1 className={styles.title} style={{opacity: '0', position: 'absolute', top:'0', left: '0', zIndex: '-20'}}>
							{data.title
							? data.title
							: ''}
					</h1>
					{/* <h1 className={styles.title}>
							{title
							? title
							: 'Тестовая карта'}
					</h1> */}
					<h1 className={styles.title}>
							{dataObjectsInMap.points.title
							? dataObjectsInMap.points.title
							: ''}
					</h1>
				</div>
			</div>
			<div className={styles.settings__buttons}>
				{arrayNumMenuIcons.map(icon => {
					if (dataObjectsInMap.points['all-points'] >= 6000 && icon.id === 7) {
						return null;
					} else {
						return <Button key={icon.id} icon={icon} />;
					}
				})}
			</div>
		</header>
	);
}
