export function debounceCustom(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}