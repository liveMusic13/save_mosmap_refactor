export interface IAdresFilterString {
	srcRequest: string;
}

export interface IItemsFilter {
	item_id: number;
	item_name: string;
}

export interface IDataFilters {
	caption: string;
	id: number;
	items?: IItemsFilter[];
	multiple?: number;
	name: string;
	type: string;
}

export interface IValues {
	disabled: number;
	el: string;
	label: string;
	name: string;
	type?: string;
	id?: string;
	value: string | number;
}

export interface IDataObjectInfo {
	area?: number[]; //TODO: УЗНАТЬ ПРО ДАННЫЕ ЧТО ТУТ БУДУТ
	color?: string;
	crd?: [number, number];
	cuts?: number[]; //TODO: УЗНАТЬ ПРО ДАННЫЕ ЧТО ТУТ БУДУТ
	icon?: string;
	id?: number;
	name?: number;
	name_map?: null;
	polygon?: [number, number][];
	raion_id?: string;
	values?: IValues[];
}

export interface IUserMap {
	map: string;
	accessiblyMap: string[]
}

export interface IViewSettings {
	isViewImport: boolean,
	isViewExport: boolean,
	isPopupSettingGroups: boolean;
	isBurger: boolean;
	isViewDeletePopup: boolean;
	isViewPopupSettings: boolean;
	isViewFilters: boolean;
	isViewObjects: boolean;
	isSettingsMap: boolean;
	isSettingsApp: boolean;
	isSettingsData: boolean;
	isObjectInfo: boolean;
	isLoading: boolean;
	isLoadingObject: boolean;
	isDisplay: boolean;
	isSelectArea: boolean;
	editingObjects: {
		isAddObject: boolean,
		isEditObjects: boolean,
		isDeleteObject: boolean,
		isDeleteMarker: boolean,
		isActiveAddButton: boolean,
		isActiveEditButton: boolean,
		isViewPopup: {
			isObject: boolean,
			isMarker: boolean,
		},
		isMobileEditCrd: boolean,
	}
}

export interface IDataMap {
	title: string;
	'all-points': number;
	clastering: number;
	canvas_map: string;
	icons_ref: string;
	color_ref: string;
	icons: {
		[key: string]: string;
	};
	colors: {
		[key: string]: string;
	};
	icon_sizes: { [key: string]: string[] };
	points: IMarker[];
}

export interface IMarker {
	crd: [number, number];
	id: number;
	icon: string;
	color: string;
	raion_id: string;
	polygon: number[][] | any;
	name: string;
	name_map: null | any;
	values?: IValues[];
}

export interface IDataObjectsInMap {
	points: IDataMap | any;
	centerMapObject: [number, number];
}

export interface ISettingsData {
	maps: IMaps[],
  lists: ILists[],
  fields: IFields[],
  getIcons: string[]
}

export interface IFields {
	address: number;
	id: number;
	name: string;
	namefield: number;
	nameonmap: number;
	type: string;
	type_name: string;
}

export interface ILists {
	color: number;
	icon: number;
	id: number;
	mode: number;
	name: string;
}

export interface IMaps {
	id: number;
	mode: number;
	name: string;
	visible: number;
}

export interface CheckboxPayload {
  id: number;
  field: string;
  value: number;
}

export type AllowedDataKey = 'namefield' | 'nameonmap' | 'address' | 'mode' | 'icon' | 'color' | 'visible';