import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { IFlyToLocation } from '@/types/props.types';

import useWindowDimensions from '@/hooks/useWindowDimensions';

const FlyToLocation: FC<IFlyToLocation> = ({
	centerMapObject,
	isInitialized,
	setIsInitialized,
}) => {
	const { width } = useWindowDimensions();

	const map = useMap();

	useEffect(() => {
		const mobileOrPk =
			width && width <= 767.98
				? centerMapObject[1]
				: centerMapObject[1] - 0.0035; //HELP: ЧТОБЫ НА МОБИЛЬНОЙ ВЕРСИИ ЦЕНТР НЕ СМЕЩАЛСЯ
		if (centerMapObject) {
			if (isInitialized) {
				//HELP: Смещение объекта на 0.0035 градуса вправо
				map.panTo([centerMapObject[0], mobileOrPk]); //HELP: СДЕЛАЛ ЧЕРЕЗ panTo ЧТОБЫ НЕ БЫЛО КОНФЛИКТОВ С panTo ИЗ CanvasMarkersLayer. ПОТОМУ ЧТО ЕСЛИ СДЕЛАТЬ ЧЕРЕЗ flyTo ТО ОНО БУДЕТ ОСТАНАВЛИВАТЬСЯ КОГДА В CanvasMarkersLayer НАЧИНАЕТ ОТРАБАТЫВАТЬ panTo.
				const timeoutId = setTimeout(() => {
					//HELP: ДЕЛАЕМ ЧЕРЕЗ ТАЙМАУТ ЧТОБЫ УСПЕВАЛО ПОДВИНУТЬ КАРТУ К КООРДИНАТАМ, А ПОТОМ УЖЕ ПРИБЛИЖАЛО
					map.setZoom(17);
				}, 800);

				return () => clearTimeout(timeoutId);
			} else {
				// Смещение объекта на 0.0055 градуса вправо
				map.panTo([centerMapObject[0], centerMapObject[1] - 0.0055]);
				setIsInitialized(true);
			}
		}
	}, [centerMapObject]);

	return null;
};

export default FlyToLocation;
