export default function RowContent({ bookData, authorData }) {
    // const temp = bookData.docs;
    
    return <>
        <tbody>
        {/* {console.log(authorData["OL18053A"].birth_date)} */}
        {console.log("rerender")}
            {bookData.map((book, index) => {
                    // console.log(authorData);
                    const authorKey = book.author_key[0].replace('/authors/', '');
                    // console.log(`Author Key: ${authorKey}`);
                    const author = authorData[`/authors/${authorKey}`];
                    // console.log(`Author Data: ${author}`);
                    // if (!author) {
                    //     console.log(`Author not found: ${authorKey}`);
                    // }
                    return (
                    <tr key={index} className="bg-white border-b text-wrap dark:bg-gray-800 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 text-wrap font-medium "
                        >
                            {(book.title)}
                        </th>
                        <td className="px-6 py-4">{author ? author.name : book.author_name[0]}</td>
                        <td className="px-6 py-4">{book.first_publish_year}</td>
                        <td className="px-6 py-4">{book.ratings_average}</td>
                        <td className="px-6 py-4">{author ? author.birth_date : 'Unknown'}</td>
                        <td className="px-6 py-4">{book.subject[0]}</td>
                        <td className="px-6 py-4">{author ? author.top_work : 'Unknown'}</td>
                        <td className="px-6 py-4 text-right">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </a>
                        </td>
                    </tr>
                    )
                }
            )}
        </tbody>
    </>
}