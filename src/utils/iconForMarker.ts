import { IDataObjectInfo } from '@/types/slice.types';

export const getIconForMarker = (marker: IDataObjectInfo) => {
	if (marker.icon === 'shield') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield" viewBox="0 0 24 24">
        <path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>
    </symbol>
    <use xlink:href="#${marker.icon}"></use>
</svg>`;
	} else if (marker.icon === 'shield-alert') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-alert" viewBox="0 0 24 24">
      <path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5M11 7h2v6h-2m0 2h2v2h-2"></path>
    </symbol>
    <use xlink:href="#shield-alert"></use>
  </svg>`;
	} else if (marker.icon === 'shield-alert-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-alert-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21M11 7h2v6h-2V7m0 8h2v2h-2v-2z"></path>
		</symbol>
    <use xlink:href="#shield-alert-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-bug') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-bug" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M11 13h2v1h-2v-1m10-8v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4m-4 5h-2.2c-.2-.6-.6-1.1-1.1-1.5l1.2-1.2-.7-.7L12.8 8H12c-.2 0-.5 0-.7.1L9.9 6.6l-.8.8 1.2 1.2c-.5.3-.9.8-1.1 1.4H7v1h2v1H7v1h2v1H7v1h2.2c.4 1.2 1.5 2 2.8 2s2.4-.8 2.8-2H17v-1h-2v-1h2v-1h-2v-1h2v-1m-6 2h2v-1h-2v1z"></path>
		</symbol>
    <use xlink:href="#shield-bug"></use>
  </svg>`;
	} else if (marker.icon === 'shield-bug-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-bug-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M9.9 6.6l-.8.8 1.2 1.2c-.5.3-.9.8-1.1 1.4H7v1h2v1H7v1h2v1H7v1h2.2c.4 1.2 1.5 2 2.8 2s2.4-.8 2.8-2H17v-1h-2v-1h2v-1h-2v-1h2v-1h-2.2c-.2-.6-.6-1.1-1.1-1.5l1.2-1.2-.7-.7L12.8 8H12c-.2 0-.5 0-.7.1L9.9 6.6M11 11h2v1h-2v-1m0 2h2v1h-2v-1m10-2c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4v6m-9 10c3.8-1 7-5.5 7-9.8V6.3l-7-3.1-7 3.1v4.9c0 4.3 3.2 8.8 7 9.8z"></path>
		</symbol>
    <use xlink:href="#shield-bug-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-car') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-car" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M14.4 6.5L16 10H8l1.4-3.5h5M9 11c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1m6 0c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1m6-6v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4m-3 6l-2.2-5c-.2-.6-.8-1-1.4-1h-5c-.6 0-1.2.4-1.4 1l-2 5v4c0 .5.4 1 1 1h1c.6 0 1-.5 1-1v-1h6v1c0 .5.4 1 1 1h1c.5 0 1-.5 1-1v-4z"></path>
		</symbol>
    <use xlink:href="#shield-car"></use>
  </svg>`;
	} else if (marker.icon === 'shield-car-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-car-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm7 10.2c0 4.3-3.2 8.8-7 9.8-3.8-1-7-5.5-7-9.8V6.3l7-3.1 7 3.1v4.9zM8 5.8l-2 5v4c0 .5.5 1 1 1h1c.5 0 1-.5 1-1v-1h6v1c0 .5.5 1 1 1h1c.5 0 1-.5 1-1v-4l-2.2-5c-.2-.6-.8-1-1.4-1h-5c-.6 0-1.2.4-1.4 1zm1 7c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm6 0c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm1-3H8l1.4-3.5h5L16 9.8z"></path>
		</symbol>
    <use xlink:href="#shield-car-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-cross') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-cross" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4m4 9h-3v8h-2v-8H8V8h3V5h2v3h3v2z"></path>
		</symbol>
    <use xlink:href="#shield-cross"></use>
  </svg>`;
	} else if (marker.icon === 'shield-cross-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-cross-outline" viewBox="0 0 24 24">
    <path fill="#${marker.color}" d="M21 11c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4v6m-9 10c3.8-1 7-5.5 7-9.8V6.3l-7-3.1-7 3.1v4.9c0 4.3 3.3 8.8 7 9.8m4-12h-3V6h-2v3H8v2h3v8h2v-8h3V9z"></path>
  </symbol>
    <use xlink:href="#shield-cross-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-crown') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-crown" viewBox="0 0 24 24">
    <path fill="#${marker.color}" d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4m4 13H8v1.5c0 .27.19.46.47.5h6.96c.31 0 .52-.16.57-.41V14m1-6l-2.67 2.67L12 8.34l-2.33 2.33L7 8l1 5h8l1-5z"></path>
  </symbol>
    <use xlink:href="#shield-crown"></use>
  </svg>`;
	} else if (marker.icon === 'shield-crown-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-crown-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4m0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3l-7-3.12M16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14h8m1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33L17 8z"></path>
		</symbol>
    <use xlink:href="#shield-crown-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-home') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-home" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M11 13h2v3h3v-5h2l-6-5-6 5h2v5h3v-3m1-12l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z"></path>
		</symbol>
    <use xlink:href="#shield-home"></use>
  </svg>`;
	} else if (marker.icon === 'shield-home-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-home-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m-1-7h2v3h3v-5h2l-6-5-6 5h2v5h3v-3"></path>
		</symbol>
    <use xlink:href="#shield-home-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-key') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-key" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 8a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1m9 3c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9-5a3 3 0 0 0-3 3c0 1.31.83 2.42 2 2.83V18h2v-2h2v-2h-2v-2.17c1.17-.41 2-1.52 2-2.83a3 3 0 0 0-3-3z"></path>
		</symbol>
    <use xlink:href="#shield-key"></use>
  </svg>`;
	} else if (marker.icon === 'shield-key-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-key-outline" viewBox="0 0 24 24">
    <path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m0-15a3 3 0 0 1 3 3c0 1.31-.83 2.42-2 2.83V14h2v2h-2v2h-2v-6.17A2.99 2.99 0 0 1 9 9a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1z"></path>
  </symbol>
    <use xlink:href="#shield-key-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-link') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-link" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m2.28 13.08l-2.02 2.02c-.6.6-1.39.9-2.18.9-.79 0-1.58-.3-2.18-.9a3.09 3.09 0 0 1 0-4.36l1.25-1.24-.01.56c0 .44.07.89.22 1.31l.05.13-.37.37c-.28.28-.44.66-.44 1.05 0 .4.16.77.44 1.05.56.56 1.53.56 2.09 0l2.01-2.01c.29-.29.44-.66.44-1.05 0-.41-.15-.77-.43-1.05a.83.83 0 0 1-.25-.57c0-.21.1-.41.25-.56.3-.31.85-.3 1.13 0 .58.58.9 1.35.9 2.17 0 .83-.32 1.6-.9 2.18m2.82-2.82l-1.25 1.24.01-.56c0-.44-.07-.88-.22-1.3l-.04-.14.36-.37c.29-.28.44-.63.44-1.05 0-.39-.15-.76-.43-1.04-.57-.57-1.54-.57-2.1 0l-2.01 2.01c-.28.28-.44.65-.44 1.05s.15.76.44 1.04c.14.15.24.36.24.57 0 .22-.1.42-.25.57-.15.16-.35.22-.56.22-.2 0-.41-.07-.57-.22a3.054 3.054 0 0 1 0-4.36l2.02-2.02a3.09 3.09 0 0 1 4.36 0c.58.6.9 1.36.9 2.18 0 .82-.32 1.6-.9 2.18z"></path>
		</symbol>
    <use xlink:href="#shield-link"></use>
  </svg>`;
	} else if (marker.icon === 'shield-link-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-link-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m2.28-11.27c.58.58.9 1.35.9 2.17 0 .83-.32 1.6-.9 2.18l-2.02 2.02c-.6.6-1.39.9-2.18.9-.79 0-1.58-.3-2.18-.9a3.09 3.09 0 0 1 0-4.36l1.25-1.24-.01.56c0 .44.07.89.22 1.3l.04.14-.36.37c-.29.28-.44.63-.44 1.05 0 .39.15.76.43 1.04.57.57 1.54.57 2.1.01l2.01-2.02c.29-.28.44-.65.44-1.04 0-.41-.15-.77-.44-1.05a.866.866 0 0 1-.24-.57c0-.21.1-.42.24-.57.31-.3.86-.3 1.14.01M18 9.08c0 .82-.32 1.6-.9 2.18l-1.25 1.24.01-.56c0-.44-.07-.88-.22-1.3l-.05-.14.37-.37c.29-.28.44-.63.44-1.05 0-.39-.15-.76-.44-1.04-.56-.57-1.53-.57-2.09-.01l-2.01 2.02c-.29.28-.44.65-.44 1.05s.15.76.43 1.04c.15.15.25.36.25.57 0 .22-.1.42-.25.57-.15.15-.35.22-.56.22-.2 0-.41-.07-.57-.22a3.054 3.054 0 0 1 0-4.36l2.02-2.02a3.09 3.09 0 0 1 4.36 0c.58.6.9 1.36.9 2.18z"></path>
		</symbol>
    <use xlink:href="#shield-link-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-lock') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-lock" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3z"></path>
		</symbol>
    <use xlink:href="#shield-lock"></use>
  </svg>`;
	} else if (marker.icon === 'shield-lock-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-lock-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m2.8-10V9.5C14.8 8.1 13.4 7 12 7S9.2 8.1 9.2 9.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3m-1.3 0h-3V9.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3V11z"></path>
		</symbol>
    <use xlink:href="#shield-lock-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-moon') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-moon" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m3.97 13.41c-1.84 2.17-5.21 2.09-6.97-.07-2.18-2.72-.64-6.72 2.7-7.34.34-.05.63.28.51.61-.46 1.23-.39 2.64.32 3.86a4.51 4.51 0 0 0 3.18 2.2c.34.05.49.47.26.74z"></path>
		</symbol>
    <use xlink:href="#shield-moon"></use>
  </svg>`;
	} else if (marker.icon === 'shield-moon-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-moon-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m-3-6.67c1.76 2.17 5.13 2.24 6.97.07.23-.27.08-.68-.26-.74a4.491 4.491 0 0 1-3.18-2.2 4.503 4.503 0 0 1-.32-3.86.453.453 0 0 0-.51-.6c-3.34.62-4.89 4.61-2.7 7.33"></path>
		</symbol>
    <use xlink:href="#shield-moon-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-off') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-off" viewBox="0 0 24 24">
			<path fill="#${marker.color}"  d="M1 4.27L2.28 3 20.5 21.22l-1.27 1.28L17 20.25c-1.43 1.32-3.13 2.29-5 2.75-5.16-1.26-9-6.45-9-12V6.27l-2-2M12 1l9 4v6c0 2.28-.65 4.5-1.77 6.41L5.65 3.82 12 1z"></path>
		</symbol>
    <use xlink:href="#shield-off"></use>
  </svg>`;
	} else if (marker.icon === 'shield-off-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-off-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M1 4.27l2 2V11c0 5.55 3.84 10.74 9 12 1.87-.46 3.57-1.44 4.97-2.76l2.26 2.26 1.27-1.28L2.28 3 1 4.27M12 21c-3.75-1-7-5.46-7-9.78V8.27l10.59 10.59C14.53 19.89 13.3 20.65 12 21m9-16v6c0 2.28-.65 4.5-1.77 6.4l-1.46-1.45c.77-1.45 1.23-3.11 1.23-4.73V6.3l-7-3.12-4.84 2.16-1.51-1.52L12 1l9 4z"></path>
		</symbol>
    <use xlink:href="#shield-off-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21z"></path>
		</symbol>
    <use xlink:href="#shield-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-star') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-star" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m3.08 15L12 14.15 8.93 16l.81-3.5-2.71-2.34 3.58-.31L12 6.55l1.39 3.29 3.58.31-2.71 2.35.82 3.5z"></path>
		</symbol>
    <use xlink:href="#shield-star"></use>
  </svg>`;
	} else if (marker.icon === 'shield-star-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-star-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m3.05-5l-3.08-1.85L8.9 16l.81-3.5L7 10.16l3.58-.31 1.39-3.3 1.4 3.29 3.58.31-2.72 2.35.82 3.5"></path>
		</symbol>
    <use xlink:href="#shield-star-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-sun') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-sun" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4m0 7.89c1.6 0 2.89 1.29 2.89 2.89S13.6 14.67 12 14.67s-2.89-1.3-2.89-2.89 1.3-2.89 2.89-2.89M12 6l1.38 2c-.42-.18-.88-.27-1.38-.27s-.95.09-1.38.27L12 6M7 8.89l2.4-.2c-.34.31-.66.65-.9 1.07-.25.42-.4.86-.5 1.32L7 8.89m0 5.78l1.03-2.17c.08.43.24.88.47 1.3.25.43.56.79.9 1.08L7 14.67m10-5.78l-1 2.19c-.1-.46-.26-.9-.5-1.32-.24-.42-.55-.76-.9-1.08l2.4.21m0 5.78l-2.4.2c.34-.29.65-.65.9-1.07.24-.42.39-.87.47-1.3L17 14.67m-5 2.88l-1.39-1.98c.43.15.89.25 1.39.25.5 0 .95-.1 1.37-.25L12 17.55z"></path>
		</symbol>
    <use xlink:href="#shield-sun"></use>
  </svg>`;
	} else if (marker.icon === 'shield-sun-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-sun-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21m0-12.11c1.6 0 2.89 1.29 2.89 2.89S13.6 14.67 12 14.67s-2.89-1.3-2.89-2.89 1.3-2.89 2.89-2.89M12 6l1.38 2c-.42-.18-.88-.27-1.38-.27s-.95.09-1.38.27L12 6M7 8.89l2.4-.2c-.34.31-.66.65-.9 1.07-.25.42-.4.86-.5 1.32L7 8.89m0 5.78l1.03-2.17c.08.43.24.88.47 1.3.25.43.56.79.9 1.08L7 14.67m10-5.78l-1 2.19c-.1-.46-.26-.9-.5-1.32-.24-.42-.55-.76-.9-1.08l2.4.21m0 5.78l-2.4.2c.34-.29.65-.65.9-1.07.24-.42.39-.87.47-1.3L17 14.67m-5 2.88l-1.39-1.98c.43.15.89.25 1.39.25.5 0 .95-.1 1.37-.25L12 17.55z"></path>
		</symbol>
    <use xlink:href="#shield-sun-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-sword') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-sword" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4m3 14h-2v3h-2v-3H9v-2h2l-1-5.9 2-1.6 2 1.6-1 5.9h2v2z"></path>
		</symbol>
    <use xlink:href="#shield-sword"></use>
  </svg>`;
	} else if (marker.icon === 'shield-sword-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-sword-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M12 1l9 4v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4m0 2.2L5 6.3v4.9c0 4.3 3.2 8.8 7 9.8 3.8-1 7-5.5 7-9.8V6.3l-7-3.1m0 2.3l2 1.6-1 5.9h2v2h-2v3h-2v-3H9v-2h2l-1-5.9 2-1.6z"></path>
		</symbol>
    <use xlink:href="#shield-sword-outline"></use>
  </svg>`;
	} else if (marker.icon === 'shield-unlock') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-unlock" viewBox="0 0 24 24">
    <path fill="#${marker.color}" d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4m4 14.8c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V8.5C9.2 7.1 10.6 6 12 6s2.8 1.1 2.8 2.5V9h-1.3v-.5c0-.8-.7-1.3-1.5-1.3s-1.5.5-1.5 1.3V11h4.3c.6 0 1.2.6 1.2 1.3v3.5z"></path>
  </symbol>
    <use xlink:href="#shield-unlock"></use>
  </svg>`;
	} else if (marker.icon === 'shield-unlock-outline') {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px" >
    <symbol id="shield-unlock-outline" viewBox="0 0 24 24">
			<path fill="#${marker.color}" d="M21 11c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4v6m-9 10c3.8-1 7-5.5 7-9.8V6.3l-7-3.1-7 3.1v4.9c0 4.3 3.2 8.8 7 9.8m2.8-10h-4.3V8.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3V9h1.3v-.5C14.8 7.1 13.4 6 12 6S9.2 7.1 9.2 8.5V11c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3z"></path>
		</symbol>
    <use xlink:href="#shield-unlock-outline"></use>
  </svg>`;
	} else {
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" width="24px" height="24px">
    <g fill="#26a69a" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
        <g transform="scale(5.33333,5.33333)">
            <path d="M40.6,12.1l-23.6,23.6l-9.6,-9.6l-2.8,2.9l12.4,12.3l26.4,-26.4z"></path>
        </g>
    </g>
</svg>`;
	}
};
