import { useDispatch } from 'react-redux';

import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice';

export const useSearchObjectInMap = () => {
	const dispatch = useDispatch();

	const newCenter = (arr: number[]) => {
		dispatch(dataObjectsInMapAction.addNewCenter(arr));
	};

	return { newCenter };
};
