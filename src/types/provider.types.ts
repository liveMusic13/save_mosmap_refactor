import { Dispatch, SetStateAction } from "react";

export interface IIsAuth {
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
}