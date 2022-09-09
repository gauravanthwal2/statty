import React from "react";

const FilterInput = ({ globalFilter, setGlobalFilter }) => {
  const handleOnChange = (e) => setGlobalFilter(e.target.value);
  return (
    <div>
      <label htmlFor="gsearch" style={{ display: "none" }}>
        Global Search
      </label>
      <input
        className="form-control border border-1 border-secondary"
        type="text"
        id="gsearch"
        value={globalFilter || ""}
        onChange={handleOnChange}
        placeholder="Search. . ."
        style={{ width: "250px" }}
      />
    </div>
  );
};

export default FilterInput;
