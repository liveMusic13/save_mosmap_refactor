import { Content } from '@/components/content/Content';
import { Header } from '@/components/header/Header';
import SettingsApp from '@/components/settings-app/SettingsApp';
import { SettingsMap } from '@/components/settings-map/SettingsMap';
import { useInitRequest } from '@/hooks/useInitRequest';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { settingsService } from '@/services/settings.service';
// import { settingsService } from '@/services/settings.service';
import { actions as dataFiltersAction } from '@/store/data-filters/dataFilters.slice';
import { RootState } from '@/store/store';
import { actions as viewSettingsActions } from '@/store/view-settings/viewSettings.slice';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({data, dataFilters}:any) {
  const dispatch = useDispatch();
	const adresFilterString = useSelector(
		(state: RootState) => state.adresFilterString,
	);
	const viewSettings = useSelector(
		(state: RootState) => state.viewSettings,
	);
	const { width } = useWindowDimensions();
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const map = searchParams.get('map');
	const { getObject } = useInitRequest();
	const [initApp, setInitApp] = useState(false);

	useEffect(() => {
		if (adresFilterString.srcRequest !== '') {
			setInitApp(true);
		}
	}, [adresFilterString.srcRequest]);

	useEffect(() => {
		if (!map) {
			push(`?map=7`);
			// push(`/map/?map=7`);
		} else {
			//HELP: ТЕСТИРУЮ ИЗМЕНЕНИЕ РАЗМЕРОВ ЗНАЧКА
			settingsService.getSettings(dispatch)
			getObject();//HELP: НУЖЕН ДЛЯ ТОГО ЧТОБЫ ЗАПИСЬ С БЭКА НЕ ПЕРЕБИВАЛА ДАННЫЕ С РЕДАКСА И ПРОИСХОДИЛА ФИЛЬТРАЦИЯ СПИСКА
			// dispatch( dataObjectsInMapAction.addDataObjectsInMap(data));
			dispatch(dataFiltersAction.addFilters(dataFilters));
		}
	}, [map, initApp]);

	useEffect(() => {
		if (width && width <= 767.98) {
			dispatch(viewSettingsActions.defaultFilters(''));
			dispatch(viewSettingsActions.defaultObjects(''));
		}
	}, [width]);

	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta name='description' content={data.description} />
				{/* <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{(viewSettings.editingObjects.isViewPopup.isMarker || viewSettings.editingObjects.isViewPopup.isObject) && <div className='background__opacity'></div>}
			<Header data={data}/>
			{/* <div style={{ height: '100%' }}> */}
			<div className='wrapper__inPage'>
				<Content data={data} />
				{viewSettings.isSettingsMap && <SettingsMap />}
				{(viewSettings.isSettingsApp || viewSettings.isSettingsData || viewSettings.isViewImport || viewSettings.isViewExport) && <SettingsApp/> }
			</div>
		</>
	);
}

export const getServerSideProps = async ({ query }: any) => {
  const response = await fetch(`https://app.mosmap.ru/api/get_objects.php?map=${query.map || 7}`);
  const data = await response.json();

  const filtersResponse = await fetch(`https://app.mosmap.ru/api/filters.php?map=${query.map || 7}`);
  const dataFilters = await filtersResponse.json();

  return {
    props: {
      data,
      dataFilters,
      maps: query,
    },
  };
};