import Caret from "./Caret";
export default function Column({ columnContent, handlerHeaderClick, direction, sort }) {
    return (
        <>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columnContent.map((value) =>
                        <th onClick={handlerHeaderClick} key={value.accessor} scope="col" className="px-6 py-3">
                            <div className=" text-sm text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                {value.Header}
                                <a href="#">
                                                                        {
                                        value.accessor === sort.keyToSort && (<Caret direction={direction}></Caret>)
                                        
                                    }
                                    {console.log(sort.keyToSort)}
                                </a>
                            </div>
                        </th>

                    )}
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
        </>
    );
}
