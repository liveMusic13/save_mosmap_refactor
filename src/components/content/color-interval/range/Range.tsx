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

  // useEffect(() => {
  //   const sloi_fields = searchParams.get('Слой карты');
  //   const mode_list = searchParams.get('Способ раскраски');
  //   const num_fields = searchParams.get('Числовое поле');

  //   const check = data?.intervals?.filter((el: any) =>
  //     el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
  //   );

  //   if (check?.length > 0) {
  //     setRanges(check[0]?.values);
  //     setMaxValue(Math.max(...check[0]?.values.map((range: any) => range.max))); //HELP: здесь ставим максимальное значение для range
  //   } else {
  //     setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
  //     setMaxValue(1000); //HELP: здесь ставим максимальное значение для range
  //   }
  // }, [searchParams.toString(), data]);

  useEffect(() => {
    const sloi_fields = searchParams.get('Слой карты');
    const mode_list = searchParams.get('Способ раскраски');
    const num_fields = searchParams.get('Числовое поле');

    if (data?.intervals) {
        const check = data.intervals.filter((el: any) =>
            el && el.sloi === Number(sloi_fields) && el.type === Number(mode_list) && el.field_id === Number(num_fields)
        );

        if (check.length > 0) {
            setRanges(check[0]?.values);
            setMaxValue(Math.max(...check[0]?.values.map((range: any) => range.max))); //HELP: здесь ставим максимальное значение для range
        } else {
            setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
            setMaxValue(1000); //HELP: здесь ставим максимальное значение для range
        }
    } else {
        setRanges([{ min: 0, max: 250, color: 'rgba(0, 0, 0, .6)' }]);
        setMaxValue(1000); //HELP: здесь ставим максимальное значение для range
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
  } = useFuncRange(ranges, setRanges, maxValue, setTargetEditObject);

  useEffect(() => {
    setIsViewColors(ranges.map(el => false));
  }, [ranges.length]);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (dragging !== null && sliderBarRef.current) {
        const touch = event.touches[0]; // Берем первый палец
        const rect = sliderBarRef.current.getBoundingClientRect();
        const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
        const newValue = Math.round((percentage / 100) * maxValue);

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
      <div className={styles['slider-bar']} ref={sliderBarRef}>
        {ranges.map((range, index) => (
          <div
            key={index}
            className={`${styles['slider-thumb']} ${dragging === index ? styles.dragging : ''}`}
            style={{ left: `${(range.max / maxValue) * 100}%` }}
            onMouseDown={() => handleMouseDown(index)}
            onTouchStart={() => handleTouchStart(index)}
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

