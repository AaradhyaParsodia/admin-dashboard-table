import { useState } from "react";
import ColumnHead from "../components/ColumnHead";
import RowContent from "../components/RowContent";
import "./App.css";

const tableHead = ["rating", "author name", "title", "first Publish Year", "subject", "dob", "topWork"];

const tableContent = [{
    "rating": "4.5/5",
    "authorName": "J. K. Rowling",
    "title": "Official Site",
    "firstPublishYear": "1997",
    "subject": "Fantasy",
    "dob": "31 July 1965",
    "topWork": "Harry Potter and the Philosopher's Stone"
}]

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <ColumnHead tableHead={tableHead}></ColumnHead>
                    <RowContent tableContent={tableContent}></RowContent>
                </table>
            </div>
        </>
    );
}

export default App;
