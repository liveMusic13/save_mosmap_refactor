import { FC } from 'react';

import { IIconMarker } from '@/types/props.types';

const IconMarker: FC<IIconMarker> = ({ object, size }) => {

	return (
		// <svg style={{ width: '20px', height: '20px', color: `#${object.color}` }}>
		<svg style={{ width: `${size[0]}px`, height: `${size[0]}px`, color: `${object.color}` }}>
			<use xlinkHref={`../images/svg/sprite.svg#${object.icon}`}></use>
		</svg>
	);
};

export default IconMarker;
