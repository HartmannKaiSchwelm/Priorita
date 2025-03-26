import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { FaRegTrashCan } from "react-icons/fa6";

type Todo = {
    id: number;
    title: string;
    category: string;
};

type TodosProps = {
    filter: string;
    reloadCategories: () => void; // 🟢 reloadCategories als Prop
};

export default function Todos({ filter, reloadCategories }: TodosProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        let query = supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: false });

        if (filter !== "all") {
            query = query.eq("category", filter);
        }

        const { data, error } = await query;

        if (error) console.error("Fehler beim Abrufen:", error.message);
        else setTodos(data || []);
    };

    useEffect(() => {
        fetchTodos();
    }, [filter]);

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) {
            console.error("Fehler beim Löschen:", error.message);
        } else {
            setTodos(todos.filter((todo) => todo.id !== id));
            reloadCategories(); // 🟢 Kategorien neu laden
        }
    };

    return (
        <div className="p-4 w-full">
            <h2 className="text-xl font-bold">📋 Todos</h2>

            <ul className="mt-4 w-[450px] m-50">
                {todos.map((todo) => (
                    <li key={todo.id} className="border bg-sec text-light p-2 rounded mt-2">
                        <p className="text-center border-b-1 font-bold mb-1">{todo.category}</p>
                        <div className="flex justify-between items-center">
                            <span>{todo.title}</span>
                            <button
                                className="bg-light text-dark px-3 py-1 rounded"
                                onClick={() => handleDelete(todo.id)}
                            >
                                <span className="flex justify-between items-center mx-0.5"><FaRegTrashCan /> Delete</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
