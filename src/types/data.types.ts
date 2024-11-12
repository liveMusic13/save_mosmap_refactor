export interface IIconsData {
	id: number;
	src: string;
	hover_text: string;
	src_active?: string;
}

export interface IColumnData {
	id: number;
	name: string;
}

export interface ICheckedStates {
	[key: string]: boolean
}

export interface IRegistrationData {
	login: string;
	password: string;
	email: string;
	mapname?: string;
	descr?: string;
}

export interface IRestoreData {
	login?: string;
	email?: string;
}

export interface IDataResponse {
	message: string;
	status: string;
	map?: string | number;
	token?: string;
}

export interface IDataNewpass {
	password: string;
	token?: string;
	oldpassword?: string;
	map?:string;
}

export interface IDataSearchAddress {
	
	list: {
		id: string;
		name: string;
		subname:string;
		coords?: [number, number]
	}[];
	url: string;
}