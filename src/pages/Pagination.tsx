import React, { useEffect } from "react";
import usePagination from "../pagination";
import { IPaginationProps } from "../Interfaces";

// Pagination for array of items. User can select specific page or sequentially page next/previous
const Pagination = ( {items, pageSize, setPageItems} : IPaginationProps) => {
  const { pageNumber, pageCount, pageItems, setPage, nextPage, previousPage } = usePagination(items, pageSize);  

  useEffect(() => {    
    setPageItems(pageItems);
  }, [pageNumber]);

  return (
    <div>
      <b onClick={previousPage}>&#60;</b>
      <input
        width={30}
        value={pageNumber}
        onChange={(e) => { setPage(e.target.valueAsNumber); }}
        type="number"
      /> of {pageCount}
      <b onClick={nextPage}>&#62;</b>
    </div>
  );
};

export default Pagination;