import { IButton } from '@/types/props.types';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import useWindowDimensions from '@/hooks/useWindowDimensions';


import { ACCESSIBLYMAP, TOKEN } from '@/app.constants';
import { useAuth } from '@/hooks/useAuth';
import { mapService } from '@/services/map.service';
import { actions as dataIntervalAction } from '@/store/data-intervals/dataInterval.slice';
import { actions as mapLayersAction } from '@/store/map-layers/mapLayers.slice';
import { RootState } from '@/store/store';
import { actions as userMapAction } from '@/store/user-map/userMap.slice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import styles from './Button.module.scss';

const Button: FC<IButton> = ({ icon, newCenter, elem }) => {
	const {isSelectArea, isSearchAddress, isColorInterval} = useSelector((state:RootState)=> state.viewSettings)
	const [clickButton, setClickButton] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();
	const {isAuth,setIsAuth} = useAuth()
	const router = useRouter()

  const searchParams = new URLSearchParams(window.location.search);
  const isEdit1 = Cookies.get(ACCESSIBLYMAP) === searchParams.get('map')
	
	// console.log('elem?.id === 17', icon?.id === 17,!(isAuth && isEdit1))

	return (
		<button
			className={styles.icon__button}
			disabled={elem?.crd === null || (icon?.id === 17 && !(isAuth && isEdit1))}
			// disabled={elem?.crd === null}
			onClick={() => {
				if (icon.id === 1) {
					dispatch(viewSettingsAction.toggleSearchAddress(''))
				}
				if (icon.id === 2) {
					dispatch(viewSettingsAction.toogleIsSelectArea(''))
					dispatch(mapLayersAction.clearPolygon(''))
				}
				if (icon.id === 8) {
					Cookies.remove(TOKEN);
					Cookies.remove(ACCESSIBLYMAP);
					setIsAuth(false)
					router.push('/auth')
					dispatch(userMapAction.deleteAccessiblyMap(''));
				}
				
				if (width && width <= 767.98) {
					if (icon.id === 6) {
						dispatch(viewSettingsAction.toggleSettingsMap(''));
						dispatch(viewSettingsAction.toggleFilters(''));
					}
					if (icon.id === 7) {
						dispatch(viewSettingsAction.toggleSettingsMap(''));
						dispatch(viewSettingsAction.toggleObjects(''));
					}
					if (icon.id === 17) {
						dispatch(viewSettingsAction.toggleSettingsMap(''));
						dispatch(viewSettingsAction.SetIsColorInterval(true))
					}
				} else {
					if (icon.id === 6) dispatch(viewSettingsAction.toggleFilters(''));
					if (icon.id === 7) dispatch(viewSettingsAction.toggleObjects(''));
					if (icon.id === 17) {
						dispatch(viewSettingsAction.SetIsColorInterval(!isColorInterval))
						dispatch(dataIntervalAction.addColor_map([]))
					}
				}

				if (width && width >= 767.98) setClickButton(!clickButton);
				if (newCenter && elem && icon.id === 0) newCenter(elem.crd);

				if (width && (elem && elem.id)) mapService.getObjectInfoForButton(elem.id, width, dispatch); //HELP: ЧТОБЫ НЕ БЫЛО ОШИБКИ В КОНСОЛИ МОЛ НЕТУ ОБЪЕКТА
			}}
		>
			{elem?.crd === null ? (
				<svg viewBox='0 0 24 24'>
					<path
						fill='red'
						d='M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z'
					></path>
				</svg>
			) : (
				<svg className={icon.id === 0 ? styles.icon_svg_home : styles.icon_svg} style={icon.id === 2 && isSelectArea || icon.id === 1 && isSearchAddress ? {color: 'red'} : {}}>
					<use
						xlinkHref={
							clickButton
								? icon.src
								: icon.src_active
									? icon.src_active
									: icon.src
						}
					></use>
				</svg>
			)}

			<p
				className={styles.hover__text}
				style={
					icon.id === 0 || icon.id === 6 || icon.id === 7 || icon.id === 8
						? {
								right: 0,
							}
						: { left: 0 }
				}
			>
				{elem?.crd === null ? 'Объекта нет на карте' : icon.hover_text}
			</p>
		</button>
	);
};

export default Button;
