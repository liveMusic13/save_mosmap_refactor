import useWindowDimensions from '@/hooks/useWindowDimensions';
import { mapService } from '@/services/map.service';
import { actions as dotInfoAction } from '@/store/dot-info/dotInfo.slice';
import { RootState } from '@/store/store';
import { FC, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

const MapClickHandler: FC = () => { 
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const viewSettings = useSelector((state: RootState) => state.viewSettings);

  useEffect(() => {
		if (width) {
			if (width <= 767.98) {
				setIsMobile(true);
			}
		}
	}, [width]);

  useMapEvents({ click: async (e) => { 
    if (!viewSettings.editingObjects.isActiveAddButton && !viewSettings.editingObjects.isActiveEditButton) { 
      console.log(`Clicked at: ${e.latlng.lat}, ${e.latlng.lng}`); 
      await mapService.dotInfo({lat: e.latlng.lat, lng: e.latlng.lng}, dispatch, isMobile)
      dispatch(dotInfoAction.addCoords({lat:e.latlng.lat, lng: e.latlng.lng}))}
    }, 
  }); 
  return null;
}

export default MapClickHandler

