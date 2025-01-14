import React, { useState, useEffect, useRef } from "react";

export default function SearchCourseDropdown({
  options,
  label,
  name,
  discuss,
  prompt,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function close(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(options) {
    if (discuss) {
      return options.filter(
        (option) =>
          `${option[label]} ${option.details[0][1]}` //course code and title
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
      );
    } else {
      return options.filter(
        (option) =>
          `${option[label]} ${option[name]}`
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
      );
    }
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return value[label];
    return "";
  }

  return (
    <div>
      <div className="dropdown">
        <div className="control" onClick={() => setOpen((prev) => !prev)}>
          <div className="selected-value">
            <input
              type="text"
              ref={ref}
              placeholder={value ? value[label] : prompt}
              value={displayValue()}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(null);
              }}
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className={`arrow ${open ? "open" : null}`} />
        </div>
        <div className={`options ${open ? "open" : null}`}>
          {filter(options).map((option) => (
            <div
              key={option.id}
              className={`option ${value === option ? "selected" : null}`}
              onClick={() => {
                setQuery("");
                onChange(option);
                setOpen(false);
              }}
            >
              {discuss
                ? `${option[label]} ${option.details[0][1]}`
                : `${option[label]} ${option[name]}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
