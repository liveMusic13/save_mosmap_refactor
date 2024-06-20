import L, { Canvas } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { ICanvasMarkersLayer } from '@/types/props.types';
import { IDataObjectInfo } from '@/types/slice.types';

import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';

import { mapService } from '@/services/map.service';
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice';
import { ARGBtoHEX } from '@/utils/convertColor';
import { getIconForMarker } from '@/utils/iconForMarker';

const CanvasMarkersLayer: FC<ICanvasMarkersLayer> = ({
	markersData,
	isMobile,
}) => {
	const dataObjectInfo: IDataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const {editingObjects} = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const map = useMap();
	const dispatch = useDispatch();
	const markersRef = useRef([]);
	const polygonsRef = useRef<L.Polygon<any>[]>([]);
	const iconsRef = useRef<L.Marker<any>[]>([]);
	const bounds = map.getBounds(); //HELP: ФУНКЦИЯ ПОЛУЧЕНИЯ КООРДИНАТ В ОБЛАСТИ ВИДИМОСТИ
	const canvasLayerRef = useRef<Canvas | null>(null);
	const targetMarker = useRef<L.Marker<any> | null>(null);

	useEffect(() => {
		if (canvasLayerRef.current) {
			//HELP: УДАЛЕНИЕ ПРЕДЫДУЩЕГО СЛОЯ КАНВАСА, ЧТОБЫ НЕ ЗАБИВАТЬ DOM ДЕРЕВО СЛОЯМИ ПРИ ЗУМАХ
			map.removeLayer(canvasLayerRef.current);
		}

		markersRef.current.forEach(marker => map.removeLayer(marker)); //HELP: ОЧИСТКА МАССИВОВ В МАРКЕРАМИ ПОЛИГОНОВ КРУЖКОВ И ИКОНОК
		markersRef.current = [];
		polygonsRef.current.forEach(polygon => map.removeLayer(polygon));
		polygonsRef.current = [];
		iconsRef.current.forEach(icon => map.removeLayer(icon));
		iconsRef.current = [];

		canvasLayerRef.current = L.canvas({ padding: 0.5 }); //HELP: СОЗДАНИЕ СЛОЯ И ДОБАВЛЕНИЕ НА КАРТУ
		canvasLayerRef.current.addTo(map);

		const zoomLevels = map.getZoom(); //HELP: ПОЛУЧЕНИЕ УРОВНЯ ЗУМА

		if (zoomLevels >= 13) {
			//HELP: ТОЧЕЧНАЯ ОЧИСТКА ПРИ РАЗНЫХ ЗУМАХ. НЕСМОТРЯ НА ОЧИСТКУ ВЫШЕ, ОНА НУЖНА И ЗДЕСЬ
			markersRef.current.forEach(marker => map.removeLayer(marker));
			markersRef.current = [];
		} else if (zoomLevels >= 13 && zoomLevels < 16) {
			iconsRef.current.forEach(icon => map.removeLayer(icon));
			iconsRef.current = [];
		} else {
			polygonsRef.current.forEach(polygon => map.removeLayer(polygon));
			polygonsRef.current = [];
		}

			for (let marker of markersData) {
				let mapObject;
	
				if (zoomLevels >= 16 && marker.polygon && marker.polygon.length > 0) {
					mapObject = new L.Polygon(marker.polygon, {
						color:
							dataObjectInfo.id === marker.id
								? 'black'
								: ARGBtoHEX(marker.color ? marker.color : '000'),
						weight: dataObjectInfo.id === marker.id ? 6 : 3,
					}).addTo(map);
	
					if (!editingObjects.isActiveEditButton) {
						mapObject.on('click', mapService.getInfoObject(marker, dispatch, isMobile));
						mapObject.bindPopup(marker.name ? marker.name.toString() : 'No Name');
					}
					polygonsRef.current.push(mapObject);
				}
			}
	
			for (let marker of markersData) {
				//HELP: ОТРИСОВКА КРУЖКОВ
				let mapObject;
				const zoomLevelsForCircle = map.getZoom(); //HELP: ОТДЕЛЬНО ПОЛУЧАЕМ УРОВЕНЬ ЗУМА, ПОТОМУ ЧТО НЕКОРРЕКТНО ОТОБРАЖАЕТ ЕСЛИ ИСПОЛЬЗОВАТЬ ОБЩИЙ ЗУМ, ОБЪЯВЛЕННЫЙ ВЫШЕ
	
				if (zoomLevelsForCircle <= 13) {
					mapObject = new L.CircleMarker(marker.crd ? marker.crd : [0, 0], {
						renderer: canvasLayerRef.current,
						radius: 5,
						color:
							dataObjectInfo.id === marker.id
								? 'black'
								: ARGBtoHEX(marker.color ? marker.color : '000'),
					}).addTo(map);

					if (!editingObjects.isActiveEditButton) {
						mapObject.on('click', mapService.getInfoObject(marker, dispatch, isMobile));
						mapObject.bindPopup(marker.name ? marker.name.toString() : 'No Name');
					}
				}
	
				if (dataObjectInfo.id === marker.id && zoomLevelsForCircle < 16) {
					const targetIcon = L.icon({
						iconUrl: '../images/icons/target.svg',
						iconSize: [60, 58],
						iconAnchor: [22, 21],
					});
	
					let targetMapObject = L.marker(marker.crd ? marker.crd : [0, 0], {
						icon: targetIcon,
						draggable: editingObjects.isActiveEditButton || editingObjects.isMobileEditCrd, // Добавьте эту строку, чтобы сделать маркер перетаскиваемым
					}).addTo(map);
					targetMapObject.options.title = marker.id ? String(marker.id) : ''
					iconsRef.current.push(targetMapObject);
	
					if (targetMarker.current) {
						map.removeLayer(targetMarker.current);
						targetMarker.current = null;
					} else {
						targetMarker.current = targetMapObject;
					}
					targetMapObject.on('dragend', function (event:any) {
						const timeoutId = setTimeout(()=> {
							const marker = event.target;
							const position = marker.getLatLng();
							console.log(marker);
							
							if (marker != null) {
								console.log(marker.getLatLng());
								dispatch(dataObjectInfoAction.addCrd([marker.getLatLng().lat, marker.getLatLng().lng]))
								dispatch(dataObjectsInMapAction.updateCrdObjectById({id: marker.options.title, crd: [marker.getLatLng().lat, marker.getLatLng().lng]}))
							}
						}, 700)
		
						return () => clearTimeout(timeoutId)
					});
				}
			}
		
		function handleMoveEndZoomEnd() {
			let bounds = map.getBounds();
			const zoomLevelForIcon = map.getZoom();

			for (let marker of markersData) {
				if (
					(zoomLevelForIcon > 13 &&
						zoomLevelForIcon < 16 &&
						bounds.contains(marker.crd ? marker.crd : [0, 0])) ||
					(zoomLevelForIcon > 15 && //HELP: СТАВЛЮ 15 ХОТЯ СРАБАТЫВАЕТ НА 16. СКОРЕЕ ВСЕГО ПОТОМУ ЧТО НЕПРАВИЛЬНО ОТРАБАТЫВАЕТ УРОВЕНЬ ЗУМА, ПОЭТОМУ ДЛЯ ПРАВИЛЬНОЙ РАБОТЫ МЕНЯЮ НА 15.
						(!marker.polygon || marker.polygon.length === 0) &&
						bounds.contains(marker.crd ? marker.crd : [0, 0]))
				) {
					let svg = getIconForMarker(marker); //HELP: ПОЛУЧАЕМ МАРКЕР
					let encodedSvg = encodeURIComponent(svg); //HELP: КОНВЕРТИРУЕМ В ССЫЛКУ
					let dataUrl = 'data:image/svg+xml,' + encodedSvg; //HELP: ДОБАВЛЯЕМ К НЕМУ DATA И ТЕПЕРЬ ЭТО ССЫЛКА НА КАРТИНКУ

					const icon = L.icon({
						//HELP: СОЗДАЕМ ИКОНКУ
						iconUrl: dataUrl,
						iconSize: [20, 18],
						iconAnchor: [10, 9],
					});

					let mapObject = L.marker(marker.crd ? marker.crd : [0, 0], {
						icon: icon,
						zIndexOffset: 3,
						// draggable: isActiveEditButton, // Добавьте эту строку, чтобы сделать маркер перетаскиваемым
					}).addTo(map);
					// mapObject.options.title = marker.id ? String(marker.id) : ''
					iconsRef.current.push(mapObject);

					if (dataObjectInfo.id === marker.id) {
						const targetIcon = L.icon({
							iconUrl: '../images/icons/target.svg',
							iconSize: [60, 58],
							iconAnchor: [22, 21],
						});

						let targetMapObject = L.marker(marker.crd ? marker.crd : [0, 0], {
							icon: targetIcon,
							draggable: editingObjects.isActiveEditButton || editingObjects.isMobileEditCrd, // Добавьте эту строку, чтобы сделать маркер перетаскиваемым
							zIndexOffset: 1
						}).addTo(map);
						targetMapObject.options.title = marker.id ? String(marker.id) : ''
						iconsRef.current.push(targetMapObject);

						if (targetMarker.current) {
							map.removeLayer(targetMarker.current);
							targetMarker.current = null;
						} else {
							targetMarker.current = targetMapObject;
						}
						targetMapObject.on('dragend', function (event) {
							const timeoutId = setTimeout(()=> {
								const marker = event.target;
								const position = marker.getLatLng();
								console.log(position);
			
								if (marker != null) {
									console.log(marker.getLatLng());
									dispatch(dataObjectInfoAction.addCrd([marker.getLatLng().lat, marker.getLatLng().lng]))
									dispatch(dataObjectsInMapAction.updateCrdObjectById({id: marker.options.title, crd: [marker.getLatLng().lat, marker.getLatLng().lng]}))
								}
							}, 700)
			
							return () => clearTimeout(timeoutId)
						});
					}
				
					if (!editingObjects.isActiveEditButton) {
						mapObject.on('click', mapService.getInfoObject(marker, dispatch, isMobile));
						mapObject.bindPopup(marker.name ? marker.name.toString() : 'No Name');
					}
				}
			}

			setTimeout(() => {
				if (map !== undefined) map.invalidateSize();
			}, 2000);
		}

		map.on('moveend zoomend', handleMoveEndZoomEnd);

		function updateMarkers() {
			//HELP: функция смещает координаты с центра, чтобы имитировать движение по карте. Это решает проблему, в которой при подгрузке данных или зуме, не отображался новый холст пока не передвинешь карту мышкой
			if (map !== undefined) {

				const timeoutId = setTimeout(() => {
					//HELP: ТАЙМАУТ УБИРАЕТ БАГ "ПЕРВОГО КЛИКА" ПО НЕКОТОРЫМ ОБЪЕКТАМ
					var center = map.getCenter();
					map.panTo(center);
				}, 500);
				return () => clearTimeout(timeoutId);
			}
		}
		
		updateMarkers();

		return () => {
			//HELP: Удаление обработчика событий при очистке эффекта
			map.off('moveend zoomend', handleMoveEndZoomEnd);
		};
	}, [map, markersData, bounds, dataObjectInfo]);
	return null;
};

export default CanvasMarkersLayer;
