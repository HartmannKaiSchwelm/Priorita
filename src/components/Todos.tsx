import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { FaRegTrashCan } from "react-icons/fa6";

type Todo = {
    id: number;
    title: string;
    category: string;
    priority: number;
    due_date: string | null;
};

type TodosProps = {
    filter?: string;
    reloadCategories: () => void;
};

export default function Todos({ filter, reloadCategories }: TodosProps) {
    const activeFilter = filter || "all";
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Not authenticated");

                let query = supabase
                    .from("todos")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("id", { ascending: false });

                if (activeFilter !== "all") {
                    query = query.eq("category", activeFilter);
                }

                const { data, error } = await query;
                if (error) throw error;
                
                const todosWithCategories = data?.map(todo => ({
                    ...todo,
                    category: todo.category || 'Uncategorized'
                })) || [];
                setTodos(todosWithCategories);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error loading todos");
                console.error("Error fetching todos:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, [activeFilter]);

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase.from("todos").delete().eq("id", id);
            if (error) throw error;
            
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            await reloadCategories();
        } catch (err) {
            alert("Error deleting todo. Please try again.");
            console.error("Error deleting todo:", err);
        }
    };

    // Sortiere Todos nach Priorität (High -> Medium -> Low), nur ohne Deadline
    const prioritySortedTodos = [...todos]
        .filter(todo => todo.due_date === null)
        .sort((a, b) => b.priority - a.priority);

    // Sortiere Todos nach Deadline (nächste zuerst), nur mit Deadline
    const deadlineSortedTodos = [...todos]
        .filter(todo => todo.due_date !== null)
        .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime());

    if (isLoading) {
        return (
            <div className="p-4 w-full">
                <div className="animate-pulse">
                    <div className="h-4 bg-blue-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-8 bg-blue-200 rounded"></div>
                        <div className="h-8 bg-blue-200 rounded"></div>
                        <div className="h-8 bg-blue-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 w-full">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    const TodoCard = ({ todo }: { todo: Todo }) => (
        <li key={todo.id} className="border bg-sec text-light p-2 rounded mt-2">
            <p className="text-center border-b-1 font-bold mb-1">{todo.category}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="break-words max-w-full sm:max-w-[70%]">{todo.title}</span>
                <button
                    className="w-full sm:w-auto bg-light text-dark px-3 py-1 rounded"
                    onClick={() => handleDelete(todo.id)}
                >
                    <span className="flex justify-center sm:justify-between items-center mx-0.5">
                        <FaRegTrashCan className="mr-2" /> Delete
                    </span>
                </button>
            </div>
            {todo.due_date !== null ? (
                <p className="text-sm mt-1 text-gray-300">
                    Deadline: {new Date(todo.due_date).toLocaleDateString()}
                </p>
            ) : (
                <p className="text-sm mt-1 text-gray-300">
                    Priority: {todo.priority === 3 ? 'High' : todo.priority === 2 ? 'Medium' : 'Low'}
                </p>
            )}
        </li>
    );

    return (
        <div className="p-4 w-full">
            <h2 className="text-xl font-bold mb-4">📋 Todos</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Prioritäts-sortierte Todos (ohne Deadline) */}
                <div className="w-full lg:flex-1">
                    <h3 className="text-lg font-semibold mb-2">By Priority (no deadline)</h3>
                    {prioritySortedTodos.length === 0 ? (
                        <p className="text-gray-500 italic">No todos without deadline</p>
                    ) : (
                        <ul className="w-full">
                            {prioritySortedTodos.map(todo => (
                                <TodoCard key={todo.id} todo={todo} />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Deadline-sortierte Todos */}
                <div className="w-full lg:flex-1">
                    <h3 className="text-lg font-semibold mb-2">By Deadline</h3>
                    {deadlineSortedTodos.length === 0 ? (
                        <p className="text-gray-500 italic">No todos with deadline</p>
                    ) : (
                        <ul className="w-full">
                            {deadlineSortedTodos.map(todo => (
                                <TodoCard key={todo.id} todo={todo} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
