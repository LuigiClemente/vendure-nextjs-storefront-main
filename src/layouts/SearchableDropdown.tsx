import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange
}: any) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: any) => {
    setQuery(() => "");
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: any) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options: any) => {
    if (!query.toLowerCase().includes("@")) return [];
    return options.filter(
      (option: any) => option[label].toLowerCase() == query.toLowerCase()
    );
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            onBlur={() => {
              if (query.length) {
                if (!options.filter(
                  (option: any) => option[label].toLowerCase() == query.toLowerCase()
                ).length) {
                  setError(true);
                } else {
                  setError(false);
                }
              }

            }}
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setError(false);
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option: any, index: any) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
      {error && <p style={{ color: "red" }}>Couldn't find a user with this email</p>}
    </div>
  );
};

export default SearchableDropdown;
