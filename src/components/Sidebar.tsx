import { FaPlus, FaFilter } from "react-icons/fa";

type SidebarProps = {
    setFilter: (filter: string) => void;
    setShowForm: (show: boolean) => void;
    categories: string[];
    activeFilter: string;
};

export default function Sidebar({ 
    setFilter, 
    setShowForm, 
    categories,
    activeFilter
}: SidebarProps) {
    return (
        <div className="w-64 bg-transparent p-2 mt-20">
            <button 
                onClick={() => setShowForm(true)} 
                className="w-full bg-blue-500 text-white p-2 rounded mb-4 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
                <FaPlus className="mr-2" /> New Todo
            </button>
             
            <h3 className="font-bold mb-2 flex items-center">
                <FaFilter className="mr-2" /> Filter by Category
            </h3>
            
            <ul className="space-y-2">
                <li 
                    onClick={() => setFilter('all')} 
                    className={`cursor-pointer p-2 rounded transition-colors ${
                        activeFilter === 'all' 
                            ? 'bg-blue-500 text-white' 
                            : 'hover:bg-gray-100'
                    }`}
                >
                    All Todos
                </li>
                {categories?.map?.((category) => (
                    <li 
                        key={category} 
                        onClick={() => setFilter(category)}
                        className={`cursor-pointer p-2 rounded transition-colors ${
                            activeFilter === category 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}