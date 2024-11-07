import { IIconsData } from '@/types/data.types';

export const arrayNumIcons: IIconsData[] = [
	{
		id: 1,
		src: '/images/svg/sprite.svg#home-search-outline',
		hover_text: 'Поиск адреса',
	},
	{
		id: 2,
		src_active: '/images/svg/sprite.svg#selection-drag', //HELP: ПОМЕНЯЛ МЕСТАМИ АКТИВНЫЕ КАРТИНКИ, ЧТОБЫ ВСЕ РАБОТАЛО ПРАВИЛЬНО
		src: '/images/svg/sprite.svg#selection-remove',
		hover_text: 'Выделить область',
	},
	// {
	// 	id: 3,
	// 	src: '/images/svg/sprite.svg#map-legend',
	// 	hover_text: 'Легенда',
	// },
	// {
	// 	id: 4,
	// 	src: '/images/svg/sprite.svg#map-marker-distance',
	// 	hover_text: 'Построить маршрут',
	// },
	// {
	// 	id: 5,
	// 	src: '/images/svg/sprite.svg#palete-outline',
	// 	hover_text: 'Закрасить районы',
	// },
];

export const arrayImportExport: IIconsData[] = [
	{
		id: 15,
		src: '/images/svg/sprite.svg#database-import',
		hover_text: 'Импортировать данные'
	},
	{
		id: 16,
		src: '/images/svg/sprite.svg#database-export',
		hover_text: 'Экспортировать данные'
	},
]

export const arrayNumSettingIcons: IIconsData[] = [
	{
		id: 13,
		src: '/images/svg/sprite.svg#database-settings',
		hover_text: 'Настроить данные',
	},
	{
		id: 14,
		src: '/images/svg/sprite.svg#gear',
		hover_text: 'Настроить интерфейс',
	},
]

export const arrayNumMenuIcons: IIconsData[] = [
	{
		id: 6,
		src: '/images/svg/sprite.svg#filter-off',
		src_active: '/images/svg/sprite.svg#filter',
		hover_text: 'Показать/скрыть фильтры',
	},
	{
		id: 7,
		src: '/images/svg/sprite.svg#clipboard-text-off',
		src_active: '/images/svg/sprite.svg#clipboard-text',
		hover_text: 'Показать/скрыть список',
	},
	{
		id: 8,
		src: '/images/svg/sprite.svg#logout',
		hover_text: 'Выйти',
	},
];

export const arrayEditingObjects: IIconsData[] = [
	{
		id: 9,
		src: '/images/svg/sprite.svg#text-box-plus',
		hover_text: 'Добавить объект',
	},
	{
		id: 10,
		src: '/images/svg/sprite.svg#text-box-edit',
		hover_text: 'Редактировать объект',
	},
	{
		id: 11,
		src: '/images/svg/sprite.svg#text-box-remove',
		hover_text: 'Удалить объект',
	},
	{
		id: 12,
		src: '/images/svg/sprite.svg#map-marker-remove',
		hover_text: 'Удалить маркер',
	},
]