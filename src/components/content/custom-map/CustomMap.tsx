import { useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { IDataObjectInfo, IDataObjectsInMap } from '@/types/slice.types';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { RootState } from '@/store/store';
import L from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import CanvasMarkersLayer from './CanvasMarkersLayer';
import FlyToLocation from './FlyToLocation';
import RenderMarkers from './RenderMarkers';
import ZoomTracker from './ZoomTracker';

import { useInitRequest } from '@/hooks/useInitRequest';
import { actions as mapLayersAction } from '@/store/map-layers/mapLayers.slice';
import { iconSizeDynamic } from '@/utils/iconSizeFunc';
import 'leaflet-draw/dist/leaflet.draw.css';
import ClosePopup from './ClosePopup';
import LocationMarker from './LocationMarker';
import MapClickHandler from './MapClickHandler';

export function CustomMap() {
	const dataObjectsInMap: IDataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const viewSettings = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const { width } = useWindowDimensions();
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false); //HELP: ДЛЯ ОТСЛЕЖИВАНИЯ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ ПРИ ПЕРВОМ ЗАПУСКЕ ЗУМ НА 17 НЕ СТАВИЛСЯ
	const [center, setCenter] = useState<[number, number]>([55.7522, 37.6156]); // Значения по умолчанию
	
	useEffect(() => {
		if (width) {
			if (width <= 767.98) {
				setIsMobile(true);
			}
		}
	}, [width]);

	const [zoomLevel, setZoomLevel] = useState<number>(13);

	useEffect(() => {
		if (
			Array.isArray(dataObjectsInMap.centerMapObject) &&
			dataObjectsInMap.centerMapObject.length === 2
		) {
			setCenter(dataObjectsInMap.centerMapObject as [number, number]);
		}
	}, [dataObjectsInMap.centerMapObject]); //HELP: ПРОВЕРКА, ЧТОБЫ НЕ РУГАЛСЯ TYPESCRIPT

	const dispatch = useDispatch();
	const _onCreated = (e: any) => {
		console.log(e)
	
		const {layerType, layer} = e
		if (layerType === 'polygon') {
			const {_leaflet_id} = layer

			layer.on('click', () => dispatch(mapLayersAction.setTargetPolygonIndex(_leaflet_id)))

			dispatch(mapLayersAction.addPolygon({id: _leaflet_id, latLngs: layer.getLatLngs()[0]}));
		}
	}
	const _onDeleted = (e: any) => {
		console.log(e)
	
		const {layers:{_layers}} = e;
		Object.values(_layers).map(({_leaflet_id}:any) => {
			dispatch(mapLayersAction.deletePolygon(_leaflet_id));
		})
	}

const dataObjectInfo: IDataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const dotInfo = useSelector(
		(state: RootState) => state.dotInfo,
	);
	useEffect(() => {}, [dataObjectInfo.id, dotInfo, viewSettings.editingObjects]);


	const data = useSelector((state:RootState) => state.dataMapSettings)
	const { getObject } = useInitRequest();
	useEffect(()=> {
		getObject()
	}, [data])

	const maxBounds = (dataObjectsInMap.points.bounds && dataObjectsInMap.points.bounds !== "[[null, null], [null, null]]") 
  ? JSON.parse(dataObjectsInMap.points.bounds) 
  : undefined;
	
	// const iconSize = iconSizeDynamic(data.iconsize, true); // [width, height]

	// const iconAnchor = [
	// 	iconSize[0] * 0.5, // 50% от ширины
	// 	iconSize[1] * 2
	// ];

	return (
		<MapContainer
			center={center}
			zoom={13}
			minZoom={dataObjectsInMap.points.zoom_max}
			maxZoom={dataObjectsInMap.points.zoom_min}
			style={{ width: '100%', height: '100vh' }}
			// style={{ width: '100%', height: '98%' }}
			// maxBounds={[
			// 	[56.934709, 35.189603], //HELP: Северо-западные координаты
			// 	[54.294416, 40.128181], //HELP: Юго-восточные координаты
			// ]}
			maxBounds={maxBounds}
		>
			<TileLayer url={dataObjectsInMap.points.tiles_url ? dataObjectsInMap.points.tiles_url : 'https://www.moscowmap.ru/leaflet/tiles/{z}/{x}/{y}.png'} />
			<ZoomTracker setZoomLevel={setZoomLevel} />
			<MapClickHandler />
			{
				!viewSettings.editingObjects.isActiveAddButton && !viewSettings.editingObjects.isActiveEditButton && dotInfo.lat !== 0 && dotInfo.lng !== 0 && !dataObjectInfo.id && <Marker position={[dotInfo.lat, dotInfo.lng]} icon={L.icon({
					iconUrl: '/images/icons/marker.png',
					iconSize: iconSizeDynamic(data.iconsize, true),
					iconAnchor: [18.5, 34], 
					// iconAnchor: [18.5, 19], 
					// iconSize: iconSize,
					// iconAnchor: iconAnchor as PointTuple, 
				})}></Marker>
			}
			{dataObjectsInMap.points.canvas_map === 0 ? (
				dataObjectsInMap.points.clastering === 0 ? (
					<RenderMarkers isMobile={isMobile} zoomLevel={zoomLevel} /> 
				) : (
					<MarkerClusterGroup chunkedLoading={true}>
						<RenderMarkers isMobile={isMobile} zoomLevel={zoomLevel} />
					</MarkerClusterGroup>
				)
			) : (
				<CanvasMarkersLayer
					isMobile={isMobile}
					markersData={dataObjectsInMap.points.points ? dataObjectsInMap.points.points : []}
				/>
			)}
			<FlyToLocation
				centerMapObject={dataObjectsInMap.centerMapObject}
				isInitialized={isInitialized} //HELP: ДЛЯ ОТСЛЕЖИВАНИЯ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ ПРИ ПЕРВОМ ЗАПУСКЕ ЗУМ НА 17 НЕ СТАВИЛСЯ
				setIsInitialized={setIsInitialized}
			/>
			{(viewSettings.editingObjects.isActiveAddButton || viewSettings.editingObjects.isActiveEditButton) && <LocationMarker/>}
			{
				viewSettings.isSelectArea && <FeatureGroup>
				<EditControl position='topright' onCreated={_onCreated} onDeleted={_onDeleted} draw={{
					rectangle: false,
					polyline: false,
					circlemarker: false,
					marker: false,
					circle:false
				}}/>
			</FeatureGroup>
			}
			<ClosePopup/>
		</MapContainer>
	);
}
