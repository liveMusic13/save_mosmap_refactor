import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '@/components/ui/loading/Loading';

import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { IAllObjects } from '@/types/props.types';
import { IValues } from '@/types/slice.types';
import Cookies from 'js-cookie';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import { ACCESSIBLYMAP } from '@/app.constants';
import { useAddObject } from '@/hooks/useAddObject';
import { useAuth } from '@/hooks/useAuth';
import { editObjectService } from '@/services/editObject.servece';
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice';
import { actions as dotInfoAction } from '@/store/dot-info/dotInfo.slice';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './ObjectInfo.module.scss';

const ObjectInfo: FC<IAllObjects> = ({ isDisplay }) => {
	const searchParams = useSearchParams();
	const map = searchParams.get('map');
	const {isAuth} = useAuth()
	const isEdit1 = Cookies.get(ACCESSIBLYMAP) === searchParams.get('map')
	const {getField} = useAddObject()
	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const dataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const dotInfo = useSelector(
		(state: RootState) => state.dotInfo,
	);
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();

	useEffect(()=> {
		if (viewSettings.isDotInfo) {
			dispatch(dataObjectsInMapAction.updateCrdObjectById({id: dataObjectInfo.id, crd: [dotInfo.lat,dotInfo.lng]}))
			console.log('dataObjectInfoAction.addCrd([dotInfo.lat,dotInfo.lng])',dataObjectInfo, [dotInfo.lat,dotInfo.lng])
		}
	}, [dataObjectInfo, viewSettings.isDotInfo])

	return (
		<div
			className={styles.block__info}
		>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Просмотр объекта</h2>
				<button
					className={styles.button__close}
					onClick={() => {
						dispatch(viewSettingsAction.defaultObjectInfo(''));
						if (width && width <= 767.98)
							dispatch(viewSettingsAction.toggleFilters(''));

						//TODO: Test
							dispatch(dataObjectsInMapAction.deleteNewObject(''))
						//

						dispatch(dataObjectInfoAction.deleteObjectInfo(''));
						dispatch(viewSettingsAction.SetIsDotInfo(false));
						dispatch(dotInfoAction.addCoords({lat: 0, lng: 0}))
					}}
				>
					<span></span>
				</button>
			</div>
			<div className={styles.block__aboutObjects}>
				{viewSettings.isLoadingObject ? (
					<>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
					</>
				) : (
					<>
						{dataObjectInfo?.values?.map((elem: IValues) => {
							return (
								<div
									key={Math.random() + Math.random()}
									className={styles.block__descriptionInfo}
								>
									<h2 className={styles.title__info}>{elem.label}</h2>
									
									{
										elem.href ? (
											<Link className={styles.description__info} href={elem.href} target='_blank' >{elem.value}</Link> 
										) : ( 
											<p className={styles.description__info}>{elem.value}</p>
										)
									}
								</div>
							);
						})}
					</>
				)}
			</div>
			{
				viewSettings.isDotInfo && <button className={styles.button} disabled={!(isAuth && isEdit1)} onClick={async ()=> {
					// await editObjectService.saveDataInfo({lat: dotInfo.lat, lng: dotInfo.lng}, map ? map : '')
					await editObjectService.saveDataInfo([dotInfo.lat,dotInfo.lng], map ? map : '', dispatch)
					dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
					// dispatch(viewSettingsAction.SetIsDotInfo(false));
					// getField()
					// dispatch(dataObjectInfoAction.addCrd([dotInfo.lat,dotInfo.lng]))

				}}>Добавить объект</button>
			}
		</div>
	);
};

export default ObjectInfo;
