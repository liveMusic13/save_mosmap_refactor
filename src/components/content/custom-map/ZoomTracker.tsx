import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';

import { IZoomTracker } from '@/types/props.types';

const ZoomTracker: FC<IZoomTracker> = ({ setZoomLevel }) => {
	const map = useMapEvents({
		zoomend: () => {
			setZoomLevel(map.getZoom());
		},
	});

	return null;
};

export default ZoomTracker;
