

import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

type SidebarProps = {
    setFilter: (filter: string) => void;
    setShowForm: (show: boolean) => void;
    categories: string[]; // 🟢 Kategorien als Prop
    reloadCategories: () => void;
};

export default function Sidebar({ setFilter, setShowForm, categories, reloadCategories }: SidebarProps) {
    
    return (
        <div className="w-64 h-screen bg-gradient-to-b from-sky-300 to-gray-200 p-4">
            <h2 className="text-xl font-bold mb-4">📋 Navigation</h2>

            <button className="bg-transparent text-light   hover:text-dark flex px-4 py-2 w-full mb-4 rounded justify-evenly items-center " onClick={() => setShowForm(true)}>
                <IoIosAddCircleOutline className="text-xl  " /> Create a new todo
            </button>

            <h3 className="text-lg font-semibold mt-4">📂 Categories</h3>
            {categories.length > 0 ? (
                categories.map((category) => (
                    <button
                        key={category}
                        className="w-full text-center shadow-lg mt-2 bg-dark text-light p-2 rounded"
                        onClick={() => setFilter(category)}
                    >
                        {category}
                    </button>
                ))
            ) : (
                <p>Keine Kategorien vorhanden.</p>
            )}
        </div>
    );
}
