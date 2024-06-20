import { createSlice } from '@reduxjs/toolkit';

import { IAdresFilterString } from '@/types/slice.types';

const initialState: IAdresFilterString = {
	srcRequest: '',
};

export const adresFilterString = createSlice({
	name: 'adresFilterString',
	initialState,
	reducers: {
		addGetParams: (state, { payload }) => {
			state.srcRequest = payload;
		},
		clearGetParams: (state, { payload }) => {
			state.srcRequest = '';
		},
	},
});

export const { actions, reducer } = adresFilterString;
