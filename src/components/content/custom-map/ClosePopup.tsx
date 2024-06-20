import { RootState } from '@/store/store';
import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';

const ClosePopup: FC = () => {
  const map = useMap();
  const {isMobileEditCrd} = useSelector(
		(state: RootState) => state.viewSettings.editingObjects,
	);

  useEffect(()=> {
		if (isMobileEditCrd) map.closePopup()
	}, [isMobileEditCrd])

  return null
}

export default ClosePopup