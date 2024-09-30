import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
	option:{},
	response_import: {}
};

export const importExportData = createSlice({
	name: 'importExportData',
	initialState,
	reducers: {
		addImportOptions: (state, { payload }) => {
			state.option = payload;
		},
		addResponse: (state, { payload }) => {
			state.response_import = payload;
		},
	},
});

export const { actions, reducer } = importExportData;