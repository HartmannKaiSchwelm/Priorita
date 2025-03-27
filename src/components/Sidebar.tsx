import { FaPlus, FaFilter } from "react-icons/fa";

type SidebarProps = {
    setFilter: (filter: string) => void;
    setShowForm: (show: boolean) => void;
    categories: string[];
    reloadCategories: () => void;
};

export default function Sidebar({ 
    setFilter, 
    setShowForm, 
    categories 
}: Omit<SidebarProps, 'reloadCategories'>) {
    return (
        <div className="w-64 bg-white p-4 shadow-md">
            <button 
                onClick={() => setShowForm(true)} 
                className="w-full bg-blue-500 text-white p-2 rounded mb-4 flex items-center justify-center"
            >
                <FaPlus className="mr-2" /> New Todo
            </button>

            <h3 className="font-bold mb-2 flex items-center">
                <FaFilter className="mr-2" /> Filter by Category
            </h3>
            
            <ul className="space-y-2">
                <li 
                    onClick={() => setFilter('all')} 
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                    All Todos
                </li>
                {categories.map((category) => (
                    <li 
                        key={category} 
                        onClick={() => setFilter(category)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}