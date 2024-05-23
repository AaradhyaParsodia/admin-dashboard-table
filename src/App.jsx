import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ColumnHead from "../components/ColumnHead";
import RowContent from "../components/RowContent";
import Caret from "../components/Caret";
import Pagination from "../components/Pagination";
import "./App.css";

// const tableHead = [
//     "title",
//     "author name",
//     "first Publish Year",
//     "rating",
//     "dob",
//     "subject",
//     "topWork"
// ];


// const bookData = [{
//     "rating": "4.5/5",
//     "authorName": "J. K. Rowling",
//     "title": "Official Site",
//     "firstPublishYear": "1997",
//     "subject": "Fantasy",
//     "dob": "31 July 1965",
//     "topWork": "Harry Potter and the Philosopher's Stone"
// }]

function App() {

    const columnsContent = [
        {
            id: 1,
            Header: 'Title',
            accessor: 'title',
        },
        {
            id: 2,
            Header: 'Author Name',
            accessor: 'author.name',
        },
        {
            id: 3,
            Header: 'First Publish Year',
            accessor: 'first_publish_year',
        },
        {
            id: 4,
            Header: 'Ratings Average',
            accessor: 'ratings_average',
        },
        {
            id: 5,
            Header: 'Author Birth Date',
            accessor: 'author.birth_date',
        },
        {
            id: 6,
            Header: 'Subject',
            accessor: 'subject',
        },
        {
            id: 7,
            Header: 'Author Top Work',
            accessor: 'author.top_work',
        },
    ];

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState({ books: [], authors: {} });
    // const [books, setBooks] = useState([]);
    // const [authors, setAuthors] = useState([]);
    const [sort, setSort] = useState({ keyToSort: "title", direction: "asc" });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [numFound, setNumFound] = useState(2000);

    const fetchData = async () => {
        try {
            const bookResponse = await axios.get(`https://openlibrary.org/search.json?q=*&has_fulltext=true&limit=${limit}&offset=${offset}`);
            console.log("Inside fetch")
            // const bookResponse = await axios.get(`https://openlibrary.org/search.json?q=1%&has_fulltext=true&limit=${limit}&offset=${offset}`);
            const bookData = bookResponse.data.docs;
            // console.log("book data "+bookData)

            // setNumFound(2000);

            const authorKeys = bookData.map(book => book.author_key);
            console.log("author key " + authorKeys[0]);

            const authorPromises = authorKeys.map(key => fetch(`https://openlibrary.org/authors/${key[0]}.json?works=true`));

            const authorResponses = await Promise.all(authorPromises);
            const authorData = await Promise.all(authorResponses.map(response => response.json()));
            console.log(authorData[0].birth_date);

            const authorsObj = {};
            authorData.forEach(author => {
                authorsObj[author.key] = author;
            });
            setData({ books: bookData, authors: authorsObj });
            // setData({ books: bookData, authors: authorData.reduce((acc, author) => ({ ...acc, [author.key]: author }), {}) });
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("In UseEffect")
        return () => {
            setLoading(false);
        };
    }, [limit, offset]);

    // useEffect(() => {
    //     if (books.length > 0) {
    //         getAuthorData();
    //     }
    // }, [books]);

    function handleHeaderClick(header) {
        // console.log("event " + event)
        if (header) {

            setSort({
                keyToSort: header.accessor,
                direction:
                    header.accessor === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc',
            });
        }
    }

    function selectionHandler(event) {
        const selectedValue = event.target.value;
        setLimit(parseInt(selectedValue, 10));
        // setPage(1);
    }



    function getSortedArray(arrayToSort) {
        const dataArray = Object.values(arrayToSort);
        if (sort.direction === 'desc') {
            return dataArray.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
        }
        return dataArray.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
    }

    const handlePrevPage = () => {
        if (offset <= 0) {
            return;
        }

        setOffset(offset - limit);
    };

    const handleNextPage = () => {
        if (offset + limit >= numFound) {
            return;
        }

        setOffset(offset + limit);
    };

    return (
        <div className="">
            <div className="">
                <div className="relative m-20 overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        {/* <ColumnHead
                            handlerHeaderClick={() => handleHeaderClick(columnsContent)}
                            columnContent={columnsContent}
                            sort={sort}
                            direction={sort.keyToSort === columnsContent.key ? sort.direction : "asc"}
                        >
                            {console.log(`${sort}`)}
                        </ColumnHead> */}


                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {columnsContent.map((value) => (
                                    <th onClick={() => handleHeaderClick(value)} key={value.id} scope="col" className="px-6 py-3">
                                        <div className="text-sm text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                            {value.Header}
                                            <a href="#">
                                                {value.accessor === sort.keyToSort && (
                                                    <Caret direction={sort.direction} />
                                                )}
                                            </a>
                                        </div>
                                    </th>
                                ))}
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>



                        {loading ? <RowContent authorData={(data.authors)} bookData={getSortedArray(data.books)}></RowContent> : <tbody><tr>
                            <td colSpan={columnsContent.length}>Please Wait While Fetching the data</td>
                        </tr></tbody>}

                    </table>
                </div>
            </div>
            <div className="flex justify-evenly">

                <select
                    defaultValue={10}
                    onChange={selectionHandler}
                    id="entryCount"
                    className="bg-gray-50 border m-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >

                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div className="flex" id="container">
                    {/* <Pagination
                        currentPage={currentPage}
                        total={numFound}
                        limit={limit}
                        onPageChange={(page) => setCurrentPage(page)}
                    ></Pagination> */}
                    <button className="flex m-2 items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                        onClick={handlePrevPage}
                    >
                        Previous Page
                    </button>
                    <button className="flex m-2 items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleNextPage}>Next Page</button>
                </div>

            </div>
        </div>
    );
}

export default App;
