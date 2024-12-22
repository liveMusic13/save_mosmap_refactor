// import { FC, useEffect, useState } from 'react';

// import { useFuncRange } from '@/hooks/useFuncRange';
// import { useSearchParams } from 'next/navigation';
// import { HexColorPicker } from 'react-colorful';
// import styles from './Range.module.scss';

// const Range: FC<any> = ({data}) => {
// 	const searchParams = useSearchParams()
//   const [ranges, setRanges] = useState([
// 		{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' },
// 		{ min: 251, max: 500, color: 'blue' },
// 		{ min: 501, max: 750, color: 'green' },
// 	]);
// 	const [isViewColors, setIsViewColors] = useState<boolean[]>(ranges.map(el => false))
	
// 	useEffect(()=> {
// 		const sloi_fields = searchParams.get('Слой карты')
// 		const mode_list = searchParams.get('Способ раскраски')
// 		const num_fields = searchParams.get('Числовое поле')
		
// 		const check = data?.intervals?.filter((el:any) => 
// 			el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
// 		)

// 		if (check?.length > 0) {
// 			setRanges(check[0]?.values)
// 		} else {
// 			setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' },])
// 		}
// 	}, [searchParams.toString(), data])

//   const { handleAddRange, handleDeleteRange, handleMaxBlur, handleMaxChange, handleMouseDown, handleMouseMove, handleMouseUp, sliderBarRef, dragging, handleColorChange } = useFuncRange(ranges, setRanges);

// 	useEffect(()=> {
// 		console.log('ranges', ranges)
// 		setIsViewColors(ranges.map(el => false))
// 	}, [ranges])

// 	return (
// 		<div
// 			className={styles['slider-container']}
// 			onMouseMove={handleMouseMove}
// 			onMouseUp={handleMouseUp}
// 		>
// 			{/* Отображение ползунков */}
// 			<div className={styles['slider-bar']} ref={sliderBarRef}>
// 				{ranges.map((range, index) => (
// 					<div
// 						key={index}
// 						className={`${styles['slider-thumb']} ${dragging === index ? styles.dragging : ''}`}
// 						style={{ left: `${(range.max / 1000) * 100}%` }}
// 						onMouseDown={() => handleMouseDown(index)}
// 					>
// 						<span>{range.max}</span>
// 					</div>
// 				))}
// 			</div>

// 			{/* Отображение инпутов */}
// 			{ranges.map((range, index) => (
// 				<div
// 					key={index}
//           className={styles.block__values}
// 				>
//           <span>от</span>
// 					<input
// 						type='number'
// 						value={range.min}
// 						readOnly
// 					/>
//           <span>до</span>
// 					<input
// 						type='number'
// 						value={range.max}
// 						onChange={e => handleMaxChange(index, e.target.value)}
// 						onBlur={() => handleMaxBlur(index)}
// 					/> 
// 					<span>-</span>
// 					<div className={styles.block__color}>
// 						<div className={styles.color} style={{backgroundColor: range.color}} onClick={() => setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))}></div>
// 						{isViewColors[index] &&
// 							<div className={styles.block__colorPicker}>
// 							<HexColorPicker color={range.color} onChange={(newColor) => handleColorChange(index, newColor)} />
// 							<button className={styles.button__colorPicker} onClick={() => setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))}>Закрыть</button>
// 						</div>
// 						}
// 					</div>
// 					<button
// 						onClick={() => handleDeleteRange(index)}
// 						style={{ marginLeft: '5px' }}
// 					>
// 						X
// 					</button>
// 				</div>
// 			))}

// 			<button onClick={handleAddRange}>Добавить</button>
// 		</div>
// 	);
// }

// export default Range

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

  useEffect(() => {
    const sloi_fields = searchParams.get('Слой карты');
    const mode_list = searchParams.get('Способ раскраски');
    const num_fields = searchParams.get('Числовое поле');

    const check = data?.intervals?.filter((el: any) =>
      el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
    );

    if (check?.length > 0) {
      setRanges(check[0]?.values);
      setMaxValue(Math.max(...check[0]?.values.map((range: any) => range.max)));
    } else {
      setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
      setMaxValue(1000);
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
  } = useFuncRange(ranges, setRanges, maxValue, setTargetEditObject);

  useEffect(() => {
    setIsViewColors(ranges.map(el => false));
  }, [ranges.length]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={styles['slider-container']}>
      <div className={styles['slider-bar']} ref={sliderBarRef}>
        {ranges.map((range, index) => (
          <div
            key={index}
            className={`${styles['slider-thumb']} ${dragging === index ? styles.dragging : ''}`}
            style={{ left: `${(range.max / maxValue) * 100}%` }}
            onMouseDown={() => handleMouseDown(index)}
          >
            <span>{range.max}</span>
          </div>
        ))}
      </div>

      {ranges.map((range, index) => (
        <div key={index} className={styles.block__values}>
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
          <div className={styles.block__color}>
            <div
              className={styles.color}
              style={{ backgroundColor: range.color }}
              onClick={() =>
                setIsViewColors(prev => prev.map((item, idx) => (idx === index ? !item : item)))
              }
            ></div>
            {isViewColors[index] && (
              <div className={styles.block__colorPicker}>
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

      <button className={styles.button__colorPicker} onClick={handleAddRange} style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} >Добавить</button>
    </div>
  );
};

export default Range;

