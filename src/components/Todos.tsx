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
    categories: string[];
    setCategories: (categories: string[]) => void;
};

export default function Todos({ filter, reloadCategories, categories, setCategories }: TodosProps) {
    const activeFilter = filter || "all";
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            let query = supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false });

            if (activeFilter !== "all") {
                query = query.eq("category", activeFilter);
            }

            const { data, error } = await query;
            if (error) {
                alert("Error loading todos. Please refresh the page.");
                return;
            }
            
            const todosWithCategories = data?.map(todo => ({
                ...todo,
                category: todo.category || 'Uncategorized'
            })) || [];
            setTodos(todosWithCategories);
        };

        fetchTodos();
    }, [activeFilter]);

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) {
            alert("Error deleting todo. Please try again.");
            return;
        }
        
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        await reloadCategories();
    };

    // Sortiere Todos nach Priorität (High -> Medium -> Low), nur ohne Deadline
    const prioritySortedTodos = [...todos]
        .filter(todo => todo.due_date === null) // Explizit nach null filtern
        .sort((a, b) => b.priority - a.priority);

    // Sortiere Todos nach Deadline (nächste zuerst), nur mit Deadline
    const deadlineSortedTodos = [...todos]
        .filter(todo => todo.due_date !== null) // Explizit nach nicht-null filtern
        .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime());

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
                    <ul className="w-full">
                        {prioritySortedTodos.map(todo => (
                            <TodoCard key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </div>

                {/* Deadline-sortierte Todos */}
                <div className="w-full lg:flex-1">
                    <h3 className="text-lg font-semibold mb-2">By Deadline</h3>
                    <ul className="w-full">
                        {deadlineSortedTodos.map(todo => (
                            <TodoCard key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
