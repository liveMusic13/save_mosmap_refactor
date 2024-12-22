import { IItemsFilter } from '@/types/slice.types';

export const transformFieldForSelect = (array: IItemsFilter[]) => {
	return array.map(obj => ({
		value: obj.item_id,
		label: obj.item_name,
	}));
};

export const transformFieldForSelectInterval = (array:any) => {
	return array.map((obj:any) => ({
		value: obj.id,
		label: obj.name,
	}));
};
