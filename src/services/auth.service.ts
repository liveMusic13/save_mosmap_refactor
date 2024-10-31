import { $axiosAuth } from "@/api";
import { ACCESSIBLYMAP, TOKEN } from "@/app.constants";
import { actions as userMapAction } from "@/store/user-map/userMap.slice";
import { IDataNewpass, IRegistrationData, IRestoreData } from "@/types/data.types";
import Cookies from 'js-cookie';

export const authService = {
  login: async (login:string, password: string, setIsAuth: (value:boolean) => void, searchParams:any, router:any, dispatch:any) => {
    try {
      const {data} = await $axiosAuth.post(`/api/get_token.php`, {
        login,
        password
      })

      if (data.access_token) {
				Cookies.set(TOKEN, data.access_token);
        Cookies.set(ACCESSIBLYMAP, data.user)
        dispatch(userMapAction.addNumMap(data.user));
        dispatch(userMapAction.addAccessiblyMap(data.user));
        await searchParams.set('map', data.user);
        // await router.push('?' + searchParams.toString(), undefined, { shallow: true });
        router.push(`/?map=${data.user}`) 
        // router.push(`/maps/?map=${data.user}`) 
        // router.push({
        //   pathname: '/maps',
        //   query: { map: data.user }
        // });
				setIsAuth(true);
			}
    } catch (error) {
      console.log(error);
    }
  },
  registration: async (data:IRegistrationData) => {
    try {
      const {data:dataResponse} = await $axiosAuth.post(`/api/registr.php`, data)
      console.log('dataResponse', dataResponse)
      return dataResponse
    } catch (error) {
      console.log(error);
    }
  },
  restore: async (data:IRestoreData) => {
    try {
      const {data:dataResponse} = await $axiosAuth.post(`/api/restore.php`, data)
      console.log('dataResponse', dataResponse)
      return dataResponse
    } catch (error) {
      console.log(error);
    }
  },
  newpass: async (data:IDataNewpass) => {
    try {
      const {data:dataResponse} = await $axiosAuth.post(`/api/newpass.php`, data)
      console.log('dataResponse', dataResponse)
      return dataResponse
    } catch (error) {
      console.log(error);
    }
  },
  confirm: async (data: {token:string}) => {
    try {
      const {data:dataResponse} = await $axiosAuth.post(`/api/newpass.php`, data)
      console.log('dataResponse', dataResponse)
      return dataResponse
    } catch (error) {
      console.log(error);
    }
  }
}