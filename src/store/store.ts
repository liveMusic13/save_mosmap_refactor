import { combineReducers, configureStore, } from '@reduxjs/toolkit';

import { reducer as adresFilterString } from './adres-filter-string/adresFilterString.slice';
import { reducer as dataFilters } from './data-filters/dataFilters.slice';
import { reducer as dataMapSettings } from './data-map-settings/dataMapSettings.slice';
import { reducer as dataObjectInfo } from './data-object-info/dataObjectInfo.slice';
import { reducer as dataObjectsInMap } from './data-objects-in-map/dataObjectsInMap.slice';
import { reducer as dataSettings } from './data-settings/dataSettings.slice';
import { reducer as importExportData } from './import-export-data/ImportExportData.slice';
import { reducer as mapLayers } from './map-layers/mapLayers.slice';
import { reducer as popupEdit } from './popup-edit/popupEdit.slice';
import { reducer as userMap } from './user-map/userMap.slice';
import { reducer as viewSettings } from './view-settings/viewSettings.slice';

const reducers = combineReducers({
	viewSettings: viewSettings,
	dataObjectsInMap: dataObjectsInMap,
	dataObjectInfo: dataObjectInfo,
	userMap: userMap,
	dataFilters: dataFilters,
	adresFilterString: adresFilterString,
	mapLayers: mapLayers,
	dataSettings: dataSettings,
	popupEdit: popupEdit,
	dataMapSettings: dataMapSettings,
	importExportData,
});

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
