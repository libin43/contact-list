import React, { useState, useEffect, useCallback } from 'react'

const buildPages = (activePage: number, pageCount: number, setPages: React.Dispatch<React.SetStateAction<number[]>>) => {
    let start = 2;
    let end = 5;
    if (pageCount >= 1 && pageCount <= 5) {
        start = 2
        end = pageCount - 1
    }

    if (activePage > 3 && activePage < pageCount - 3) {
        start = activePage - 2
        end = activePage + 2
    }
    if (pageCount > 5 && activePage > pageCount - 4) {
        start = pageCount - 4
        end = pageCount - 1
    }

    const newPages = [];
    for (let i = start; i <= end; i++) {
        newPages.push(i);
    }
    setPages(newPages);
};

interface PaginationProps {
    pageCount: number;
    searchPageCount: number;
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount, searchPageCount, onPageChange }) => {

    const determinePageCount: number = searchPageCount !== 0 ? searchPageCount : pageCount;

    const [pages, setPages] = useState<number[]>([])
    const [activePage, setActivePage] = useState<number>(1)
    const [searchActivePage, setSearchActivePage] = useState<number>(1)



    const memoizedBuildPages = useCallback(() => {
        buildPages(activePage, determinePageCount, setPages);
    }, [activePage, determinePageCount]);

    useEffect(() => {
        memoizedBuildPages();
    }, [memoizedBuildPages]);

    const onChange = (page: number) => {
        if (searchPageCount !== 0) {
            setSearchActivePage(page)
        }
        else {
            setSearchActivePage(1)
            setActivePage(page)
        }
        onPageChange(page)
    }

    return (
        <>
            <nav className="pagination flex justify-around text-white my-5">
                <button className="bg-gray-800 w-10">Prev</button>
                <button
                    className={`${(searchPageCount !== 0 ? searchActivePage : activePage) !== 1 ? 'bg-gray-700' : 'bg-gray-900'} w-10`}
                    onClick={() => onChange(1)}
                >1</button>
                {(searchPageCount !== 0 ? searchActivePage : activePage) > 4 ? <span className="text-black">...</span> : null}
                {pages.map((page, index) => (
                    <button
                        key={index}
                        className={` ${page === (searchPageCount !== 0 ? searchActivePage : activePage) ? 'bg-gray-900' : 'bg-gray-700'
                            } w-10`}
                        onClick={() => onChange(page)}
                    >
                        {page}
                    </button>
                ))}
                {(searchPageCount !== 0 ? searchActivePage : activePage) < determinePageCount - 3 && determinePageCount > 6 ? (
                    <span className="text-black">...</span>
                ) : null}
                {determinePageCount < 2 ? null : (
                    <>
                        <button
                            className={`${(searchPageCount !== 0 ? searchActivePage : activePage) !== determinePageCount ? 'bg-gray-700' : 'bg-gray-900'
                                } w-10`}
                            onClick={() => onChange(determinePageCount)}
                        >
                            {determinePageCount}
                        </button>
                        <button className="bg-gray-800 w-10">Next</button>
                    </>
                )}

            </nav>
        </>
    )
}
