import ButtonOptionSettings from '@/components/ui/buttons/button-option-settings/ButtonOptionSettings';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { actions as dataSettingsAction } from '@/store/data-settings/dataSettings.slice';
import { IOptionSetting } from '@/types/props.types';
import { IFields, ILists, IMaps } from '@/types/slice.types';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './OptionSetting.module.scss';

const widthConfig: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(25/1440*100vw)',
    'name': 'calc(155/1440*100vw)',
    'type_name': 'calc(90/1440*100vw)',
    'namefield': 'calc(100/1440*100vw)',
    'nameonmap': 'calc(100/1440*100vw)',
    'address': 'calc(80/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(25/1440*100vw)',
    'name': 'calc(195/1440*100vw)',
    'mode': 'calc(190/1440*100vw)',
    'visible': 'calc(190/1440*100vw)',
    'Действие': 'calc(150/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(25/1440*100vw)',
    'name': 'calc(135/1440*100vw)',
    'mode': 'calc(110/1440*100vw)',
    'icon': 'calc(80/1440*100vw)',
    'color': 'calc(80/1440*100vw)',
    'Действие': 'calc(330/1440*100vw)',
  },
};

const widthConfigTable: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(15/1440*100vw)',
    'name': 'calc(195/1440*100vw)',
    'type_name': 'calc(90/1440*100vw)',
    'namefield': 'calc(120/1440*100vw)',
    'nameonmap': 'calc(120/1440*100vw)',
    'address': 'calc(100/1440*100vw)',
    'Действие': 'calc(296/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(25/1440*100vw)',
    'name': 'calc(325/1440*100vw)',
    'mode': 'calc(190/1440*100vw)',
    'visible': 'calc(190/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(20/1440*100vw)',
    'name': 'calc(135/1440*100vw)',
    'mode': 'calc(90/1440*100vw)',
    'icon': 'calc(120/1440*100vw)',
    'color': 'calc(120/1440*100vw)',
    'Действие': 'calc(467/1440*100vw)',
  },
};

const widthConfigMobile: { [key: string]: { [key: string]: string } } = {
  'Поля': {
    '#': 'calc(85/1440*100vw)',
    'name': 'calc(125/1440*100vw)',
    'type_name': 'calc(120/1440*100vw)',
    'namefield': 'calc(220/1440*100vw)',
    'nameonmap': 'calc(220/1440*100vw)',
    'address': 'calc(120/1440*100vw)',
    'Действие': 'calc(400/1440*100vw)',
  },
  'Карта': {
    '#': 'calc(85/1440*100vw)',
    'name': 'calc(155/1440*100vw)',
    'mode': 'calc(190/1440*100vw)',
    'visible': 'calc(190/1440*100vw)',
    'Действие': 'calc(200/1440*100vw)',
  },
  'Группы объектов': {
    '#': 'calc(85/1440*100vw)',
    'name': 'calc(125/1440*100vw)',
    'mode': 'calc(210/1440*100vw)',
    'icon': 'calc(120/1440*100vw)',
    'color': 'calc(120/1440*100vw)',
    'Действие': 'calc(530/1440*100vw)',
  },
};

const fieldsToCheck: string[] = ['namefield', 'nameonmap', 'address', 'mode', 'icon', 'color', 'visible'];

const OptionSetting: FC<IOptionSetting> = ({ title, data, index, length }) => {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {width} = useWindowDimensions()
  const widthConfigAdaptive  = (width && width <= 767.98) ? widthConfigMobile : (width && (width > 767.98 && width <= 991.98)) ? widthConfigTable : widthConfig

  const isFieldsOrLists = (data: IFields | ILists | IMaps): data is IFields | ILists | IMaps => {
    return fieldsToCheck.some(field => (data as any)[field] !== undefined);
  };

  function isIFields(data: any): data is IFields {
    return data && data.type_name !== undefined;
  }

  const isCheckbox = isFieldsOrLists(data);

  const initialCheckedStates = fieldsToCheck.map(field => (data as any)[field] === 1);
  const [checkedStates, setCheckedStates] = useState<boolean[]>(initialCheckedStates);

  useEffect(()=> {
    console.log(data)
    console.log(fieldsToCheck)
    console.log(checkedStates)
  }, [checkedStates])

  useEffect(() => {
    setCheckedStates(initialCheckedStates);
  }, [data]);

  const handleCheckboxChange = (idx: number, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[idx] = e.target.checked;
    setCheckedStates(newCheckedStates);

    dispatch(dataSettingsAction.updateCheckbox({ id: data.id, field, value: e.target.checked ? 1 : 0 }))
  };

  const renderActions = (title: string): JSX.Element => {
    switch (title) {
      case 'Поля':
        return (
          <>
            <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Изменить' title='Поля' data={data} >Изменить</ButtonOptionSettings>
            <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Удалить' data={data} >Удалить</ButtonOptionSettings>
          </>
        );
      case 'Группы объектов':
        return (
          <>
            <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Настроить' data={data} >Настроить</ButtonOptionSettings>
            <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Изменить' title='Группы объектов' data={data} >Изменить</ButtonOptionSettings>
            <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Удалить' data={data} >Удалить</ButtonOptionSettings>
          </>
        );
      default:
        return <ButtonOptionSettings isMouseEnter={isMouseEnter} text='Изменить' title='Карта' data={data} >Изменить</ButtonOptionSettings>;
    }
  };

  const style = {
    gridTemplateColumns: (width && width > 767.98) ? `repeat(${length}, 1fr)` : 'undefined',
    // gridTemplateColumns: `repeat(${length}, 1fr)`,
    gridTemplateRows: (width && width <= 767.98) ? `repeat(${length}, 1fr)` : 'undefined',
    backgroundColor: isMouseEnter ? '#ededed' : index % 2 === 0 ? undefined : '#f2f2f280',
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  return (
    <div className={styles.wrapper_option} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <p className={styles.index} style={(width && width <= 767.98) ? {height: widthConfigAdaptive[title]['#']} : { minWidth: widthConfigAdaptive[title]['#'] }}>{index}</p>
      
      <p className={styles.name} style={(width && width <= 767.98) ? {height: widthConfigAdaptive[title]['name'], display: 'flex', justifyContent: 'center'} : { minWidth: widthConfigAdaptive[title]['name'] }}>{data.name}</p>

      {isIFields(data) ? <p className={styles.type_name} style={(width && width <= 767.98) ? {height: widthConfigAdaptive[title]['type_name'], display: 'flex', justifyContent: 'center'} : { minWidth: widthConfigAdaptive[title]['type_name'] }}>{data.type_name}</p> : ''}

      {isCheckbox && fieldsToCheck.map((field, idx) => (
        (data as any)[field] !== undefined && (
          <div key={idx} className={styles.block__checkbox} style={(width && width <= 767.98) ? {height: widthConfigAdaptive[title][field], display: 'flex', justifyContent: 'center'} : { minWidth: widthConfigAdaptive[title][field] }}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checkedStates[idx]}
              onChange={handleCheckboxChange(idx, field)}
              // disabled
            />
            {(field === 'mode' || field === 'address' || field === 'visible') ? (
              checkedStates[idx] ? (
                <img src="../images/icons/ok_grey.svg" alt="img" className={styles.image__checkbox} />
              ) : (
                <div className={styles.square}></div>
              )
            ) : (
              <div className={`${styles.circle} ${checkedStates[idx] ? styles.check : ''}`}></div>
            )}
          </div>
        )
      ))}
      <div className={styles.block__action} style={(width && width <= 767.98) ? {height: widthConfigAdaptive[title]['Действие'], display: 'flex', flexDirection: 'column'} : { minWidth: widthConfigAdaptive[title]['Действие'] }}>
        {renderActions(title)}
      </div>
    </div>
  );
};

export default OptionSetting;



