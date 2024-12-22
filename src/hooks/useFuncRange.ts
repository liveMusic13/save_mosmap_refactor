import { Dispatch, SetStateAction, useRef, useState } from "react";

// export const useFuncRange = (ranges:any, setRanges:Dispatch<SetStateAction<any>>) => {
//   const [dragging, setDragging] = useState<number | null>(null); // Индекс активного ползунка
//   const sliderBarRef = useRef<HTMLDivElement | null>(null)

//   const handleMouseDown = (index:number) => {
// 		setDragging(index);
// 	};

//   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (dragging !== null && sliderBarRef.current) {
//       const rect = sliderBarRef.current.getBoundingClientRect();
//       const newValue = Math.round(
//         ((event.clientX - rect.left) / rect.width) * 1000
//       );
  
//       handleSliderChange(dragging, newValue);
//     }
//   };
  
// 	const handleMouseUp = () => {
// 		setDragging(null);
// 	};

// 	const handleSliderChange = (index:number, newValue:number) => {
// 		const updatedRanges = [...ranges];
// 		const clampedValue = Math.max(
// 			updatedRanges[index].min,
// 			Math.min(newValue, updatedRanges[index + 1]?.max || 1000)
// 		);
// 		updatedRanges[index].max = clampedValue;

// 		if (index < ranges.length - 1) {
// 			updatedRanges[index + 1].min = clampedValue + 1;
// 		}

// 		setRanges(updatedRanges);
// 	};

// 	const handleAddRange = () => {
// 		const lastRange = ranges[ranges.length - 1];
// 		const newMin = lastRange.max + 1;
// 		setRanges([...ranges, { min: newMin, max: newMin + 1, color: 'rgba(0, 0, 0, .6)' }]);
// 	};

// 	const handleDeleteRange = (index:number) => {
// 		const updatedRanges = [...ranges];
// 		updatedRanges.splice(index, 1);

// 		// Если удалена первая группа, обновляем минимальное значение новой первой группы на 0
// 		if (index === 0 && updatedRanges.length > 0) {
// 			updatedRanges[0].min = 0;
// 		}

// 		// Синхронизируем минимальное значение новой группы с максимальным предыдущей
// 		if (index > 0 && index < updatedRanges.length) {
// 			updatedRanges[index].min = updatedRanges[index - 1].max + 1;
// 		}

// 		setRanges(updatedRanges);
// 	};

// 	// Функция для обработки ручного ввода максимального значения
// 	const handleMaxChange = (index:number, value:string) => {
// 		const updatedRanges = [...ranges];
// 		updatedRanges[index].max = Number(value);
// 		setRanges(updatedRanges);
// 	};

// 	// Проверка на корректность введенного значения (при уходе из инпута)
// 	const handleMaxBlur = (index:number) => {
// 		const updatedRanges = [...ranges];
// 		const clampedValue = Math.max(
// 			updatedRanges[index].min,
// 			Math.min(updatedRanges[index].max, updatedRanges[index + 1]?.max || 1000)
// 		);
// 		updatedRanges[index].max = clampedValue;

// 		if (index < ranges.length - 1) {
// 			updatedRanges[index + 1].min = clampedValue + 1;
// 		}

// 		setRanges(updatedRanges);
// 	};

// 	const handleColorChange = (index: number, newColor: string) => {
//     setRanges((prev:any) =>
//       prev.map((range:any, idx:number) =>
//         idx === index ? { ...range, color: newColor } : range
//       )
//     );
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
// 		handleColorChange
//   }
// }



export const useFuncRange = (ranges: any, setRanges: Dispatch<SetStateAction<any>>, maxValue: number, setTargetEditObject: Dispatch<SetStateAction<any>>) => {
  const [dragging, setDragging] = useState<number | null>(null);
  const sliderBarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (index: number) => {
    setDragging(index);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (dragging !== null && sliderBarRef.current) {
      const rect = sliderBarRef.current.getBoundingClientRect();
      const newValue = Math.round(
        ((event.clientX - rect.left) / rect.width) * maxValue
      );

      handleSliderChange(dragging, newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleSliderChange = (index: number, newValue: number) => {
    const updatedRanges = [...ranges];
    const clampedValue = Math.max(
      updatedRanges[index].min,
      Math.min(newValue, updatedRanges[index + 1]?.max || maxValue)
    );
    updatedRanges[index].max = clampedValue;

    if (index < ranges.length - 1) {
      updatedRanges[index + 1].min = clampedValue + 1;
    }

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges)
  };

  const handleAddRange = () => {
    const lastRange = ranges[ranges.length - 1];
    const newMin = lastRange.max + 1;
    setRanges([...ranges, { min: newMin, max: newMin + 1, color: 'rgba(0, 0, 0, .6)' }]);
    setTargetEditObject({ min: newMin, max: newMin + 1, color: 'rgba(0, 0, 0, .6)' })
  };

  const handleDeleteRange = (index: number) => {
    const updatedRanges = [...ranges];
    updatedRanges.splice(index, 1);

    if (index === 0 && updatedRanges.length > 0) {
      updatedRanges[0].min = 0;
    }

    if (index > 0 && index < updatedRanges.length) {
      updatedRanges[index].min = updatedRanges[index - 1].max + 1;
    }

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges)
  };

  const handleMaxChange = (index: number, value: string) => {
    const updatedRanges = [...ranges];
    updatedRanges[index].max = Number(value);
    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges)
  };

  const handleMaxBlur = (index: number) => {
    const updatedRanges = [...ranges];
    const clampedValue = Math.max(
      updatedRanges[index].min,
      Math.min(updatedRanges[index].max, updatedRanges[index + 1]?.max || maxValue)
    );
    updatedRanges[index].max = clampedValue;

    if (index < ranges.length - 1) {
      updatedRanges[index + 1].min = clampedValue + 1;
    }

    setRanges(updatedRanges);
    setTargetEditObject(updatedRanges)
  };

  const handleColorChange = (index: number, newColor: string) => {
    setRanges((prev: any) =>
      prev.map((range: any, idx: number) =>
        idx === index ? { ...range, color: newColor } : range
      )
    );
    setTargetEditObject(ranges)
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
    handleColorChange
  };
};

