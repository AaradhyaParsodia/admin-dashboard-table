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
    const [numFound, setNumFound] = useState();
    const [searchValue, setSearchValue] = useState('');


    const fetchData = async () => {
        try {
            let bookResponse;
            if(searchValue!==''){
                // setSearchValue('*');
                bookResponse = await axios.get(`https://openlibrary.org/search.json?q=${searchValue}&has_fulltext=true&limit=${limit}&offset=${offset}`);
            }
            else{
                bookResponse = await axios.get(`https://openlibrary.org/search.json?q=*&has_fulltext=true&limit=${limit}&offset=${offset}`);
            }
            console.log("Inside fetch" + `https://openlibrary.org/search.json?q=${searchValue}&has_fulltext=true&limit=${limit}&offset=${offset}`)
            // const bookResponse = await axios.get(`https://openlibrary.org/search.json?q=1%&has_fulltext=true&limit=${limit}&offset=${offset}`);
            const bookData = bookResponse.data.docs;
            // console.log("book data "+bookData)

            setNumFound(bookResponse.data.numFound);
            console.log(bookResponse.data.numFound);

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

    const searchClickHandler = (e) => {
        e.preventDefault();
        if(searchValue !== ''){
            fetchData();
        }
        // Add your search logic here
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="">
            <form className="flex mt-4 items-center max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    
                    <input 
                        type="text" 
                        id="author-search" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search Author name..." 
                        required
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                </div>
                <button 
                    onClick={searchClickHandler} 
                    type="submit" 
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" 
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className="">
                <div className="backgroundShadow relative mx-16 my-4 overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <div className="flex justify-evenly flex-wrap md:flex-nowrap">

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
                <div className="flex items-center md:flex-nowrap" id="container">
                    <div>

                        <span className="text-sm m-2 text-gray-700 dark:text-gray-800">
                            Showing <span className="font-semibold text-gray-900 dark:text-grey-800">{offset}</span> to <span className="font-semibold text-gray-900 dark:text-gray-900">{offset + limit}</span> of <span className="font-semibold text-gray-900 dark:text-gray-900">{numFound}</span> Entries
                        </span>
                    </div>
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
