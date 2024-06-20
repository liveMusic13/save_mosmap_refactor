import { IItemsFilter } from '@/types/slice.types';

export const transformFieldForSelect = (array: IItemsFilter[]) => {
	return array.map(obj => ({
		value: obj.item_id,
		label: obj.item_name,
	}));
};
