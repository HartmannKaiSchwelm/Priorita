import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext"; // Falls Auth benötigt wird
import { FaRegTrashCan } from "react-icons/fa6";
type Todo = {
    id: number;
    title: string;
    category: string;
};

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const { user } = useAuth(); // Falls Auth nötig ist

    // 🟢 Todos aus Supabase abrufen
    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: false });

        if (error) console.error("Fehler beim Abrufen:", error.message);
        else setTodos(data || []);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // 🛑 FALSCH: Direktes Löschen im onClick → UI wird nicht aktualisiert!
    // ❌ onClick={() => supabase.from("todos").delete().eq("id", todo.id)}

    // ✅ RICHTIG: Separates `handleDelete`, das die UI aktualisiert
    const handleDelete = async (id: number) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) {
            console.error("Fehler beim Löschen:", error.message);
        } else {
            // 🟢 Erfolgreich gelöscht → Todo aus dem State entfernen
            setTodos(todos.filter((todo) => todo.id !== id));
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
                                <span className="flex justify-between items-center mx-0.5"><FaRegTrashCan/> Delete</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
