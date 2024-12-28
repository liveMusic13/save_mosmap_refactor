import { $axios, $axiosAuth } from "@/api";
import { actions as dataFiltersAction } from "@/store/data-filters/dataFilters.slice";
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice";
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice";
import { actions as viewSettingsAction } from "@/store/view-settings/viewSettings.slice";
import { IDataSearchAddress } from "@/types/data.types";
import { IDataObjectInfo, IMarker } from "@/types/slice.types";
import { renameField } from "@/utils/renameField";
import axios from "axios";

export const mapService = {
  getObjectFunc: async (dispatch:any, adresFilterString:any, map:string) => {
		try {
			dispatch(viewSettingsAction.activeLoading(''));
			if (adresFilterString.srcRequest === '') {
				const response = await $axios.get(`/api/get_objects.php?map=${map}`);
				dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			} else {
				const response = await $axios.get(
					`/api/get_objects.php${adresFilterString.srcRequest}`,
				);
				// console.log('map', adresFilterString.srcRequest)
				dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	},
  getInfoObject: (marker: IMarker | IDataObjectInfo, dispatch: any, isMobile:boolean) => async () => {
		//HELP: ЗАПРОС НА ПОЛУЧЕНИЕ ИНФОРМАЦИИ ОБ ОБЪЕКТЕ
		if (isMobile) dispatch(viewSettingsAction.activeSettingsMap(''));
		if (isMobile) dispatch(viewSettingsAction.defaultObjects(''));
		// if (viewSettings.editingObjects.isActiveEditButton) dispatch(viewSettingsAction.defaultIsActiveEditButton('')) //HELP: ЧТОБЫ ПРИ ПЕРЕКЛЮЧЕНИИ ОБЪЕКТОВ ВО ВРЕМЯ РЕДАКТИРОВАНИЯ, ОКНО РЕДАКТИРОВАНИЯ ЗАКРЫВАЛОСЬ
		dispatch(viewSettingsAction.toggleObjectInfo(''));

		try {
			dispatch(viewSettingsAction.activeLoadingObject(''));

			const response = await $axios.get(`/api/object_info.php?id=${marker.id}`);
			
			dispatch(dataObjectInfoAction.addObjectInfo(response.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoadingObject(''));
		}
	},
	getObjectInfoForButton: async (id: number, width: number, dispatch:any) => {
		if (width && width <= 767.98)
			dispatch(viewSettingsAction.defaultObjects(''));
			dispatch(viewSettingsAction.toggleObjectInfo(''));
		try {
			dispatch(viewSettingsAction.activeLoadingObject(''));

			const responce = await $axios.get(`/api/object_info.php?id=${id}`);

			dispatch(dataObjectInfoAction.addObjectInfo(responce.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoadingObject(''));
		}
	},
  getFiltersObject: async (dispatch: any, width:any, adresFilterString:any, map:string) => {
		try {
			dispatch(viewSettingsAction.activeLoading(''));
			if (adresFilterString.srcRequest === '') {
				const response = await $axios.get(`/api/get_objects.php?map=${map}`);
				dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			} else {
				const response = await $axios.get(
					`/api/get_objects.php${adresFilterString.srcRequest}`,
				);
				dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			}
			if (width && width <= 767.98) {
				dispatch(viewSettingsAction.toggleSettingsMap(''));
				dispatch(viewSettingsAction.defaultFilters(''));
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	},
  getFiltersFunc: async (map:string, dispatch:any) => {
		try {
			// const responce = await axios.get(
			// 	`https://app.mosmap.ru/api/filters.php?map=${map}`,
			// );
			const responce = await $axios.get(
				`/api/filters.php?map=${map}`,
			);
			dispatch(dataFiltersAction.addFilters(responce.data));
		} catch (error) {
			console.log(error);
		}
	},
  clearRequestData: async (dispatch:any, query:any) => {
		try {
			dispatch(viewSettingsAction.activeLoading(''));
			const response = await $axios.get(`/api/get_objects.php?map=${query.map}`);
					dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	},
	getHelpSearchAddress: async (dispatch:any, query:any): Promise<IDataSearchAddress | any> => {
		try {
			// dispatch(viewSettingsAction.activeLoading(''));
			const encodedQuery = encodeURIComponent(query)
			const response = await axios.get(`https://mosmap.ru/api/adres_response.php?term=${encodedQuery}`);
			console.log('response', response.data)
			return response.data
		} catch (error) {
			console.log(error);
			return error
		} finally {
			// dispatch(viewSettingsAction.defaultLoading(''));
		}
	},
	dotInfo: async (coords: {lat:number, lng: number}, dispatch: any, isMobile:boolean) => {
		if (isMobile) dispatch(viewSettingsAction.activeSettingsMap(''));
		dispatch(viewSettingsAction.toggleObjectInfo(''));

		try {
			dispatch(viewSettingsAction.activeLoadingObject(''));

			const response = await $axios.get(`/api/dot_info.php?lat=${coords.lat}&lng=${coords.lng}`);
			console.log('response', response.data)

			dispatch(viewSettingsAction.SetIsDotInfo(true));
			dispatch(dataObjectInfoAction.addObjectInfo({values: renameField(response.data)}));
			return response.data
		} catch (error) {
			console.log(error);
			return error
		} finally {
			dispatch(viewSettingsAction.defaultLoadingObject(''));
		}
	},
	color_interval: async (query:any, dispatch:any) => {
		try {
			dispatch(viewSettingsAction.activeLoading(''));
			const response = await $axiosAuth.get(`/api/color_interval.php?map=${query.map}`);
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	},
	color_interval_save: async (query:any, dispatch:any, data:any) => {
		try {
			dispatch(viewSettingsAction.activeLoading(''));
			const response = await $axiosAuth.post(`/api/color_interval.php?map=${query.map}`, data);
			console.log(response.data)
			return response.data
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	}
}