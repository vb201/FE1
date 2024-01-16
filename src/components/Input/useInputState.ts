import { useState, useRef } from 'react';
import { Item } from '../../types';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names],
};

const generateData = () => {
const names = new Set<string>();

  while (names.size < 500) {
    names.add(
      `${uniqueNamesGenerator(config)} ${uniqueNamesGenerator(config)}`
    );
  }

  return Array.from(names, (name: string, index: number) => {
    const [firstName, lastName] = name.split(' ');

    return {
      userId: `user${index + 1}`,
      name: name,
      email: `${lastName}.${firstName}@gmail.com`.toLowerCase(),
      thumbnail: `https://robohash.org/user${index + 1}?set=set3`,
    };
  });
};


const useInputState = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState(generateData());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredData = data.filter(
    (item) =>
      (item.email.includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())) &&
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
