import {useState, useEffect} from 'react';

// TODO TERMINAR HOOK

export function useQuery<T>(array: Array<T>) {
  const [query, setQuery] = useState('');
  const updateQuery = (text: string) => setQuery(text);
}
