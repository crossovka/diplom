import { MutableRefObject, useEffect, useRef } from 'react'

export const useDebounceCallback = (delay = 100) => {
	const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>

	useEffect(() => clearTimeout(timerRef.current), [])

	return (callback: VoidFunction) => {
		clearTimeout(timerRef.current)
		timerRef.current = setTimeout(callback, delay)
	}
}

// TODO Или использовать import debounce from 'lodash.debounce'; как на прошлом проекте?
// EXAMPLE
// const debouncedSetSearchValue = useCallback(
// 	debounce((str) => dispatch(setSearchValue(str)), 600),[dispatch]
// );
//========================================================================================================================================================
// EXAMPLE
// import React, { useState } from 'react';
// import { useDebounceCallback } from './useDebounceCallback';

// const MyComponent = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const debouncedSearch = useDebounceCallback(500);

//   const handleSearch = () => {
//     // функция обработки поискового запроса
//   };

//   const handleChange = (event) => {
//     setSearchQuery(event.target.value);
//     debouncedSearch(handleSearch);
//   };

//   return (
//     <input
//       type="text"
//       value={searchQuery}
//       onChange={handleChange}
//       placeholder="Введите поисковый запрос"
//     />
//   );
// };