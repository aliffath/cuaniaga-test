export default function useDebounce() {
  let timeout;

  const debounce = (callback, delay = 300) => {
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  return { debounce };
}
