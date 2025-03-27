import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import Todos from "../components/Todos";
import Sidebar from "../components/Sidebar";
import TodoForm from "../components/TodoForm";

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [filter, setFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser();
            if (!data?.user) {
                navigate("/login");
            } else {
                setUser(data.user);
            }
        }
        checkUser();
    }, [navigate]);

    // 🟢 Kategorien aus DB abrufen
    const fetchCategories = useCallback(async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("category")
            .neq("category", null);

        if (!error) {
            const uniqueCategories = [...new Set(data.map(row => row.category))];
            setCategories(uniqueCategories);
        }
    }, []);

    // 🟢 Kategorien sofort abrufen beim Start
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="h-screen flex bg-gradient-to-b from-sky-300 to-gray-200">
            <Sidebar 
                setFilter={setFilter} 
                setShowForm={setShowForm} 
                categories={categories}
                
            />
            <div className="flex-1 p-4">
                {showForm ? (
                    <TodoForm 
                        onClose={() => setShowForm(false)} 
                        refreshCategories={fetchCategories}
                        categories={categories} // 🟢 Übergeben Sie die Kategorien
                        setCategories={setCategories} // 🟢 Übergeben Sie die Setter-Funktion
                    />
                ) : (
                    <>
                        <h1 className="text-2xl">📊 Dashboard von {user?.email}!</h1>
                        <p>Aktueller Filter: {filter}</p>
                        <Todos filter={filter} reloadCategories={fetchCategories} />
                    </>
                )}
            </div>
        </div>
    );
}
