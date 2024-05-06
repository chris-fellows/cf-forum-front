import React, { useState } from "react";

function usePagination(items : any, pageSize : number) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageCount = Math.ceil(items.length / pageSize);

  const setPage = (page : number) => {
    setPageNumber(page);
  };

  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  const pageItems = () => {
    const s = pageNumber * pageSize;
    const e = s + pageSize;
    return items.slice(s, e);
  };

  return {
    pageNumber,
    pageCount,
    pageItems,
    setPage,    
    nextPage,
    previousPage,
  };
}

export default usePagination;