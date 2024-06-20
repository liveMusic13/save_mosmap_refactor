import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AllObjects } from '@/components/content/all-objects/AllObjects';
import Filters from '@/components/content/filters/Filters';
import ObjectInfo from '@/components/content/object-info/ObjectInfo';

import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import { useSaveObject } from '@/hooks/useSaveObject';
import AddAndEditObject from '../content/filters/add-and-edit-object/AddAndEditObject';
import { arrayEditingObjects } from '../header/icons.data';
import ButtonEditing from '../ui/buttons/button-editing/ButtonEditing';
import styles from './SettingsMap.module.scss';

export function SettingsMap() {
	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();
	const [isMobile, setIsMobile] = useState(false);
	const {saveObject} = useSaveObject()

	useEffect(() => {
		if (width && width <= 767.98) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

	const editIcon = arrayEditingObjects.filter(icon => icon.id === 10)[0]
	
	return (
		<div className={styles.wrapper_settings}>
			{
				viewSettings.editingObjects.isActiveAddButton &&
					<div className={styles.block__buttons} style={viewSettings.editingObjects.isActiveAddButton ? {marginTop: 'calc(102 / 1440 * 100vw)'}:{}}>
						<ButtonEditing icon={arrayEditingObjects.filter(icon => icon.id === 9)[0]}/>
					</div>
			}
				{
					(viewSettings.editingObjects.isActiveEditButton || viewSettings.isObjectInfo) && 
						<div className={styles.block__buttons} datatype='dsds' style={viewSettings.editingObjects.isActiveEditButton ? {marginTop: 'calc(102 / 1440 * 100vw)'}:{}}>
							<button className={styles.buttonEditing} onClick={()=> {
								if (width && width <= 767.98 && viewSettings.isObjectInfo) dispatch(viewSettingsAction.defaultObjectInfo(''))
								if (width && width <= 767.98 && editIcon.id === 10) {
									dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
									
									if(viewSettings.editingObjects.isActiveEditButton) {
										saveObject()
										dispatch(viewSettingsAction.toggleSettingsMap(''))
									} else {
										
										dispatch(viewSettingsAction.activeSettingsMap(''))
									}
								}
							}}><svg className={styles.icon_svg} style={{color: '#26a69a'}}>
									<use
										xlinkHref={editIcon.src}
									></use>
								</svg>
							</button>
						</div>
				}

				{ (viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) && <button
					className={styles.button__save}
          onClick={()=> {
						if (width && width <= 767.98) dispatch(viewSettingsAction.toggleSettingsMap(''))

            if (viewSettings.editingObjects.isActiveAddButton) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              saveObject()
            } else if (viewSettings.editingObjects.isActiveEditButton) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
              saveObject()
            }
          }}
				>
					<img src="./images/icons/ok.svg" alt="ok" />
				</button>}

				<button
					className={styles.settings__button}
					style={(viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) ? {marginTop: 'calc(102 / 1440 * 100vw)'}:{}}
					onClick={() => {
						dispatch(viewSettingsAction.toggleSettingsMap(''));
						if (viewSettings.isViewFilters)
							dispatch(viewSettingsAction.toggleFilters(''));
						if (viewSettings.isViewObjects)
							dispatch(viewSettingsAction.toggleObjects(''));
						if (width && width <= 767.98)
							dispatch(viewSettingsAction.defaultObjectInfo(''));
						if (viewSettings.editingObjects.isActiveAddButton) dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
						if (viewSettings.editingObjects.isActiveEditButton) dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
					}}
				>
					<span></span>
				</button>
			{viewSettings.isViewFilters && <Filters />}
			{viewSettings.isObjectInfo && <ObjectInfo />}
			{viewSettings.isViewObjects && <AllObjects />}
			{(viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) && <AddAndEditObject/>}
		</div>
	);
}
