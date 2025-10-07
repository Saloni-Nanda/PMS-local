"use client"
import { Search, Trash2, EditIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface RatePlanData {
    id: string;
    ratePlan: string;
    rateName: string;
    type: string;
    status: string;
    mealPlan: string;
    policy: string;
    currency: string;
    commissionable: string;
}
interface SortConfig {
    key: keyof RatePlanData | null;
    direction: 'asc' | 'desc';
}
const Page: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

    const ratePlans: RatePlanData[] = useMemo(() =>[
        {
            id: "1",
            ratePlan: "AGEN",
            rateName: "Agencia (PYXIS)",
            type: "Negotiated",
            status: "Open",
            mealPlan: "American",
            policy: "General",
            currency: "MXN",
            commissionable: "Si"
        },
        {
            id: "2",
            ratePlan: "COMERCIAL",
            rateName: "Sin Impuestos",
            type: "NET",
            status: "Open",
            mealPlan: "American",
            policy: "Usointerno",
            currency: "MXN",
            commissionable: "No"
        },
        {
            id: "3",
            ratePlan: "CONVENIO",
            rateName: "Mazda",
            type: "Negotiated",
            status: "Open",
            mealPlan: "American",
            policy: "Usointerno",
            currency: "MXN",
            commissionable: "No"
        },
        {
            id: "4",
            ratePlan: "CORPORATE",
            rateName: "Corporativa",
            type: "Corporate",
            status: "Open",
            mealPlan: "American",
            policy: "Usointerno",
            currency: "MXN",
            commissionable: "No"
        },
        {
            id: "5",
            ratePlan: "HOTELREZ",
            rateName: "Hotel rez",
            type: "NET",
            status: "Open",
            mealPlan: "Buffet breakfast",
            policy: "Usointerno",
            currency: "USD",
            commissionable: "Si"
        },
        {
            id: "6",
            ratePlan: "PROMO",
            rateName: "VSD",
            type: "Association",
            status: "Open",
            mealPlan: "American",
            policy: "Usointerno",
            currency: "MXN",
            commissionable: "No"
        },
        {
            id: "7",
            ratePlan: "PROMOTION",
            rateName: "Promotion",
            type: "Promotional",
            status: "Close",
            mealPlan: "American",
            policy: "Canales",
            currency: "MXN",
            commissionable: "Si"
        }
    ], []);

    // const filteredRatePlans = ratePlans.filter(ratePlan =>
    //     ratePlan.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ratePlan.rateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ratePlan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ratePlan.policy.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredRatePlans = useMemo(() => {
        return ratePlans.filter(ratePlan =>
            ratePlan.ratePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.rateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.policy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.mealPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ratePlan.commissionable.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
    },[searchTerm, ratePlans])

    const sortedRatePlans = useMemo(() => {
            if (!sortConfig.key) return filteredRatePlans;
    
            return [...filteredRatePlans].sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
    
                let comparison = 0;
    
                 if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                }  else {
                    comparison = String(aValue).localeCompare(String(bValue));
                }
    
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });
        }, [filteredRatePlans, sortConfig]);
    
        const handleSort = (key: keyof RatePlanData) => {
            let direction: 'asc' | 'desc' = 'asc';
            if (sortConfig.key === key && sortConfig.direction === 'asc') {
                direction = 'desc';
            }
    
            setSortConfig({ key, direction });
        };
    
        const SortIcon: React.FC<{ sortKey: keyof RatePlanData }> = ({ sortKey }) => {
            const getSortIcon = () => {
                if (sortConfig.key !== sortKey) {
                    return <span className=" text-gray-800 text-xs">⇅</span>;
                }
    
                return sortConfig.direction === 'asc'
                    ? <span className=" text-gray-800 text-xs">⇅</span>
                    : <span className=" text-gray-800 text-xs">⇅</span>;
            };
    
            return (
                <button
                    onClick={() => handleSort(sortKey)}
                    className="hover:bg-gray-300 p-1 rounded transition-colors"
                    type="button"
                >
                    {getSortIcon()}
                </button>
            );
        };
    

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open': return 'text-green-600 bg-green-50';
            case 'closed': return 'text-red-600 bg-red-50';
            case 'suspended': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };


    return (
        <div className="">
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">

                    {/* Export and Search Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
                            <Link href="/rates/rate-plan/new">
                                <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                                    New
                                </button>
                            </Link>
                            <button className="px-4 sm:px-5 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer">
                                Export Excel
                            </button>
                            <button className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer">
                                Export PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            <div className="relative w-full sm:w-auto">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600">
                                    <Search size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-3 py-2 border border-gray-400 rounded-md text-sm min-w-[200px] focus:ring focus:ring-[#076DB3] placeholder-gray-600"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-1 min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-36">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE PLAN
                                        </div>
                                        <SortIcon sortKey='ratePlan'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-40">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            RATE NAME
                                        </div>
                                        <SortIcon sortKey='rateName'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>TYPE</div>
                                        <SortIcon sortKey='type'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>STATUS</div>
                                        <SortIcon sortKey='status'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            MEAL<br />PLAN
                                        </div>
                                        <SortIcon sortKey='mealPlan'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-28">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>POLICY</div>
                                        <SortIcon sortKey='policy'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div>CURRENCY</div>
                                        <SortIcon sortKey='currency'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-32">
                                    <div className="flex justify-center gap-1 items-center">
                                        <div className="leading-tight">
                                            COMMISSIONABLE
                                        </div>
                                        <SortIcon sortKey='commissionable'/>
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-center font-medium text-xs text-gray-800 uppercase tracking-wide border-b border-gray-200 w-20">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredRatePlans.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No rate plans found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                sortedRatePlans.map((ratePlan) => (
                                    <tr key={ratePlan.id} className="hover:bg-gray-50">
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center ">
                                            {ratePlan.ratePlan}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {ratePlan.rateName}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs `}>
                                                {ratePlan.type}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ratePlan.status)}`}>
                                                {ratePlan.status}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {ratePlan.mealPlan}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            {ratePlan.policy}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center font-medium">
                                            {ratePlan.currency}
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ratePlan.commissionable === 'Si'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {ratePlan.commissionable}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link href="/rates/rate-plan/edit">
                                                    <button className="h-5 w-5 text-gray-600 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center">
                                                        <EditIcon size={12} />
                                                    </button>
                                                </Link>
                                                <button className="h-5 w-5 text-gray-600 cursor-pointer bg-[white] hover:bg-gray-300  rounded-md transition-colors inline-flex items-center justify-center">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                    <div className="text-gray-600 text-sm order-2 sm:order-1">
                        Showing {filteredRatePlans.length > 0 ? 1 : 0} to {Math.min(10, filteredRatePlans.length)} of {filteredRatePlans.length} rows
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                        <button
                            disabled
                            className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                        >
                            <span className="hidden sm:inline">≪ First</span>
                            <span className="sm:hidden">≪</span>
                        </button>
                        <button
                            disabled
                            className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">‹</span>
                        </button>
                        <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">›</span>
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                        >
                            <span className="hidden sm:inline">Last ≫</span>
                            <span className="sm:hidden">≫</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;