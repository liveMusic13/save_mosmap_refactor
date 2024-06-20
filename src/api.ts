import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN } from './app.constants';


const API_URL = 'https://app.mosmap.ru';

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// export const $axiosAuth = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Access-Token': `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1nPT0iLCJhY2Nlc3MiOiJNUT09IiwicmVtb3RlIjoiZWZiNTQ0Y2MyYTRiNTRlNzUwNjY0ZGIxNGU1NTMxMjAiLCJleHAiOjE3MTM0NzM2MTJ9.KOoyZC4K-vxXdxINCsHr2uCdvx4oU8RU5STxOBJ21siSIEkLS7bf-47-Vb_GVoopSQBcujHHNA_OYmK5aXswlwgMbFUNMHkSH7dGnr8Nb3XJGgCOvEr7LwoxLY93QjtZI0p0zj5PDMKmXSXrjT42Tqcc3NiAYmzcecjvewK7lsd8xed5oJNivlQoFnBzZxVnNCUrdyhsI2CsUWWy9IOv0knmnzNE_KscwjmlW2Qf3XANjznR_5GcqnD40NHyErQtR54UsrfARH4f1Yhb2F8xYgqQNQ5INgfFe-wq5OtiqZrUjePH4klLcCJHyA2XOdDXv455Jg3ReneUWuHQt72L_A`
// 	},
// });

export const $axiosAuth = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		// 'Access-Token': `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1nPT0iLCJhY2Nlc3MiOiJNUT09IiwicmVtb3RlIjoiZWZiNTQ0Y2MyYTRiNTRlNzUwNjY0ZGIxNGU1NTMxMjAiLCJleHAiOjE3MTM0NzM2MTJ9.KOoyZC4K-vxXdxINCsHr2uCdvx4oU8RU5STxOBJ21siSIEkLS7bf-47-Vb_GVoopSQBcujHHNA_OYmK5aXswlwgMbFUNMHkSH7dGnr8Nb3XJGgCOvEr7LwoxLY93QjtZI0p0zj5PDMKmXSXrjT42Tqcc3NiAYmzcecjvewK7lsd8xed5oJNivlQoFnBzZxVnNCUrdyhsI2CsUWWy9IOv0knmnzNE_KscwjmlW2Qf3XANjznR_5GcqnD40NHyErQtR54UsrfARH4f1Yhb2F8xYgqQNQ5INgfFe-wq5OtiqZrUjePH4klLcCJHyA2XOdDXv455Jg3ReneUWuHQt72L_A`
	},
});

$axiosAuth.interceptors.request.use(
	config => {
		const token = Cookies.get(TOKEN);
		if (token) {
			config.headers['Access-Token'] = `${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);