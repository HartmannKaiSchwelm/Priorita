import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function Sidebar({ setFilter, setShowForm, reloadCategories }: { 
    setFilter: (filter: string) => void, 
    setShowForm: (show: boolean) => void,
    reloadCategories: () => void
}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from("todos")
                .select("category")
                .neq("category", null);
    
            if (error) console.error("Fehler beim Abrufen der Kategorien:", error.message);
            else {
                const uniqueCategories = [...new Set(data.map(row => row.category))];
                setCategories(uniqueCategories);
            }
        }
        fetchCategories();
    }, [reloadCategories]); // 🟢 Sidebar aktualisiert sich automatisch!

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-sky-300 to-gray-200 p-4">
            <h2 className="text-xl font-bold mb-4">📋 Navigation</h2>

            <button className="bg-transparent text-light   hover:text-dark flex px-4 py-2 w-full mb-4 rounded justify-evenly items-center " onClick={() => setShowForm(true)}>
            <IoIosAddCircleOutline className="text-xl  "/> Create a new todo
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

