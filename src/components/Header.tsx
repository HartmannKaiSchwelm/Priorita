// components/Header.tsx

import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabase";

const Header = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [todoCount, setTodoCount] = useState<number>(0);

    useEffect(() => {
        const fetchTodoCount = async () => {
            if (user) {
                const { count, error } = await supabase
                    .from('todos')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id);

                if (error) {
                    alert('Error loading todo count. Please refresh the page.');
                    return;
                }
                setTodoCount(count || 0);
            }
        };

        fetchTodoCount();
    }, [user]);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Logout error:', error);
                alert('Error during logout. Please try again.');
                return;
            }
            // Clear any local state if needed
            setTodoCount(0);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Error during logout. Please try again.');
        }
    };

    return (
        <header className="w-full bg-transparent px-4 py-2 flex items-center justify-between fixed top-0 left-0 z-50 border-b">
            <h1 className="text-xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
                MyTodoApp
            </h1>
            {user && (
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{todoCount} todos</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-red-600 transition-colors text-sm"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
