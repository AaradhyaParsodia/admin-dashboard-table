export default function RowContent({ tableContent }) {
    return <>
        <tbody>
            {tableContent.map((value) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {value.rating}
                    </th>
                    <td className="px-6 py-4">{value.authorName}</td>
                    <td className="px-6 py-4">{value.title}</td>
                    <td className="px-6 py-4">{value.firstPublishYear}</td>
                    <td className="px-6 py-4">{value.subject}</td>
                    <td className="px-6 py-4">{value.dob}</td>
                    <td className="px-6 py-4">{value.topWork}</td>
                    <td className="px-6 py-4 text-right">
                        <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </a>
                    </td>
                </tr>
            )}
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4 text-right">
                    <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </a>
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4 text-right">
                    <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </a>
                </td>
            </tr> */}
        </tbody>
    </>
}