export default function RowContent({ bookData, authorData }) {
    // const temp = bookData.docs;
    
    return <>
        <tbody>
        {/* {console.log(authorData["OL18053A"].birth_date)} */}
            {bookData.map((book) => {
                    console.log(authorData);
                    const authorKey = book.author_key[0].replace('/authors/', '');
                    // console.log(`Author Key: ${authorKey}`);
                    const author = authorData[`/authors/${authorKey}`];
                    // console.log(`Author Data: ${author}`);
                    return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {(book.title)}
                        </th>
                        <td className="px-6 py-4">{author ? author.name : 'Unknown'}</td>
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