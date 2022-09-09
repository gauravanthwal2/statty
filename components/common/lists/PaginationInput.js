import React from "react";

const PaginationInput = ({ pageIndex, gotoPage }) => {
  return (
    <>
      <span>
        <label htmlFor="pages" style={{ display: "none" }}>
          Pages
        </label>{" "}
        | Go to Page:{" "}
        <input
          type="number"
          id="pages"
          aria-label="pages"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
      </span>
    </>
  );
};

export default PaginationInput;
