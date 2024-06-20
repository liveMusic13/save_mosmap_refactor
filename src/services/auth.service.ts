import { $axiosAuth } from "@/api";
import { ACCESSIBLYMAP, TOKEN } from "@/app.constants";
import { actions as userMapAction } from "@/store/user-map/userMap.slice";
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
				setIsAuth(true);
			}
    } catch (error) {
      console.log(error);
    }
  }
}