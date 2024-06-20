import { createSlice } from '@reduxjs/toolkit';

import { IDataFilters } from '@/types/slice.types';

const initialState: IDataFilters | any = [];

export const dataFilters = createSlice({
	name: 'dataFilters',
	initialState,
	reducers: {
		addFilters: (state, { payload }) => {
			return payload;
		},
	},
});

export const { actions, reducer } = dataFilters;
