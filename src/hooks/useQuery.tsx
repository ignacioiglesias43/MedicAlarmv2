import {useState, useEffect} from 'react';

export function useQuery<T>(array: Array<T>) {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState(array);

  const searchFunction = (text: string) => {
    if (text) {
      setFilteredList(
        array.filter(item => {
          const itemData = item.name ? item.name.toUpperCase() : '';
          return itemData.indexOf(text.toUpperCase()) > -1;
        }),
      );
    } else {
      setFilteredList(array);
    }
    setQuery(text);
  };

  const updateQuery = (text: string) => setQuery(text);

  return {filteredList, searchFunction, query};
}
