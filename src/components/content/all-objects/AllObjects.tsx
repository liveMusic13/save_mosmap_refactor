import { FC, createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/ui/buttons/button/Button';
import { Loading } from '@/components/ui/loading/Loading';

import { IDataObjectInfo, IMarker } from '@/types/slice.types';

import { RootState } from '@/store/store';

import { useSearchObjectInMap } from '@/hooks/useSearchObjectInMap';
import useWindowDimensions from '@/hooks/useWindowDimensions';

import { mapService } from '@/services/map.service';
import { isMarkerInsidePolygon } from '@/utils/isMarkernsidePolygon';
import styles from './AllObjects.module.scss';

export const AllObjects: FC = () => {
	const dataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const dataObjectInfo: IDataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const mapLayers: any = useSelector(
		(state: RootState) => state.mapLayers,
	);
	const { newCenter } = useSearchObjectInMap();
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();
	

	useEffect(() => {
		if (width && width <= 767.98) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

	const objects = mapLayers.arrayPolygons.length === 0 ? dataObjectsInMap?.points?.points : dataObjectsInMap?.points?.points.filter((marker:IMarker) => isMarkerInsidePolygon(marker, mapLayers.arrayPolygons[mapLayers.indexTargetPolygon]));
	
	const targetObject = useMemo(
		() => objects.find((elem: IMarker) => elem.id === dataObjectInfo.id),
		[objects, dataObjectInfo.id],
	);

	const objectRefs = useRef(objects.map(() => createRef()));
	const containerRef = useRef<null | HTMLDivElement>(null); // ссылка на контейнер

	// useEffect(() => {
	// 	if (targetObject) {
	// 		// Находим индекс целевого объекта
	// 		const targetIndex = objects.findIndex(
	// 			(obj: IMarker) => obj.id === targetObject.id,
	// 		);

	// 		// Получаем ссылки на элемент и контейнер
	// 		const element = objectRefs.current[targetIndex].current;
	// 		const container: any = containerRef.current;

	// 		// Вычисляем необходимые значения
	// 		let offsetTop = element.offsetTop; // вертикальное расстояние от элемента до верхней границы контейнера
	// 		let middleOffset = container.offsetHeight / 2; // половина высоты контейнера

	// 		// Прокручиваем к целевому объекту
	// 		container.scrollTop = offsetTop - middleOffset;
	// 	}
	// }, [targetObject, objects]);

	useEffect(() => {
    if (targetObject) {
        // Находим индекс целевого объекта
        const targetIndex = objects.findIndex(
            (obj: IMarker) => obj.id === targetObject.id,
        );

        // Проверяем, что индекс найден и соответствующий реф существует
        if (targetIndex !== -1 && objectRefs.current[targetIndex]?.current) {
            // Получаем ссылки на элемент и контейнер
            const element = objectRefs.current[targetIndex].current;
            const container: any = containerRef.current;

            // Проверяем, что элемент и контейнер существуют
            if (element && container) {
                // Вычисляем необходимые значения
                let offsetTop = element.offsetTop; // вертикальное расстояние от элемента до верхней границы контейнера
                let middleOffset = container.offsetHeight / 2; // половина высоты контейнера

                // Прокручиваем к целевому объекту
                container.scrollTop = offsetTop - middleOffset;
            }
        }
    }
}, [targetObject, objects]);

	const mapIcon = {
		id: 0,
		src: '/images/svg/sprite.svg#target',
		hover_text: 'Показать на карте',
	};

	let style: any = {};

	if (!(viewSettings.isObjectInfo || viewSettings.isViewFilters)) {
		style.left = '0';
	}
	console.log('objects', objects)

	return (
		<div className={styles.block__allObjects} style={style}>
			<div className={styles.block__title}>
				<div className={styles.allObjects}>
					<p className={styles.description}>Всего объектов в списке:</p>
					<p className={styles.value}>
							{
								mapLayers.arrayPolygons[mapLayers.indexTargetPolygon] ? objects.length : dataObjectsInMap.points['all-points']
								? dataObjectsInMap.points['all-points']
								: '0'
							}
					</p>
				</div>
				<div className={styles.allObjects__inMap}>
					<p className={styles.description}>Всего объектов на карте:</p>
					<p className={styles.value}>
						{dataObjectsInMap.points.points
							? dataObjectsInMap.points.points.filter((object: IMarker) =>
									Array.isArray(object.crd),
								).length
							: '0'}
					</p>
				</div>
			</div>
			<div className={styles.block__objects} ref={containerRef}>
				{viewSettings.isLoading ? (
					<>
						<div className={styles.object}>
							<Loading height='calc(60/1440 * 100vw)' />
						</div>
						<div className={styles.object}>
							<Loading height='calc(60/1440 * 100vw)' />
						</div>
						<div className={styles.object}>
							<Loading height='calc(60/1440 * 100vw)' />
						</div>
						<div className={styles.object}>
							<Loading height='calc(60/1440 * 100vw)' />
						</div>
						<div className={styles.object}>
							<Loading height='calc(60/1440 * 100vw)' />
						</div>
					</>
				) : (
					objects.map((elem: IMarker, index: number) => {
						return (
							<div
								ref={objectRefs.current[index]}
								key={elem.id}
								className={styles.object}
								style={
									dataObjectInfo.id === elem.id
										? { backgroundColor: '#e0e0e0' }
										: {}
								}
								onClick={viewSettings.editingObjects.isActiveEditButton ? undefined : mapService.getInfoObject(elem, dispatch, isMobile)}
							>
								<p>{elem.values ? elem.values[0].value : elem.name}</p>
								<Button icon={mapIcon} newCenter={newCenter} elem={elem} />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};


