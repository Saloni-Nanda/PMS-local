 // Skeleton loader component
    const TableSkeleton = () => (
        <table className="w-full border-1 min-w-[700px]">
            <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-16"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-16"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-32"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-12"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-8"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-24"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-8"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-12"></div>
                        </td>
                        <td className="px-2 py-3 border-b border-gray-100">
                            <div className="h-4 bg-gray-200 rounded mx-auto w-12"></div>
                        </td>
                        <td className="py-3 border-b border-gray-100">
                            <div className="h-5 w-5 bg-gray-200 rounded mx-auto"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    export default TableSkeleton;