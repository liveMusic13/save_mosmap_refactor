import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import { IMarker } from '@/types/slice.types';
import BurgerMenu from '../ui/burger-menu/BurgerMenu';
import ConfirmPopup from '../ui/confirm-popup/ConfirmPopup';
import styles from './Content.module.scss';
import { AllObjects } from './all-objects/AllObjects';
import Filters from './filters/Filters';
import AddAndEditObject from './filters/add-and-edit-object/AddAndEditObject';
import ObjectInfo from './object-info/ObjectInfo';

const DynamicMapCustom = dynamic(
	() => import('./custom-map/CustomMap').then(mod => mod.CustomMap),
	{ ssr: false },
);

export function Content({data}:any) {

	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const { width } = useWindowDimensions();
	const [isDisplay, setIsDisplay] = useState<boolean>(true);
	const dispatch = useDispatch();

	useEffect(() => {
		if (width && width <= 768) {
			setIsDisplay(false);
			dispatch(viewSettingsAction.defaultDisplay(''));
		} else if (width && width > 768) {
			setIsDisplay(true);
			dispatch(viewSettingsAction.activeDisplay(''));
		}
	}, [width]);

	useEffect(() => {
		if (viewSettings.editingObjects.isActiveEditButton || viewSettings.editingObjects.isActiveAddButton) {
			const elements = document.querySelectorAll('.leaflet-container.leaflet-touch.leaflet-retina.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom');
			elements.forEach((element) => {
				(element as HTMLDivElement).style.cursor = 'crosshair';
			});
		} else {
			const elements = document.querySelectorAll('.leaflet-container.leaflet-touch.leaflet-retina.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom');
			elements.forEach((element) => {
				(element as HTMLDivElement).style.cursor = 'grab';
			});
		}
	}, [viewSettings.editingObjects.isActiveEditButton, viewSettings.editingObjects.isActiveAddButton]);

	return (
		<div className={styles.wrapper } >
			{viewSettings.isBurger && <BurgerMenu/>}
			{(viewSettings.editingObjects.isViewPopup.isObject || viewSettings.editingObjects.isViewPopup.isMarker) && <ConfirmPopup/>}
			{(viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) && <AddAndEditObject/>}
			{viewSettings.isViewFilters && <Filters />}
			{viewSettings.isObjectInfo && <ObjectInfo isDisplay={isDisplay} />}
			{viewSettings.isViewObjects &&
				dataObjectsInMap.points['all-points'] <= 6000 && (
					<AllObjects />
				)}
				<div style={{opacity:'0', position: 'absolute', zIndex: '-1'}}>
				{data.points.map((elem: IMarker) => {
						return (
							<div
								key={elem.id}
								className={styles.object}
							>
								<p>{elem.name}</p>
							</div>
						);
					})}</div>
			<div className={styles.block__map}>
				<DynamicMapCustom />
				<div className={styles.logo__image}>
					<a href='https://mosmap.ru'></a>
				</div>
			</div>
		</div>
	);
}
