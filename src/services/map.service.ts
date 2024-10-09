import { $axios } from "@/api";
import { actions as dataFiltersAction } from "@/store/data-filters/dataFilters.slice";
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice";
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice";
import { actions as viewSettingsAction } from "@/store/view-settings/viewSettings.slice";
import { IDataObjectInfo, IMarker } from "@/types/slice.types";
import axios from "axios";



// const cache = new Map();

// const fetchWithCache = async (dispatch, adresFilterString, map) => {
//   const cacheKey = adresFilterString.srcRequest === '' ? `map-${map}` : `request-${adresFilterString.srcRequest}`;
//   const cacheData = cache.get(cacheKey);

//   console.log(`Checking cache for key: ${cacheKey}`);
//   if (cacheData) {
//     console.log(`Cache data found for key: ${cacheKey}, checking timestamp...`);
//     if (Date.now() - cacheData.timestamp < 7000) {
//       console.log(`Returning data from cache for key: ${cacheKey}`);
//       dispatch(dataObjectsInMapAction.addDataObjectsInMap(cacheData.data));
//       return cacheData.data; // возвращаем данные из кэша
//     } else {
//       console.log(`Cache expired for key: ${cacheKey}, making new request...`);
//     }
//   } else {
//     console.log(`No cache data found for key: ${cacheKey}, making new request...`);
//   }

//   try {
//     dispatch(viewSettingsAction.activeLoading(''));
//     let response;
//     if (adresFilterString.srcRequest === '') {
//       response = await $axios.get(`/api/get_objects.php?map=${map}`);
//     } else {
//       response = await $axios.get(`/api/get_objects.php${adresFilterString.srcRequest}`);
//       console.log('map', adresFilterString.srcRequest);
//     }
//     dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));

//     // Сохраняем данные в кэш с текущим временем
//     cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
//     console.log(`Cache updated for key: ${cacheKey}`);
//     return response.data; // возвращаем свежие данные
//   } catch (error) {
//     console.log(error);
//   } finally {
//     dispatch(viewSettingsAction.defaultLoading(''));
//   }
// };

// const fetchDebounced = debounce(fetchWithCache, 4000, {
//   leading: true,
//   trailing: false
// });
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
				console.log('map', adresFilterString.srcRequest)
				dispatch(dataObjectsInMapAction.addDataObjectsInMap(response.data));
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(viewSettingsAction.defaultLoading(''));
		}
	},

	// getObjectFunc: (dispatch:any, adresFilterString:any, map:any) => {
  //   return fetchDebounced(dispatch, adresFilterString, map);
  // },


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
			const responce = await axios.get(
				`https://app.mosmap.ru/api/filters.php?map=${map}`,
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
	}
}