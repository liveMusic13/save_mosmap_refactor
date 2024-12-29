// import { useFuncRange } from '@/hooks/useFuncRange';
// import { useSearchParams } from 'next/navigation';
// import { FC, useEffect, useState } from 'react';
// import { HexColorPicker } from 'react-colorful';
// import styles from './Range.module.scss';

// const Range: FC<any> = ({ data, setTargetEditObject }) => {
//   const searchParams = useSearchParams();
//   const [ranges, setRanges] = useState([
//     { min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' },
//     { min: 251, max: 500, color: 'blue' },
//     { min: 501, max: 750, color: 'green' },
//   ]);
//   console.log('ranges: ', ranges)
//   const [isViewColors, setIsViewColors] = useState<boolean[]>(ranges.map(el => false));
//   const [maxValue, setMaxValue] = useState<number>(1000);
//   const [minValue, setMinValue] = useState<number>(0);

//   useEffect(() => {
//     const sloi_fields = searchParams.get('Слой карты');
//     const mode_list = searchParams.get('Способ раскраски');
//     const num_fields = searchParams.get('Числовое поле');

//     if (data?.intervals) {
//         const check = data.intervals.filter((el: any) =>
//             el && el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
//         );

//         if (check.length > 0) {
//             if (check[0]?.values) {
//               setRanges(check[0]?.values);
//             } else {
//               setRanges([{ min: 0, max: 2, color: 'rgba(0, 0, 0, .6)' }]);
//             }
//             setMaxValue(check[0]?.max_value); // Установка max_value из данных
//             setMinValue(check[0]?.min_value); // Установка min_value из данных
//         } else {
//             setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
//             setMaxValue(1000); 
//             setMinValue(0); // Установка значений по умолчанию
//         }
//     } else {
//         setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
//         setMaxValue(1000); 
//         setMinValue(0); // Установка значений по умолчанию
//     }
// }, [searchParams.toString(), data]);


//   const {
//     handleAddRange,
//     handleDeleteRange,
//     handleMaxBlur,
//     handleMaxChange,
//     handleMouseDown,
//     handleMouseMove,
//     handleMouseUp,
//     sliderBarRef,
//     dragging,
//     handleColorChange,
//     handleTouchStart,
//     setDragging,
//     handleSliderChange
//   } = useFuncRange(ranges, setRanges, maxValue, minValue, setTargetEditObject);

//   useEffect(() => {
//     setIsViewColors(ranges.map(el => false));
//   }, [ranges.length]);

//   useEffect(() => {
//     const handleTouchMove = (event: TouchEvent) => {
//       if (dragging !== null && sliderBarRef.current) {
//         const touch = event.touches[0]; // Берем первый палец
//         const rect = sliderBarRef.current.getBoundingClientRect();
//         const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
//         const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);

//         handleSliderChange(dragging, newValue);
//       }
//     };

//     const handleTouchEnd = () => {
//       setDragging(null);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);
//     window.addEventListener('touchmove', handleTouchMove);
//     window.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [handleMouseMove, handleMouseUp, dragging]);


//   return (
//     <div className={styles['slider-container']}>
//       <div className={styles['slider-bar']} ref={sliderBarRef}>
//         {ranges.map((range, index) => (
//           <div
//             key={index}
//             className={`${styles['slider-thumb']} ${dragging === index ? styles.dragging : ''}`}
//             style={{ left: `${((range.max - minValue) / (maxValue - minValue)) * 100}%` }}
//             onMouseDown={() => handleMouseDown(index)}
//             onTouchStart={() => handleTouchStart(index)}
//             >
//             <span>{range.max}</span>
//           </div>
//         ))}
//       </div>

//       {ranges.map((range, index) => (
//         <div key={index} className={styles.block__values}>
//           <span>от</span>
//           <input type="number" value={range.min} readOnly />
//           <span>до</span>
//           <input
//             type="number"
//             value={range.max}
//             onChange={e => handleMaxChange(index, e.target.value)}
//             onBlur={() => handleMaxBlur(index)}
//           />
//           <span>-</span>
//           <div className={styles.block__color}>
//             <div
//               className={styles.color}
//               style={{ backgroundColor: range.color }}
//               onClick={() =>
//                 setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))
//               }
//             ></div>
//             {isViewColors[index] && (
//               <div className={styles.block__colorPicker}>
//                 <HexColorPicker
//                   color={range.color}
//                   onChange={newColor => handleColorChange(index, newColor)}
//                 />
//                 <button
//                   className={styles.button__colorPicker}
//                   onClick={() =>
//                     setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))
//                   }
//                 >
//                   Закрыть
//                 </button>
//               </div>
//             )}
//           </div>
//           <button onClick={() => handleDeleteRange(index)} style={{ marginLeft: '5px' }} className={styles.button__delete}>
//             X
//           </button>
//         </div>
//       ))}

//       <button className={styles.button__colorPicker} onClick={handleAddRange} style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} >Добавить</button>
//     </div>
//   );
// };

// export default Range;

import { useFuncRange } from '@/hooks/useFuncRange';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './Range.module.scss';

const Range: FC<any> = ({ data, setTargetEditObject }) => {
  const searchParams = useSearchParams();
  const [ranges, setRanges] = useState([
    { min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' },
    { min: 251, max: 500, color: 'blue' },
    { min: 501, max: 750, color: 'green' },
  ]);
  const [isViewColors, setIsViewColors] = useState<boolean[]>(ranges.map(el => false));
  const [maxValue, setMaxValue] = useState<number>(1000);
  const [minValue, setMinValue] = useState<number>(0);
  const [fieldVisible, setFieldVisible] = useState<boolean>(true);
  const [intervalVisible, setIntervalVisible] = useState<boolean>(true);

  useEffect(() => {
    const sloi_fields = searchParams.get('Слой карты');
    const mode_list = searchParams.get('Способ раскраски');
    const num_fields = searchParams.get('Числовое поле');

    if (data?.intervals) {
        const check = data.intervals.filter((el: any) =>
            el && el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
        );

        if (check.length > 0) {
            if (check[0]?.values) {
              setRanges(check[0]?.values);
            } else {
              setRanges([{ min: 0, max: 2, color: 'rgba(0, 0, 0, .6)' }]);
            }
            setMaxValue(check[0]?.max_value); // Установка max_value из данных
            setMinValue(check[0]?.min_value); // Установка min_value из данных

            // // Установка значений для видимости полей
            // const mode = data.mode_list.find((mode: any) => mode.id === Number(mode_list));
            // setFieldVisible(mode?.field_visible === 1);
            // setIntervalVisible(mode?.interval_visible === 1);
        } else {
            setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
            setMaxValue(1000); 
            setMinValue(0); // Установка значений по умолчанию

            // // Установка значений для видимости полей
            // const mode = data.mode_list.find((mode: any) => mode.id === Number(mode_list));
            // setFieldVisible(mode?.field_visible === 1);
            // setIntervalVisible(mode?.interval_visible === 1);
        }
        const convertValue = Number(mode_list) === 1;
        if (convertValue) {
            setFieldVisible(false);
        } else {
            const mode = data.mode_list.find((mode: any) => mode.id === Number(mode_list));
            setFieldVisible(mode?.field_visible === 1);
            setIntervalVisible(mode?.interval_visible === 1);
        }

    } else {
        setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
        setMaxValue(1000); 
        setMinValue(0); // Установка значений по умолчанию
    }
}, [searchParams.toString(), data]);


  const {
    handleAddRange,
    handleDeleteRange,
    handleMaxBlur,
    handleMaxChange,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    sliderBarRef,
    dragging,
    handleColorChange,
    handleTouchStart,
    setDragging,
    handleSliderChange
  } = useFuncRange(ranges, setRanges, maxValue, minValue, setTargetEditObject);

  useEffect(() => {
    setIsViewColors(ranges.map(el => false));
  }, [ranges.length]);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (dragging !== null && sliderBarRef.current) {
        const touch = event.touches[0]; // Берем первый палец
        const rect = sliderBarRef.current.getBoundingClientRect();
        const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
        const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);

        handleSliderChange(dragging, newValue);
      }
    };

    const handleTouchEnd = () => {
      setDragging(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, dragging]);

  return (
    <div className={styles['slider-container']}>
      {intervalVisible && (
        <div className={styles['slider-bar']} ref={sliderBarRef}>
          {ranges.map((range, index) => (
            <div
              key={index}
              className={`${styles['slider-thumb']} ${dragging === index ? styles.dragging : ''}`}
              style={{ left: `${((range.max - minValue) / (maxValue - minValue)) * 100}%` }}
              onMouseDown={() => handleMouseDown(index)}
              onTouchStart={() => handleTouchStart(index)}
            >
              <span>{range.max}</span>
            </div>
          ))}
        </div>
      )}

      {ranges.map((range, index) => (
        <div key={index} className={styles.block__values}>
          {fieldVisible && (
            <>
              <span>от</span>
              <input type="number" value={range.min} readOnly />
              <span>до</span>
              <input
                type="number"
                value={range.max}
                onChange={e => handleMaxChange(index, e.target.value)}
                onBlur={() => handleMaxBlur(index)}
              />
              <span>-</span>
            </>
          )}
          <div className={styles.block__color}>
            <div
              className={styles.color}
              style={{ backgroundColor: range.color }}
              onClick={() =>
                setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))
              }
            ></div>
            {isViewColors[index] && (
              <div className={`${styles.block__colorPicker} ${!fieldVisible ? styles.move__colorPicker : ''}`}>
                <HexColorPicker
                  color={range.color}
                  onChange={newColor => handleColorChange(index, newColor)}
                />
                <button
                  className={styles.button__colorPicker}
                  onClick={() =>
                    setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))
                  }
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
          <button onClick={() => handleDeleteRange(index)} style={{ marginLeft: '5px' }} className={styles.button__delete}>
            X
          </button>
        </div>
      ))}

      <button className={styles.button__colorPicker} onClick={handleAddRange} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>Добавить</button>
    </div>
  );
};

export default Range;
