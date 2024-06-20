import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice';
import { RootState } from '@/store/store';
import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

const LocationMarker: FC = () => {
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dispatch = useDispatch()

	const map = useMapEvents({
    click(e) {
        dispatch(dataObjectInfoAction.addCrd([e.latlng.lat, e.latlng.lng]))
        dispatch(dataObjectsInMapAction.updateCrdObjectById({id: dataObjectInfo.id, crd: [e.latlng.lat, e.latlng.lng]}))
    },
});

  return null
}

export default LocationMarker