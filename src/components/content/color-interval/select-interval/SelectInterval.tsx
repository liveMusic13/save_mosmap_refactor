import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Select from 'react-select';
import styles from './SelectInterval.module.scss';

interface ISelectIntervalProps {
  title: string;
  dataSelect: { id: number, name: string }[];
  current_value: number | string; 
}

const SelectInterval: FC<ISelectIntervalProps> = ({ title, dataSelect, current_value }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<{ value: number, label: string } | null>(null);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
			backgroundColor: state.isSelected ? '#e0e0e0' : 'transparent',
			color: '#26a69a',
      '&:hover': {
				backgroundColor: 'rgba(0, 0, 0, .08)',
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

  const handleSelectChange = (selected: { value: number, label: string } | null) => {
    setSelectedOption(selected);
    if (selected) {
      const newQuery = { ...router.query, [title]: selected.value };
      router.replace({
        pathname: router.pathname,
        query: newQuery,
      }, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const queryValue = router.query[title];
    let selectedValue;

    if (queryValue) {
      selectedValue = Number(queryValue);
    } else {
      selectedValue = Number(current_value);
      const newQuery = { ...router.query, [title]: selectedValue };
      router.replace(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true }
      );
    }

    const selectedOption = dataSelect.find((option) => option.id === selectedValue);
    if (selectedOption) {
      setSelectedOption({ value: selectedOption.id, label: selectedOption.name });
    }
  }, [router.query, dataSelect, title, current_value]);

  return (
    <div className={styles.block__select}>
      <h2 className={styles.title}>{title}</h2>
      <Select
        className={styles.custom_select}
        classNamePrefix='custom_select'
        placeholder=''
        hideSelectedOptions={false}
        styles={customStyles}
        options={dataSelect.map(option => ({ value: option.id, label: option.name }))}
        value={selectedOption}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default SelectInterval;

