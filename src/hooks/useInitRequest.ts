import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { mapService } from '@/services/map.service';

export const dynamic = true;

export const useInitRequest = () => {
	const adresFilterString = useSelector(
		(state: RootState) => state.adresFilterString,
	);
	
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const map = searchParams.get('map');

	const getObject = () => {
		if (typeof map === 'string') mapService.getObjectFunc(dispatch, adresFilterString, map)
	}

	const getFilters = ()=> {
		if (typeof map === 'string') mapService.getFiltersFunc(map, dispatch)
	}

	return { getObject, getFilters };
};
