import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TodoForm from "./TodoForm";
import { supabase } from "../supabase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa";

export default function Layout(props: { reloadCategories?: () => void }) {
    // 
    // Key change: Track whether the TodoForm should be shown
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const reloadCategories = props.reloadCategories || (() => {});

    const handleCloseForm = () => {
        setShowForm(false);
    };
    // Funktion zum Laden der Kategorien
    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from("todos")
                .select("category")
                .not("category", "is", null)
                .eq("user_id", user?.id);  // Nur Kategorien des aktuellen Users

            if (error) throw error;

            if (data) {
                const uniqueCategories = [...new Set(
                    data
                        .map(row => String(row.category).trim())
                        .filter(cat => cat !== "")
                )].sort();
                setCategories(uniqueCategories);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert("Error loading categories. Please refresh the page.");
        }
    };

    // Lade Kategorien beim ersten Rendern und wenn sich der User ändert
    useEffect(() => {
        if (user) {
            fetchCategories();
        } else {
            setCategories([]);
        }
    }, [user]);
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-16">
                {/* Mobile Controls */}
                {user && !isLandingPage && (
                    <div className="lg:hidden w-full px-4 py-2 bg-transparent border-b">
                        <div className="flex flex-col gap-2 max-w-md mx-auto w-full">
                            <button 
                                onClick={() => setShowForm(true)} 
                                className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                                <FaPlus className="mr-2" /> New Todo
                            </button>
                            <select 
                                onChange={(e) => setFilter(e.target.value)}
                                value={filter || 'all'}
                                className="w-full p-2 border rounded bg-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                
                {/* Desktop Sidebar */}
                {user && !isLandingPage && (
                    <div className="hidden lg:block">
                        <Sidebar 
                            setFilter={setFilter} 
                            setShowForm={setShowForm} 
                            categories={categories} 
                            activeFilter={filter || 'all'}
                        />
                    </div>
                )}
                
                <main className="flex-1 p-4 lg:p-6 bg-transparent overflow-auto">
                    {/* Fixed Mobile New Todo Button for very small screens */}
                    {user && !isLandingPage && !showForm && (
                        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                            >
                                <FaPlus size={24} />
                            </button>
                        </div>
                    )}
                    
                    {showForm ? (
                        <div className="flex justify-center items-start pt-4 lg:pt-8">
                            <div className="w-full max-w-md">
                                <TodoForm 
                                    onClose={handleCloseForm}
                                    refreshCategories={reloadCategories}
                                    categories={categories}
                                    setCategories={setCategories}
                                />
                            </div>
                        </div>
                    ) : (
                        <Outlet context={{ filter, reloadCategories }} />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}