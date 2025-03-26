import { useState, useEffect } from "react";
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

    // Dummy-Funktion für reloadCategories
    const reloadCategories = () => {
        // Diese Funktion könnte in Zukunft implementiert werden
        console.log("Kategorien neu laden");
    };

    return (
        <div className="h-screen flex bg-gradient-to-b from-sky-300 to-gray-200">
            <Sidebar 
                setFilter={setFilter} 
                setShowForm={setShowForm} 
                reloadCategories={reloadCategories}
            />
            <div className="flex-1 p-4">
                {showForm ? (
                    <TodoForm onClose={() => setShowForm(false)} />
                ) : (
                    <>
                        <h1 className="text-2xl">📊 Dashboard von {user?.email}!</h1>
                        <p>Aktueller Filter: {filter}</p>
                        <Todos filter={filter} />
                    </>
                )}
            </div>
        </div>
    );
}
