import { createSlice } from '@reduxjs/toolkit';

import { IViewSettings } from '@/types/slice.types';

const initialState: IViewSettings = {
	isImportSettingsData: false,
	isViewFilters: true,
	isViewObjects: true,
	isSettingsMap: false,
	isSettingsApp: false,
	isSettingsData: false,
	isObjectInfo: false,
	isLoading: false,
	isLoadingObject: false,
	isDisplay: true,
	isSelectArea: false,
	isViewPopupSettings: false,
	isViewDeletePopup: false,
	isPopupSettingGroups: false,
	isBurger: false,
	isViewImport: false,
	isViewExport: false,
	isViewPopupImportDone: false,
	editingObjects: {
		isAddObject: true,
		isEditObjects: false,
		isDeleteObject: false,
		isDeleteMarker: false,
		isActiveAddButton: false,
		isActiveEditButton: false,
		isViewPopup: {
			isObject: false,
			isMarker: false,
		},
		isMobileEditCrd: false,
	}
};

export const viewSettings = createSlice({
	name: 'viewSettings',
	initialState,
	reducers: {
		activeIsViewPopupImportDone: (state, {payload}) => {
			state.isViewPopupImportDone = true;
		},
		defaultIsViewPopupImportDone: (state, {payload}) => {
			state.isViewPopupImportDone = false;
		},
		activeIsImportSettingsData: (state, {payload}) => {
			state.isImportSettingsData = true;
		},
		defaultIsImportSettingsData: (state, {payload}) => {
			state.isImportSettingsData = false;
		},
		activeIsViewImport: (state, {payload}) => {
			state.isViewImport = true;
		},
		defaultIsViewImport: (state, {payload}) => {
			state.isViewImport = false;
		},
		activeIsViewExport: (state, {payload}) => {
			state.isViewExport = true;
		},
		defaultIsViewExport: (state, {payload}) => {
			state.isViewExport = false;
		},
		activeIsPopupSettingGroups: (state, {payload}) => {
			state.isPopupSettingGroups = true;
		},
		defaultIsPopupSettingGroups: (state, {payload}) => {
			state.isPopupSettingGroups = false;
		},
		toggleBurger: (state, {payload}) => {
			state.isBurger = !state.isBurger
		},
		activeIsViewDeletePopup: (state, {payload}) => {
			state.isViewDeletePopup = true;
		},
		defaultIsViewDeletePopup: (state, {payload}) => {
			state.isViewDeletePopup = false;
		},
		activeIsViewPopupSettings: (state, {payload}) => {
			state.isViewPopupSettings = true;
		},
		defaultIsViewPopupSettings: (state, {payload}) => {
			state.isViewPopupSettings = false;
		},
		activeIsViewPopupMarker: (state, { payload }) => {
			return { 
					...state,  
					editingObjects: {
							...state.editingObjects,
							isViewPopup: {
									...state.editingObjects.isViewPopup,
									isMarker: true
							}
					}
			};
		},
		activeIsViewPopupObject: (state, { payload }) => {
			return { 
					...state,  
					editingObjects: {
							...state.editingObjects,
							isViewPopup: {
									...state.editingObjects.isViewPopup,
									isObject: true
							}
					}
			};
		},
		defaultIsViewPopupMarker: (state, { payload }) => {
			return { 
					...state,  
					editingObjects: {
							...state.editingObjects,
							isViewPopup: {
									...state.editingObjects.isViewPopup,
									isMarker: false
							}
					}
			};
		},
		defaultIsViewPopupObject: (state, { payload }) => {
			return { 
					...state,  
					editingObjects: {
							...state.editingObjects,
							isViewPopup: {
									...state.editingObjects.isViewPopup,
									isObject: false
							}
					}
			};
		},
		toggleIsMobileEditCrd: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isMobileEditCrd: !state.editingObjects.isMobileEditCrd }};
		},
		toggleIsActiveEditButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveEditButton: !state.editingObjects.isActiveEditButton }};
		},
		isActiveEditButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveEditButton: true }};
		},
		defaultIsActiveEditButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveEditButton: false }};
		},
		toggleIsActiveAddButton: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isActiveAddButton: !state.editingObjects.isActiveAddButton }};
		},
		activeDeleteMarker: (state, { payload }) => {
			return { ...state,  editingObjects: {...state.editingObjects, isDeleteMarker: true }};
		},
		defaultDeleteMarker: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteMarker: false }};
		},
		activeDeleteObject: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteObject: true }};
		},
		defaultDeleteObject: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isDeleteObject: false }};
		},
		activeEditObjects: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isEditObjects: true }};
		},
		defaultEditObjects: (state, { payload }) => {
			return { ...state, editingObjects: {...state.editingObjects, isEditObjects: false }};
		},
		toggleFilters: (state, { payload }) => {
			return { ...state, isViewFilters: !state.isViewFilters };
		},
		toggleObjects: (state, { payload }) => {
			return { ...state, isViewObjects: !state.isViewObjects };
		},
		toggleObjectInfo: (state, { payload }) => {
			return { ...state, isObjectInfo: true };
		},
		toggleSettingsMap: (state, { payload }) => {
			return { ...state, isSettingsMap: !state.isSettingsMap };
		},
		defaultSettingsMap: (state, { payload }) => {
			return { ...state, isSettingsMap: false };
		},
		activeSettingsMap: (state, { payload }) => {
			return { ...state, isSettingsMap: true };
		},
		defaultSettingsApp: (state, { payload }) => {
			return { ...state, isSettingsApp: false };
		},
		activeSettingsApp: (state, { payload }) => {
			return { ...state, isSettingsApp: true };
		},
		defaultSettingsData: (state, { payload }) => {
			return { ...state, isSettingsData: false };
		},
		activeSettingsData: (state, { payload }) => {
			return { ...state, isSettingsData: true };
		},
		activeLoading: (state, { payload }) => {
			return { ...state, isLoading: true };
		},
		activeLoadingObject: (state, { payload }) => {
			return { ...state, isLoadingObject: true };
		},
		activeDisplay: (state, { payload }) => {
			return { ...state, isDisplay: true };
		},
		defaultDisplay: (state, { payload }) => {
			return { ...state, isDisplay: false };
		},
		defaultLoadingObject: (state, { payload }) => {
			return { ...state, isLoadingObject: false };
		},
		defaultLoading: (state, { payload }) => {
			return { ...state, isLoading: false };
		},
		defaultFilters: (state, { payload }) => {
			return { ...state, isViewFilters: false };
		},
		defaultObjects: (state, { payload }) => {
			return { ...state, isViewObjects: false };
		},
		defaultObjectInfo: (state, { payload }) => {
			return { ...state, isObjectInfo: false };
		},
		toogleIsSelectArea: (state, {payload}) => {
			return {...state, isSelectArea: !state.isSelectArea}
		}
	},
});

export const { actions, reducer } = viewSettings;
