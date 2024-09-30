import { FC, useEffect, useRef, useState } from 'react';
import styles from './SelectImportExport.module.scss';

// const SelectImportExport: FC<{data:string[], targetOption?: string, setTargetOption?: any}> = ({data, targetOption, setTargetOption}) => {
//   const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
//   const [hoveredOption, setHoveredOption] = useState<string | null>(null);
//   // const [targetOption, setTargetOption] = useState<string>('')


//   const handleClick = (option:any) => () => {
//     // setFormState((prev: any) => ({...prev, ['tiles_id']: option.id}))
//     // setData((prev:string) => ([...prev, option]))
//     setTargetOption(option)
//     setIsViewOptions(false)
//   }

//   const handleMouseEnter = (option: any) => () => {
//     setHoveredOption(option);
//   }

//   const handleMouseLeave = () => {
//     setHoveredOption(null);
//   }

//   return (
//     <div className={styles.wrapper_selectData} onClick={()=> setIsViewOptions(!isViewOptions)}>
//       <div className={styles.block__selectData}>
//         <p>{targetOption}</p>
//         <img src="/images/icons/arrow.svg" alt="arrow" />
//       </div>
//       {
//         isViewOptions && (
//           <div className={styles.block__options}>
//             {
//               data.map((option:string) => (
//                 <p 
//                   key={option} 
//                   // className={formState[option] === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option} 
//                   className={targetOption === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option} 
//                   onClick={handleClick(option)}
//                   onMouseEnter={handleMouseEnter(option)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {option}
//                 </p>
//               ))
//             }
//           </div>
//         )
//       }
//     </div>
//   )
// }

const SelectImportExport: FC<{ data: string[], targetOption?: string, setTargetOption?: any }> = ({ data, targetOption, setTargetOption }) => {
  const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleClick = (option: string) => () => {
    setTargetOption(option);
    setIsViewOptions(false);
  };

  const handleMouseEnter = (option: string) => () => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // Эффект для обработки кликов вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsViewOptions(false); // Закрываем список опций при клике вне компонента
      }
    };

    // Добавляем слушатель клика на документ
    document.addEventListener('mousedown', handleClickOutside);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper_selectData} onClick={() => setIsViewOptions(!isViewOptions)} ref={wrapperRef}>
      <div className={styles.block__selectData}>
        <p>{targetOption}</p>
        <img src="/images/icons/arrow.svg" alt="arrow" />
      </div>
      {isViewOptions && (
        <div className={styles.block__options}>
          {data.map((option: string) => (
            <p
              key={option}
              className={targetOption === option ? `${styles.option} ${styles.active}` : hoveredOption === option ? `${styles.option} ${styles.target}` : styles.option}
              onClick={handleClick(option)}
              onMouseEnter={handleMouseEnter(option)}
              onMouseLeave={handleMouseLeave}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};


export default SelectImportExport