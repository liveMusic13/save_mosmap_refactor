// import { debounce } from 'lodash';
// import { useRouter } from 'next/router';
// import { ChangeEvent, FC, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { IInput } from '@/types/props.types';

// import { actions as adresFilterStringAction } from '@/store/adres-filter-string/adresFilterString.slice';

// import styles from './Input.module.scss';

// const Input: FC<IInput> = ({ placeholder, name, clearFilter }) => {
// 	const [test, setTest] = useState<string>('');
// 	const [isInputValid, setIsInputValid] = useState<boolean>(true);
// 	const dispatch = useDispatch();

// 	const router = useRouter();

// 	const searchParams = new URLSearchParams(window.location.search);

// 	const updateURL = debounce((name, value) => {

// 		if (value === '') {
// 			searchParams.delete(name);
// 		} else {
// 			searchParams.set(name, value);
// 		}

// 		router.replace('?' + searchParams.toString(), undefined, { shallow: true });
// 	}, 500);

// 	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
// 		const value = event.target.value;
// 		const isValidNumber = /^\d*$/.test(value);
// 		if (isValidNumber) {
// 			setTest(value);
// 			setIsInputValid(true);
// 			updateURL(name, value);
// 		} else {
// 			setIsInputValid(false);
// 		}
// 	};

// 	useEffect(() => {
// 		dispatch(adresFilterStringAction.addGetParams(window.location.search));
// 	}, [searchParams]); //HELP: ВМЕСТО ОТСЛЕЖИВАНИЯ window.location.search Я ОТСЛЕЖИВАЮ searchParams ЧТОБЫ ПРИ КАЖДОМ ОБНОВЛЕНИИ ПАРАМЕТРОВ ДОБАВЛЯТЬ ИХ В СТЕЙТ РЕДАКСА И ТЕМ САМЫМ УСТРАНИТЬ БАГ, ГДЕ ПРИ ПЕРВОМ НАЖАТИИ НА ПОИСК В ФИЛЬТРАХ, УХОДИЛ ПУСТОЙ ЗАПРОС С ПРЕДЫДУЩЕМ ЗНАЧЕНИЕМ, Т.К. БЕЗ USELOCATION НЕ ОБНОВЛЯЛО НОРМАЛЬНО А АНАЛОГА В NEXT Я ТАК И НЕ НАШЕЛ

	

// 	useEffect(() => {
// 		if (clearFilter) {
// 			setTest('');
// 			let paramsToDelete = [];

// 			for (let param of searchParams.keys()) {
// 				if (param !== 'map') {
// 					paramsToDelete.push(param);
// 				}
// 			}

// 			paramsToDelete.forEach(param => {
// 				searchParams.delete(param);
// 			});
// 			window.history.replaceState(
// 				{},
// 				document.title,
// 				window.location.pathname + '?' + searchParams.toString(),
// 			);
		
// 			dispatch(adresFilterStringAction.clearGetParams(''));
// 		}
// 	}, [clearFilter]);

// 	useEffect(() => {
// 		const paramValue = searchParams.get(name);

// 		if (paramValue !== null) {
// 			setTest(paramValue);
// 		}
// 	}, []);

// 	return (
// 		<div className={styles.wrapper_input}>
// 			<input
// 				className={styles.input}
// 				placeholder={placeholder}
// 				type='text'
// 				value={test}
// 				onChange={onChange}
// 				style={
// 					name === 'fix_bag_247'
// 						? { width: '0px', height: '0px', margin: '0px' }
// 						: test !== ''
// 							? { borderBottom: '1px solid #26a69a' }
// 							: {}
// 				}
// 			/>
// 			{!isInputValid && (
// 				<p style={{ color: 'red' }} className={styles.error}>
// 					Пожалуйста, введите только цифры.
// 				</p>
// 			)}
// 		</div>
// 	);
// };

// export default Input;

// import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IInput } from '@/types/props.types';

import { actions as adresFilterStringAction } from '@/store/adres-filter-string/adresFilterString.slice';

import { useDebounce } from '@/hooks/useDebounce';
import styles from './Input.module.scss';

const Input: FC<IInput> = ({ placeholder, name, clearFilter }) => {
	const [test, setTest] = useState<string>('');
	const [isInputValid, setIsInputValid] = useState<boolean>(true);
	const dispatch = useDispatch();
	const {debounce} = useDebounce()

	const router = useRouter();

	const searchParams = new URLSearchParams(window.location.search);

	const updateURL = (name:any, value:any) => {

		if (value === '') {
			searchParams.delete(name);
		} else {
			searchParams.set(name, value);
		}

		router.replace('?' + searchParams.toString(), undefined, { shallow: true });
	};

	const debouncedDispatch = useCallback(debounce((newValue:any) => {
    dispatch(adresFilterStringAction.addGetParams(window.location.search));

  }, 700), []);
  
  // Используйте useEffect для вызова debouncedDispatch каждый раз при изменении inputValue
  useEffect(() => {
  // Сохраняем идентификатор таймера
  const timerId = debouncedDispatch(test);
  
    // Очистите таймер при размонтировании компонента
    return () => {
      clearTimeout(timerId);
    };
  }, [searchParams]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const isValidNumber = /^\d*$/.test(value);
		if (isValidNumber) {
			setTest(value);
			setIsInputValid(true);
			updateURL(name, value);
		} else {
			setIsInputValid(false);
		}
	};

	// useEffect(() => {
	// 	dispatch(adresFilterStringAction.addGetParams(window.location.search));
	// }, [searchParams]); //HELP: ВМЕСТО ОТСЛЕЖИВАНИЯ window.location.search Я ОТСЛЕЖИВАЮ searchParams ЧТОБЫ ПРИ КАЖДОМ ОБНОВЛЕНИИ ПАРАМЕТРОВ ДОБАВЛЯТЬ ИХ В СТЕЙТ РЕДАКСА И ТЕМ САМЫМ УСТРАНИТЬ БАГ, ГДЕ ПРИ ПЕРВОМ НАЖАТИИ НА ПОИСК В ФИЛЬТРАХ, УХОДИЛ ПУСТОЙ ЗАПРОС С ПРЕДЫДУЩЕМ ЗНАЧЕНИЕМ, Т.К. БЕЗ USELOCATION НЕ ОБНОВЛЯЛО НОРМАЛЬНО А АНАЛОГА В NEXT Я ТАК И НЕ НАШЕЛ

	

	useEffect(() => {
		if (clearFilter) {
			setTest('');
			let paramsToDelete = [];

			for (let param of searchParams.keys()) {
				if (param !== 'map') {
					paramsToDelete.push(param);
				}
			}

			paramsToDelete.forEach(param => {
				searchParams.delete(param);
			});
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname + '?' + searchParams.toString(),
			);
		
			dispatch(adresFilterStringAction.clearGetParams(''));
		}
	}, [clearFilter]);

	useEffect(() => {
		const paramValue = searchParams.get(name);

		if (paramValue !== null) {
			setTest(paramValue);
		}
	}, []);

	return (
		<div className={styles.wrapper_input}>
			<input
				className={styles.input}
				placeholder={placeholder}
				type='text'
				value={test}
				onChange={onChange}
				style={
					name === 'fix_bag_247'
						? { width: '0px', height: '0px', margin: '0px' }
						: test !== ''
							? { borderBottom: '1px solid #26a69a' }
							: {}
				}
			/>
			{!isInputValid && (
				<p style={{ color: 'red' }} className={styles.error}>
					Пожалуйста, введите только цифры.
				</p>
			)}
		</div>
	);
};

export default Input;