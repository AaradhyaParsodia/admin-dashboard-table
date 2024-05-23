import className from 'classname'
function range(start, end) {
    return [...Array(end - start).keys()].map((element) => element + start);
}

function PaginationItem({ page, currentPage, onPageChange, isDisabled  }) {
    const liClasses = className({
        "page-item": true,
        active: page === currentPage,
        disabled: isDisabled,
    });
    return (
        <li className={liClasses} onClick={() => onPageChange(page)}>
            <span className='page-link'>{page}</span>
        </li>
    )
}

export default function Pagination({ currentPage, total, limit, onPageChange }) {
    if (!total || !limit) {
        return null;
    }
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount+1);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pages.length;
    // console.log(pages);
    return <div>
        <ul>
            <PaginationItem
                page='First'
                currentPage={currentPage}
                onPageChange={()=> onPageChange(1)}
                isDisabled={isFirstPage}
            />
            <PaginationItem
                page='Prev'
                currentPage={currentPage}
                onPageChange={()=> onPageChange(currentPage - 1)}
                isDisabled={isFirstPage}
            />
            {pages.map((page) => {
                <PaginationItem
                    page={page}
                    key={page}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            })}
            <PaginationItem
                page='Next'
                currentPage={currentPage}
                onPageChange={()=> onPageChange(currentPage + 1)}
                isDisabled={isLastPage}
            />
            <PaginationItem
                page='Last'
                currentPage={currentPage}
                onPageChange={()=> onPageChange(pages.length)}
                isDisabled={isLastPage}
            />
        </ul>
    </div>
}