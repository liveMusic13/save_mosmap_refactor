import { Dispatch, SetStateAction, useRef, useState } from "react";

// export const useFuncRange = (
//   ranges: any,
//   setRanges: Dispatch<SetStateAction<any>>,
//   maxValue: number,
//   minValue: number,
//   setTargetEditObject: Dispatch<SetStateAction<any>>
// ) => {
//   const [dragging, setDragging] = useState<number | null>(null);
//   const sliderBarRef = useRef<HTMLDivElement | null>(null);

//   const handleMouseDown = (index: number) => {
//     setDragging(index);
//   };

//   const handleTouchStart = (index: number) => {
//     setDragging(index);
//   };

//   const handleMouseMove = (event: MouseEvent) => {
//     if (dragging !== null && sliderBarRef.current) {
//       const rect = sliderBarRef.current.getBoundingClientRect();
//       const newValue = Math.round(
//         ((event.clientX - rect.left) / rect.width) * (maxValue - minValue) + minValue
//       );

//       handleSliderChange(dragging, newValue);
//     }
//   };

//   const handleMouseUp = () => {
//     setDragging(null);
//   };

//   const handleSliderChange = (index: number, newValue: number) => {
//     const updatedRanges = [...ranges];
//     const clampedValue = Math.max(
//       updatedRanges[index].min,
//       Math.min(newValue, updatedRanges[index + 1]?.max || maxValue)
//     );

//     updatedRanges[index].max = clampedValue;

//     // Установка минимального значения для следующего диапазона
//     if (index < ranges.length - 1) {
//       updatedRanges[index + 1].min = clampedValue + 1;
//     }

//     setRanges(updatedRanges);
//     setTargetEditObject(updatedRanges);
//   };

//   const handleAddRange = () => {
//     const lastRange = ranges[ranges.length - 1];
//     const newMin = lastRange.max + 1;
//     setRanges([...ranges, { min: newMin, max: newMin + 1, color: '#00000099' }]);
//     setTargetEditObject([...ranges, { min: newMin, max: newMin + 1, color: '#00000099' }]);
//   };

//   const handleDeleteRange = (index: number) => {
//     const updatedRanges = [...ranges];
//     updatedRanges.splice(index, 1);

//     if (index === 0 && updatedRanges.length > 0) {
//       updatedRanges[0].min = minValue;
//     }

//     if (index > 0 && index < updatedRanges.length) {
//       updatedRanges[index].min = updatedRanges[index - 1].max + 1;
//     }

//     setRanges(updatedRanges);
//     setTargetEditObject(updatedRanges);
//   };

//   const handleMaxChange = (index: number, value: string) => {
//     const updatedRanges = [...ranges];
//     updatedRanges[index].max = Number(value);
//     setRanges(updatedRanges);
//     setTargetEditObject(updatedRanges);
//   };

//   const handleMaxBlur = (index: number) => {
//     const updatedRanges = [...ranges];
//     const clampedValue = Math.max(
//       minValue, // Учитываем минимальное значение, которое может быть отрицательным
//       Math.min(updatedRanges[index].max, updatedRanges[index + 1]?.max || maxValue)
//     );

//     updatedRanges[index].max = clampedValue;

//     if (index < ranges.length - 1) {
//       updatedRanges[index + 1].min = clampedValue + 1;
//     }

//     setRanges(updatedRanges);
//     setTargetEditObject(updatedRanges);
//   };

//   const handleColorChange = (index: number, newColor: string) => {
//     setRanges((prev: any) =>
//       prev.map((range: any, idx: number) =>
//         idx === index ? { ...range, color: newColor } : range
//       )
//     );
//     setTargetEditObject(ranges);
//   };

//   return {
//     handleMaxBlur,
//     handleMaxChange,
//     handleDeleteRange,
//     handleAddRange,
//     handleMouseUp,
//     handleMouseMove,
//     handleMouseDown,
//     sliderBarRef,
//     dragging,
//     handleColorChange,
//     handleTouchStart,
//     setDragging,
//     handleSliderChange,
//   };
// };

export const useFuncRange = (
  ranges: any,
  setRanges: Dispatch<SetStateAction<any>>,
  maxValue: number,
  minValue: number,
  setTargetEditObject: Dispatch<SetStateAction<any>>
) => {
  const [dragging, setDragging] = useState<number | null>(null);
  const sliderBarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (index: number) => setDragging(index);
  const handleTouchStart = (index: number) => setDragging(index);

  const handleMouseMove = (event: MouseEvent) => {
    if (dragging !== null && sliderBarRef.current) {
      const rect = sliderBarRef.current.getBoundingClientRect();
      const newValue = Math.round(
        Math.max(
          minValue,
          Math.min(maxValue, ((event.clientX - rect.left) / rect.width) * (maxValue - minValue) + minValue)
        )
      );
      handleSliderChange(dragging, newValue);
    }
  };
  
  const handleMouseUp = () => setDragging(null);

  const handleSliderChange = (index: number, newValue: number) => {
    const updatedRanges = [...ranges];
    updatedRanges[index].max = newValue;

    if (index < ranges.length - 1) updatedRanges[index + 1].min = newValue;

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };

  const handleMaxBlur = (index: number) => {
    const updatedRanges = [...ranges];
    const clampedValue = Math.max(minValue, Math.min(updatedRanges[index].max, maxValue));
    updatedRanges[index].max = clampedValue;

    if (index < ranges.length - 1) updatedRanges[index + 1].min = clampedValue;

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };

  const handleMaxChange = (index: number, value: string) => {
    const updatedRanges = [...ranges];
    updatedRanges[index].max = Number(value);
    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };

  const handleAddRange = () => {
    const lastRange = ranges[ranges.length - 1];
    const newMin = lastRange.max;
    setRanges([...ranges, { min: newMin, max: maxValue, color: '#00000099' }]);
    setTargetEditObject([...ranges, { min: newMin, max: maxValue, color: '#00000099' }]);
  };

  const handleDeleteRange = (index: number) => {
    const updatedRanges = [...ranges];
    updatedRanges.splice(index, 1);

    if (index === 0 && updatedRanges.length > 0) {
      updatedRanges[0].min = minValue;
    }

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };

  const handleColorChange = (index: number, newColor: string) => {
    setRanges((prev:any) => prev.map((range:any, idx:any) => (idx === index ? { ...range, color: newColor } : range)));
    setTargetEditObject(ranges);
  };

  // const handleMinInputChange = (index: number, value: string) => {
  //   const newMin = Number(value);
  
  //   const updatedRanges = [...ranges];
  //   updatedRanges[index].min = Math.max(minValue, Math.min(newMin, updatedRanges[index].max)); // Обеспечиваем корректный диапазон
  
  //   if (index > 0) {
  //     updatedRanges[index - 1].max = updatedRanges[index].min; // Корректируем соседние диапазоны
  //   }
  
  //   setRanges(updatedRanges);
  //   setTargetEditObject(updatedRanges);
  // };
  
  // const handleMaxInputChange = (index: number, value: string) => {
  //   const newMax = Number(value);
  
  //   const updatedRanges = [...ranges];
  //   updatedRanges[index].max = Math.max(updatedRanges[index].min, Math.min(newMax, maxValue)); // Обеспечиваем корректный диапазон
  
  //   if (index < ranges.length - 1) {
  //     updatedRanges[index + 1].min = updatedRanges[index].max; // Корректируем соседние диапазоны
  //   }
  
  //   setRanges(updatedRanges);
  //   setTargetEditObject(updatedRanges);
  // };

  const handleMinInputChange = (index: number, value: string) => {
    const newMin = parseFloat(value.replace(',', '.')); // Заменяем запятую на точку
  
    const updatedRanges = [...ranges];
    updatedRanges[index].min = Math.max(minValue, Math.min(newMin, updatedRanges[index].max)); // Корректный диапазон
  
    if (index > 0) {
      updatedRanges[index - 1].max = updatedRanges[index].min; // Корректируем соседние диапазоны
    }
  
    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };
  
  const handleMaxInputChange = (index: number, value: string) => {
    const newMax = parseFloat(value.replace(',', '.')); // Заменяем запятую на точку
  
    const updatedRanges = [...ranges];
    updatedRanges[index].max = Math.max(updatedRanges[index].min, Math.min(newMax, maxValue)); // Корректный диапазон
  
    if (index < ranges.length - 1) {
      updatedRanges[index + 1].min = updatedRanges[index].max; // Корректируем соседние диапазоны
    }
  
    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges);
  };
  

  return {
    handleMaxBlur,
    handleMaxChange,
    handleDeleteRange,
    handleAddRange,
    handleMouseUp,
    handleMouseMove,
    handleMouseDown,
    sliderBarRef,
    dragging,
    handleColorChange,
    handleTouchStart,
    setDragging,
    handleSliderChange,
    handleMinInputChange,
    handleMaxInputChange
  };
};

