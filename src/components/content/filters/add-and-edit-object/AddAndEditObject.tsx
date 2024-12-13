import { useDebounce } from '@/hooks/useDebounce';
import { useInitRequest } from '@/hooks/useInitRequest';
import { useSaveObject } from '@/hooks/useSaveObject';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { actions as dataObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { transformFieldForSelect } from '@/utils/transformFieldForSelect';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './AddAndEditObject.module.scss';

const AddAndEditObject: FC = () => {
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dataFilters = useSelector((state:RootState)=> state.dataFilters)
  const viewSettings = useSelector((state:RootState)=> state.viewSettings)
  const [formState, setFormState] = useState<any>({});
  const dispatch = useDispatch()
  const {debounce} = useDebounce()
  const { width } = useWindowDimensions();
  const {saveObject} = useSaveObject()
  const {getObject} = useInitRequest()

const debouncedDispatch = useCallback(debounce((action:any) => {
  dispatch(action);
}, 500), [dispatch]);

const handleChange = (selectedOption:any, name:string, type:string) => {
  setFormState((prevState:any) => ({...prevState, [name]: selectedOption}));
  
  // Создаем экшн в зависимости от типа поля
  const action = type === 'input'
    ? dataObjectInfoAction.updateField({ name, value: selectedOption })
    : dataObjectInfoAction.updateField({ name, value: selectedOption.label, id: selectedOption.value });

  // Вызываем debouncedDispatch с созданным экшном
  console.log('handleChange')
  debouncedDispatch(action);
};

useEffect(() => {
  if (viewSettings.editingObjects.isActiveEditButton) {
    const initialFormState:any = {};
    dataObjectInfo?.values?.forEach((field:any) => {
      if (field.el === 'input') {
        initialFormState[field.name] = field.value;
      } else {
        const filter = dataFilters.find((filter:any) => filter.name === field.name);
        if (filter) {
          const optionsAgent = transformFieldForSelect(filter.items);
          const value = optionsAgent.find((option) => option.label === field.value);
          initialFormState[field.name] = [value] || null;
        }
      }
    });
    setFormState(initialFormState);
  }
  console.log('useEffect')
}, [viewSettings.editingObjects.isActiveEditButton, dataObjectInfo?.values]);

  const customStyles = {
		option: (provided: any, state: any) => ({
      ...provided,
			'&:hover': {
        cursor: 'pointer',
      },
		}),
		control: (provided: any, state: any) => ({
			...provided,
			maxHeight: 'calc(40 / 1440 * 100vw)',
			overflow: 'auto',
			border: state.isFocused ? '1px solid #26a69a' : 'none',
			boxShadow: state.isFocused ? '0px 0px 3px #26a69a' : 'none',
			borderBottom: state.isFocused ? '1px solid #26a69a' : '1px solid #121212',
			borderRadius: '0px',
			'&:hover': {
				borderColor: '#26a69a',
				boxShadow: '0px 0px 3px #26a69a',
				cursor: 'pointer',
			},
		}),
	};

  return (
    <div className={styles.block__filters} style={{
      ...(width && width <= 767.98 ? {marginTop:'calc(142 / 1440 * 100vw)'} : {}),
      ...(viewSettings.editingObjects.isMobileEditCrd ? {zIndex: '-1'} : {})
    }}>
    
      <div className={styles.block__title}>
				<h2 className={styles.title}>{viewSettings.editingObjects.isActiveEditButton ? 'Редактирование объекта' : viewSettings.editingObjects.isActiveAddButton ? 'Добавление объекта' : ''}</h2>
        <button
					className={styles.button__save}
          onClick={()=> { 
            if (viewSettings.editingObjects.isActiveAddButton) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              saveObject()
            } else if (viewSettings.editingObjects.isActiveEditButton) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
              saveObject()
              
              const timeoutId = setTimeout(()=>getObject(), 100)
              return ()=> clearTimeout(timeoutId)
            }
            dispatch(viewSettingsAction.SetIsDotInfo(false));
          }}
				>
					<img src="/images/icons/ok.svg" alt="ok" />
				</button>
				<button
					className={styles.button__close}
          onClick={()=> {
            if (viewSettings.editingObjects.isActiveAddButton) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              dispatch(dataObjectsInMapAction.deleteNewObject(''))
            } else if (viewSettings.editingObjects.isActiveEditButton) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
            }
            dispatch(viewSettingsAction.SetIsDotInfo(false));
          }}
				>
					<span></span>
				</button>
			</div>
      { viewSettings.editingObjects.isActiveEditButton ?
        <div className={styles.wrapper_block__filters}>
        {
          dataObjectInfo?.values?.map((field:any, ind:number) => {
            if (field.el === 'input') {
              return (
                <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name || ind}>
                  <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
                  <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || field.value} onChange={(e) => handleChange(e.target.value, field.name, field.el)}/>
                </div>
              )
            } else {
              return (
                <>
                {
                  dataFilters.map((filter:any, ind:number) => {
                    if (field.name === filter.name) {
                      const optionsAgent = transformFieldForSelect(filter.items);

                      return (
                        <div className={styles.block__select} key={filter.name || ind}>
                          <h3 className={styles.title}>{filter.caption}</h3>
                          <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name, 'select')}/>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                </>
              ) 
            }
          })
        }
        <button className={styles.button__save_text} onClick={()=> {
            if (width && width <= 767.98) dispatch(viewSettingsAction.toggleSettingsMap(''))

            if (viewSettings.editingObjects.isActiveAddButton) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              saveObject()
            } else if (viewSettings.editingObjects.isActiveEditButton) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
              saveObject()
            }
            dispatch(viewSettingsAction.SetIsDotInfo(false));
          }}>Сохранить</button>
      </div> : <div className={styles.wrapper_block__filters}>
      {
          dataObjectInfo?.values?.map((field:any, ind: number) => {
            if (field.el === 'input') {
              return (
                <div className={`${styles.block__input} ${formState[field.name] && styles.has_content}`} key={field.name || ind}>
                  <label htmlFor={field.name} className={styles.input__label}>{field.label}</label>
                  <input type="text" className={styles.input__login} id={field.name} value={formState[field.name] || ''} onChange={(e) => handleChange(e.target.value, field.name, field.el)}/>
                </div>
              )
            } else {
              return (
                <>
                {
                  dataFilters.map((filter:any, ind:number) => {
                    if (field.name === filter.name) {
                      const optionsAgent = transformFieldForSelect(filter.items);
                      return (
                        <div className={styles.block__select} key={filter.name || ind}>
                          <h3 className={styles.title}>{filter.caption}</h3>
                          <Select key={field.name} styles={customStyles} options={optionsAgent} value={formState[field.name]} onChange={(value) => handleChange(value, field.name, 'select')}/>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                </>
              ) 
            }
          })
        }
        <button className={styles.button__save_text} onClick={()=> {
          if (viewSettings.isDotInfo && width && width <= 767.98) {
            dispatch(viewSettingsAction.toggleSettingsMap(''));
            dispatch(viewSettingsAction.defaultObjectInfo(''));
            dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
            saveObject()
          } else {
            if (width && width <= 767.98) dispatch(viewSettingsAction.toggleSettingsMap(''))

            if (viewSettings.editingObjects.isActiveAddButton) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              saveObject()
            } else if (viewSettings.editingObjects.isActiveEditButton) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
              saveObject()
            }
          }
          dispatch(viewSettingsAction.SetIsDotInfo(false));
          }}>Сохранить</button>
      </div>
      }
    </div>
  )
}

export default AddAndEditObject
