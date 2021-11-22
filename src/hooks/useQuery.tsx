import {useState, useEffect} from 'react';

export function useQuery<T>(array: Array<T>) {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState(array);

  const searchFunction = (text: string) => {
    if (text) {
      setFilteredList(
        array.filter(item => {
          const itemData = item.user
            ? item.user.name.toUpperCase()
            : item.name
            ? item.name.toUpperCase()
            : '';
          return itemData.indexOf(text.toUpperCase()) > -1;
        }),
      );
    } else {
      setFilteredList(array);
    }
    setQuery(text);
  };

  useEffect(() => {
    console.log(array);
    setFilteredList(array);
  }, [array]);

  return {filteredList, searchFunction, query};
}
