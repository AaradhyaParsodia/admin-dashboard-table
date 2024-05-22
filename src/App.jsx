import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ColumnHead from "../components/ColumnHead";
import RowContent from "../components/RowContent";
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
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Author Name',
            accessor: 'author.name',
        },
        {
            Header: 'First Publish Year',
            accessor: 'first_publish_year',
        },
        {
            Header: 'Ratings Average',
            accessor: 'ratings_average',
        },
        {
            Header: 'Author Birth Date',
            accessor: 'author.birth_date',
        },
        {
            Header: 'Subject',
            accessor: 'subject',
        },
        {
            Header: 'Author Top Work',
            accessor: 'author.top_work',
        },
    ];

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(10);
    const [data, setData] = useState({ books: [], authors: {} });
    // const [books, setBooks] = useState([]);
    // const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const bookResponse = await axios.get(`https://openlibrary.org/search.json?q=*&has_fulltext=true&limit=${limit}&offset=${offset}`);
            const bookData = bookResponse.data.docs;

            const authorKeys = bookData.map(book => book.author_key);
            const authorResponses = await Promise.all(authorKeys.map(key => fetch(`https://openlibrary.org/authors/${key}.json?works=true`)));
            const authorData = await Promise.all(authorResponses.map(response => response.json()));

            setData({ books: bookData, authors: authorData.reduce((acc, author) => ({ ...acc, [author.key]: author }), {}) });
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [limit, offset]);

    // useEffect(() => {
    //     if (books.length > 0) {
    //         getAuthorData();
    //     }
    // }, [books]);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <ColumnHead columnContent={columnsContent}></ColumnHead>
                    {loading ? <RowContent authorData={data.authors} bookData={data.books}></RowContent> : <tbody>Please Wait While Fetching the data</tbody>}
                </table>
            </div>
        </>
    );
}

export default App;
