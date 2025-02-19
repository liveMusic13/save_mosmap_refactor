import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Polygon, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import IconMarker from '@/components/ui/icon-marker/IconMarker';

import { IRenderMarkers } from '@/types/props.types';
import { IDataObjectInfo, IDataObjectsInMap } from '@/types/slice.types';

import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import { ARGBtoHEX } from '@/utils/convertColor';

import { $axios } from '@/api';
import { iconSizeDynamic } from '@/utils/iconSizeFunc';

const RenderMarkers: FC<IRenderMarkers> = ({ isMobile, zoomLevel }) => {
	const dispatch = useDispatch();
	const dataObjectsInMap: IDataObjectsInMap = useSelector(
		(state: RootState) => state.dataObjectsInMap,
	);
	const dataObjectInfo: IDataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const {editingObjects} = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const dotInfo = useSelector(
		(state: RootState) => state.dotInfo,
	);
	const {color_map} = useSelector(
		(state: RootState) => state.dataInterval,
	);

	const {data} = useSelector(
		(state: RootState) => state.dataMapSettings,
	);

	// useEffect(() => {}, [dataObjectInfo.id, dotInfo, editingObjects]);
	useEffect(() => {}, [dataObjectInfo.id, color_map]);

	const eventHandlers = useMemo(
			() => ({
				dragend(event:any) {
					const timeoutId = setTimeout(()=> {

						const marker = event.target;
						if (marker != null) {
							console.log(marker.getLatLng());
							dispatch(dataObjectInfoAction.addCrd([marker.getLatLng().lat, marker.getLatLng().lng]))
						}
					}, 700)

					return () => clearTimeout(timeoutId)
				},
			}),
			[],
		);

	return (
		<>
		{
			dataObjectInfo && dataObjectInfo.area && dataObjectInfo.area.length > 0 && <Polygon positions={dataObjectInfo.area} color='red' fillOpacity={0.4} />
		}
		{
			color_map.length > 0 && color_map.map((el:any, ind) => <Polygon key={ind} positions={el.polygon} color={el.color} fillOpacity={0.4}/>)
		}
		{/* {
			!editingObjects.isActiveAddButton && !editingObjects.isActiveEditButton && dotInfo.lat !== 0 && dotInfo.lng !== 0 && !dataObjectInfo.id && <Marker position={[dotInfo.lat, dotInfo.lng]} icon={L.icon({
				iconUrl: '/images/icons/marker.png',
				iconSize: iconSizeDynamic(data.iconsize, true),
				iconAnchor: [18.5, 19], 
			})}></Marker>
		} */}
			{dataObjectsInMap?.points?.points?.map((object: IDataObjectInfo) => {
				if (object && object.crd) {
					const getObjectInfo = async () => {
						if (isMobile) dispatch(viewSettingsAction.activeSettingsMap(''));
						dispatch(viewSettingsAction.toggleObjectInfo(''));

						try {
							dispatch(viewSettingsAction.activeLoadingObject(''));

							const responce = await $axios.get(
								`/api/object_info.php?id=${object.id}`,
							);
						console.log('test', responce.data)
							dispatch(dataObjectInfoAction.addObjectInfo(responce.data));
							dispatch(viewSettingsAction.SetIsDotInfo(false));
						} catch (error) {
							console.log(error);
						} finally {
							dispatch(viewSettingsAction.defaultLoadingObject(''));
						}
					};

					let customMarkerIcon;

					if (zoomLevel >= 16 && object.polygon && object.polygon.length > 0) {
						//HELP: Если уровень зума 16 или больше и у объекта есть полигон, отображаем полигон
						console.log('polygon')
						return (
							<Polygon
								key={`${object.id}-${dataObjectInfo.id === object.id}`}
								positions={object.polygon}
								color={
									dataObjectInfo.id === object.id
										? 'black'
										: ARGBtoHEX(object.color ? object.color : '000')
								}
								// eventHandlers={{ click: !editingObjects.isActiveEditButton ? ()=> mapService.getInfoObject(object, dispatch, isMobile) : undefined, }}
								eventHandlers={{ click: !editingObjects.isActiveEditButton ? getObjectInfo : undefined, }}
								weight={dataObjectInfo.id === object.id ? 6 : 3}
							>
								{/* {editingObjects.isActiveEditButton ? null : <Popup>{object.name}</Popup>} */}
								<Popup>{object.values ? object.values?.filter(el => el.label === 'Наименование')[0].value : object.name}</Popup>
							</Polygon>
						);
					} else {
						//HELP: Иначе отображаем маркер
						// console.log('marker')
						if (dataObjectInfo.id === object.id) {
							customMarkerIcon = L.icon({
								iconUrl: '../images/icons/target.svg',
								iconSize: [53, 53],
								// iconSize: iconSizeDynamic(data.iconsize, true),
								iconAnchor: [18.5, 19], //2.86, 2.78
							});
						} else {
							// console.log(data.iconsize, dataObjectsInMap.points.icon_sizes, iconSizeDynamic(data.iconsize, dataObjectsInMap.points.icon_sizes, false))
							customMarkerIcon = divIcon({
								className: 'my-custom-icon',
								// iconSize: [23, 23],
								iconSize: iconSizeDynamic(data.iconsize, false),
								html: renderToStaticMarkup(
									<IconMarker key={object.id} object={object} size={iconSizeDynamic(data.iconsize, false)} />,
								),
							});
						}
					}

					return (
						<Marker
							key={object.id}
							position={object.crd}
							icon={customMarkerIcon}
							draggable={(editingObjects.isActiveEditButton && dataObjectInfo.id === object.id) || (editingObjects.isMobileEditCrd && dataObjectInfo.id === object.id)}
							eventHandlers={{ ...eventHandlers, click: !editingObjects.isActiveEditButton ? getObjectInfo : undefined }}
						>
							{/* {editingObjects.isActiveEditButton ? null : <Popup>{object.values ? object.values?.filter(el => el.label === 'Наименование')[0].value : object.name}</Popup>} */}
							<Popup>{object.values ? object.values?.filter(el => el.label === 'Наименование')[0].value : object.name}</Popup>
						</Marker>
					);
				}
			})}
		</>
	);
};

export default RenderMarkers;
