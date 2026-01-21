
import { useEffect, useState } from 'react';
import type { PaginationTypeInterface } from '../../types/pagination-types';
import { Pagination, PaginationList, PaginationNext, PaginationPage, PaginationPrevious } from '../pagination';
import { selectNumPagesStypes } from './contanst/styles';



const PaginationComponent = ( {
  offset,
  limit,
  total,
  next,
  previous,
  setLimit,
  showPaginationList = false,
  moveByPagination
} : PaginationTypeInterface) => {
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    setTotalPages( Math.ceil( total / limit ) );
  }, [total, limit]);

  return (
    <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-sm text-zinc-500'>
        Total: <span className='font-medium'>{total}</span>
      </p>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500">Mostrar</span>

        <select 
          className={selectNumPagesStypes}
          value={limit}
          onChange={(e) => setLimit( Number(e.target.value) )}
        >
          { [10, 25, 50, 100].map( ( num ) => (
            <option key={num} value={num}>
              { num } per page
            </option>
          ) ) }
        </select>
        
        <Pagination>
          <PaginationPrevious onClick={previous} disabled={offset === 0}/>
          {showPaginationList && (
            <PaginationList>
              {totalPages > 0 &&
                [...Array(totalPages)].map((_, index) => (
                  <PaginationPage
                    key={index}
                    current={offset / limit === index}
                    onClick={() => moveByPagination && moveByPagination(index)}
                  >
                    {index + 1}
                  </PaginationPage>
                ))
              }
            
            </PaginationList>
          )}

          {!showPaginationList && (
            <span className='text-sm text-zinc-500 flex items-center'>
              Page { Math.floor( offset / limit ) + 1 } of { totalPages }
            </span>
          )}
          <PaginationNext onClick={next} disabled={offset + limit >= total} />
        </Pagination>
      </div>
    </div>
  );
}

export default PaginationComponent;