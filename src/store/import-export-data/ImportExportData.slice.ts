import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
	option:{}
};

export const importExportData = createSlice({
	name: 'importExportData',
	initialState,
	reducers: {
		addImportOptions: (state, { payload }) => {
			state.option = payload;
		},
	},
});

export const { actions, reducer } = importExportData;