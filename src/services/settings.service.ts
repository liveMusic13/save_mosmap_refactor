import { $axiosAuth } from "@/api";
import { actions as dataMapSettingsAction } from "@/store/data-map-settings/dataMapSettings.slice";
import { actions as dataSettingsAction } from "@/store/data-settings/dataSettings.slice";
import { actions as viewSettingsAction } from "@/store/view-settings/viewSettings.slice";
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
      const newData = {
        address: data.address,
        id: String(data.id),
        name: data.name,
        on_list: data.namefield,
        on_map: data.nameonmap
      }
      const response = await $axiosAuth.post(`/api/fields.php?map=${map}`, newData)
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
  deleteList: async (id:number) => {
    try {
      const {data} = await $axiosAuth.get(`/api/delete_list.php?id=${id}`)
      return data
    } catch (error) {
      console.log(error);
    }
  },
  getSettings: async(dispatch:any) => {
    try {
      const response = await $axiosAuth.get(`/api/save_settings.php`)
      console.log(response.data)
      // dispatch(dataSettingsAction.addGetIcons(response.data))
      dispatch(dataMapSettingsAction.addDataMapSettings(response.data))
    } catch (error) {
      console.log(error);
    }
  },
  saveSettings: async(map:string, dispatch:any, data:any) => {
    try {
      const updatedData = { ...data, map_id: map };
      const response = await $axiosAuth.post(`/api/save_settings.php`, updatedData);
      console.log(response)
      dispatch(dataMapSettingsAction.addDataMapSettings(response.data))
      dispatch(viewSettingsAction.defaultSettingsApp(''));
    } catch (error) {
      console.log(error);
    }
  },
  listItems: async(map:string, dispatch:any, id:any, items?: any) => {
    const data = items ? {id: id, items: items} : {id: id}

    try {
      // const response = await $axiosAuth.post(`/api/list_items.php?map=${map}`, {id: id});
      const response = await $axiosAuth.post(`/api/list_items.php?map=${map}`, data);
      console.log(response)
      // dispatch(dataMapSettingsAction.addDataMapSettings(response.data))
      // dispatch(viewSettingsAction.defaultSettingsApp(''));
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
}