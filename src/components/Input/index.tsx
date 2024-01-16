import VirtualizedList from '../VirtualizedList';
import useInputState from './useInputState';

const Input = () => {
  const {
    value,
    setValue,
    showSuggestions,
    setShowSuggestions,
    selectedPerson,
    setSelectedPerson,
    highlightedIndex,
    inputRef,
    filteredData,
    appendPerson,
    handleKeyDown,
  } = useInputState();

  return (
    <>
      <div className="flex border border-gray-300 flex-wrap relative m-16">
        {selectedPerson.map((person, index) => (
          <div
            key={index}
            className={
              'flex gap-6 items-center justify-center px-2 py-1 rounded-full border border-gray-300 bg-gray-200 m-2' +
              (index === highlightedIndex ? 'border border-red-500' : '')
            }
          >
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={person?.thumbnail}
              alt="thumbnail"
            />
            <span key={index}>{person?.email}</span>
            <button
              className="mr-2 font-semibold"
              onClick={() =>
                setSelectedPerson(selectedPerson.filter((_, i) => i !== index))
              }
            >
              X
            </button>
          </div>
        ))}
        <div className="flex-1">
          <input
            ref={inputRef}
            className="w-full h-full px-2 py-1 rounded-full border-none outline-none min-h-16"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={handleKeyDown}
          />
          {showSuggestions && (
            <ul className="absolute shadow-xl">
              <VirtualizedList
                items={filteredData}
                renderItem={(item, index) => (
                  <li
                    className="flex items-center min-w-72 hover:bg-gray-200"
                    key={index}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      appendPerson(item);
                      if (inputRef.current) {
                        inputRef.current.blur();
                      }
                    }}
                  >
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={item?.thumbnail}
                      alt="thumbnail"
                    />
                    <div>
                      <div className="font-bold">{item?.name}</div>
                      <div>{item?.email}</div>
                    </div>
                  </li>
                )}
                itemHeight={50}
                containerHeight={400}
              />
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
