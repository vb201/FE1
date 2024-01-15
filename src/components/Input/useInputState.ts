import { useState, useRef } from 'react';
import { Item } from '../../types';

const generateData = () =>
  Array.from({ length: 500 }, (_, i) => ({
    userId: `user${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    thumbnail: `https://robohash.org/user${i + 1}?set=set3`,
  }));

const useInputState = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState(generateData());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredData = data.filter(
    (item) =>
      item.email.includes(value) &&
      !selectedPerson.find((person) => person.userId === item.userId)
  );

  const appendPerson = (person: Item) => {
    setSelectedPerson([...selectedPerson, person]);
    setShowSuggestions(false);
    setHighlightedIndex(null);
    setValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 8 && value === '') {
      if (highlightedIndex !== null) {
        setSelectedPerson(
          selectedPerson.filter((_, index) => index !== highlightedIndex)
        );
        setHighlightedIndex(null);
      } else setHighlightedIndex(selectedPerson.length - 1);
    }
  };

  return {
    value,
    setValue,
    data,
    setData,
    showSuggestions,
    setShowSuggestions,
    selectedPerson,
    setSelectedPerson,
    highlightedIndex,
    setHighlightedIndex,
    inputRef,
    filteredData,
    appendPerson,
    handleKeyDown,
  };
};

export default useInputState;
