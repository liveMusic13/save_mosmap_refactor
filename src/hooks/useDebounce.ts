import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useDebounce = () => {
  const debounce = (func:any, wait:number) => {
    let timeout:any;
  
    return function executedFunction(...args:any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      return timeout = setTimeout(later, wait);
    };
  };

  const dispatch = useDispatch();

  // Создаем debounced версию dispatch функции
  const debouncedDispatch = useCallback(debounce((action:any) => {
    dispatch(action);
  }, 500), [dispatch, debounce]);
  
  return {debounce, debouncedDispatch}
}