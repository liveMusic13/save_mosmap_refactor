import { $axiosAuth } from "@/api";
import { actions as dataSettingsAction } from "@/store/data-settings/dataSettings.slice";
import { IFields, ILists, IMaps } from "@/types/slice.types";

export const settingsService = {
  maps: async (map:string, dispatch:any) => {
    try {
      const response = await $axiosAuth.get(`/api/maps.php?map=${map}`)
      dispatch(dataSettingsAction.addMaps(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  editMaps: async (map:string, dispatch:any, data: IMaps) => {
    try {
      const response = await $axiosAuth.post(`/api/maps.php?map=${map}`, data)
      dispatch(dataSettingsAction.addMaps(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  lists: async (map:string, dispatch:any) => {
    try {
      const response = await $axiosAuth.get(`/api/lists.php?map=${map}`)
      dispatch(dataSettingsAction.addLists(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  editLists: async (map:string, dispatch:any, data:ILists | any) => {
    try {
      const response = await $axiosAuth.post(`/api/lists.php?map=${map}`, data)
      dispatch(dataSettingsAction.addLists(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  fields: async (map:string, dispatch:any) => {
    try {
      const response = await $axiosAuth.get(`/api/fields.php?map=${map}`)
      dispatch(dataSettingsAction.addFields(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  editFields: async (map:string, dispatch:any, data:IFields | any) => {
    try {
      const response = await $axiosAuth.post(`/api/fields.php?map=${map}`, data)
      dispatch(dataSettingsAction.addFields(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  getIcons: async (map:string, dispatch:any) => {
    try {
      const response = await $axiosAuth.get(`/api/get_icons.php?map=${map}`)
      dispatch(dataSettingsAction.addGetIcons(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  deleteField: async (id:number) => {
    try {
      const {data} = await $axiosAuth.get(`/api/delete_field.php?id=${id}`)
      return data
    } catch (error) {
      console.log(error);
    }
  },
  getSettings: async(map:string, dispatch:any) => {
    try {
      // const response = await $axiosAuth.get(`/api/settings.php?map=${map}`)
      // const response = await $axiosAuth.get(`/settings.php?map=${map}`)
      const data = {
        title:'Тестовая карта',
        descr: 'Над этим набором данных можно издеваться как угодно, он специально для этого предназначен.',
        iconsize: '28',
        autosize: '0',
        showhouses: '0',
        showanalytic: '0',
        radius: '0',
        showcuts: 'on',
        tiles_id: '0',
        tiles_list: [
          {
            name: 'MoscowMap',
            id: '0'
          },
          {
            name: "Yandex map",
            id: '1'
          },
        ],
        map_id: map
      }
      const response1 = await $axiosAuth.post(`/api/save_settings.php`, data)
      // const response1 = await $axiosAuth.get(`/api/save_settings.php`)
      console.log(response1)
      // dispatch(dataSettingsAction.addGetIcons(response.data))
    } catch (error) {
      console.log(error);
    }
  }
}