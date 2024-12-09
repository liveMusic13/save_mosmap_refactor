import { $axiosAuth } from "@/api";

export const editObjectService = {
  getFieldForAddObject: async () => {
    try {
      const cachedData = localStorage.getItem('objectData');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        // Если есть закешированные данные, возвращаем их
        return data
      }

      const { data } = await $axiosAuth.get('/api/object_info.php?id=0');

      localStorage.setItem('objectData', JSON.stringify(data));

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  saveFieldForAddObject: async (idMap:string, obj:any) => {
    try {
      const response = await $axiosAuth.post(`/api/save_object.php?map=${idMap}`, obj)
      return response.data
    } catch (error) {
      console.log(error);
    }
  },
  deleteObject: async (id:number) => {
    try {
      const {data} = await $axiosAuth.get(`/api/delete_object.php?id=${id}`)
      return data
    } catch (error) {
      console.log(error);
    }
  },
  saveDataInfo: async (coords: {lat:number, lng: number},idMap:string) => {
    try {
      const response = await $axiosAuth.post(`/api/save_object.php?map=${idMap}`, coords)
      // const response = await $axiosAuth.get(`/api/save_object.php?lat=${coords.lat}&lng=${coords.lng}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error);
    }
  },
};
