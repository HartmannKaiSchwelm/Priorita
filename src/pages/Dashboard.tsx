import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";
import { useOutletContext } from "react-router-dom";
import { FaPlus, FaCheckCircle, FaCalendarAlt, FaListUl } from "react-icons/fa";

interface EmptyStateProps {
    onCreateTodo: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateTodo }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="bg-blue-100 rounded-full p-6 mb-6">
            <FaCheckCircle className="text-6xl text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to MyTodoApp!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
            Create your first task. Organize your todos, set deadlines, and boost your productivity!
        </p>
        <div className="w-full max-w-md mx-auto">
            <button
                onClick={onCreateTodo}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
                <FaPlus className="text-lg" />
                <span>New Todo</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaListUl className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Organize Tasks</h3>
                <p className="text-sm text-gray-600">Create and categorize your todos for better organization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Set Deadlines</h3>
                <p className="text-sm text-gray-600">Track important dates and never miss a deadline</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCheckCircle className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Stay Productive</h3>
                <p className="text-sm text-gray-600">Boost your productivity with organized task management</p>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [todoCount, setTodoCount] = useState<number>(0);
    const { filter } = useOutletContext<{ filter: string | null }>();
    const navigate = useNavigate();

    const fetchCategories = useCallback(async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("category")
            .not("category", "is", null);

        if (error) {
            alert("Error loading categories. Please refresh the page.");
            return;
        }

        if (data && data.length > 0) {
            const uniqueCategories = [...new Set(data.map(row => row.category).filter(Boolean))];
            setCategories(uniqueCategories);
        }
    }, []);

    const fetchTodoCount = useCallback(async () => {
        if (!user) return;
        
        const { count, error } = await supabase
            .from('todos')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (error) {
            alert("Error loading todos. Please refresh the page.");
            return;
        }
        
        setTodoCount(count || 0);
    }, [user]);

    useEffect(() => {
        let mounted = true;

        async function checkUser() {
            const { data } = await supabase.auth.getUser();
            if (!mounted) return;
            
            if (!data?.user) {
                navigate("/login");
            } else {
                setUser(data.user);
                await fetchCategories();
                await fetchTodoCount();
            }
        }
        
        checkUser();

        return () => {
            mounted = false;
        };
    }, [navigate, fetchCategories, fetchTodoCount]);

    const handleCloseForm = useCallback(() => {
        setShowForm(false);
        fetchTodoCount();
    }, [fetchTodoCount]);

    const handleCreateTodo = useCallback(() => {
        setShowForm(true);
    }, []);

    return (
        <div className="h-screen flex bg-transparent">
            <div className="flex-1 p-4">
                {showForm ? (
                    <div className="flex justify-center items-start pt-8">
                        <div className="w-full max-w-md">
                            <TodoForm 
                                onClose={handleCloseForm}
                                refreshCategories={fetchCategories}
                                categories={categories}
                                setCategories={setCategories}
                            />
                        </div>
                    </div>
                ) : (
                    todoCount === 0 ? (
                        <EmptyState onCreateTodo={handleCreateTodo} />
                    ) : (
                        <Todos 
                            filter={filter || 'all'} 
                            reloadCategories={fetchCategories}
                        />
                    )
                )}
            </div>
        </div>
    );
}