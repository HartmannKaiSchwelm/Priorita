import React, { useState} from "react";
import { supabase } from "../supabase";
type TodoFormProps = {
    onClose: () => void;
    refreshCategories: () => void;
    categories: string[]; // 🟢 Kategorien als Prop
    setCategories: (categories: string[]) => void; // 🟢 Setter-Funktion als Prop
};

export default function TodoForm({ onClose, refreshCategories, categories, setCategories }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [priority, setPriority] = useState(0);
    const [dueDate, setDueDate] = useState("");

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        // Hole den aktuellen Benutzer direkt
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !currentUser) return alert("Nicht eingeloggt!");

        // Falls eine neue Kategorie eingegeben wurde → Diese verwenden
        let categoryToSave = newCategory.trim() ? newCategory.trim() : selectedCategory;

        // Falls die neue Kategorie nicht existiert, zur DB & zur Liste hinzufügen
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]); // 🟢 Kategorien im übergeordneten Zustand aktualisieren
        }

        const { error } = await supabase.from("todos").insert([
            {
                title: title,
                user_id: currentUser.id,
                priority,
                category: categoryToSave,
                due_date: dueDate ? dueDate : null
            }
        ]);

        if (error) console.error("Fehler beim Speichern:", error.message);
        else {
            setTitle("");
            setNewCategory("");
            setSelectedCategory("");
            setPriority(1);
            setDueDate("");
            refreshCategories(); // 🟢 Kategorien neu laden
            onClose();
        }
    };

    return (
        <form onSubmit={addTodo} className="flex flex-col gap-2 p-4 bg-gray-100 rounded shadow mx-50">
            <h2 className="text-xl font-bold">Neues Todo erstellen</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Neues Todo..."
                className="border p-2 rounded"
                required />

            {/* Dropdown categories */}
            <label>Kategorie:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
                <option value="">Wähle eine Kategorie</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* 🆕 Eigene Kategorie */}
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Oder neue Kategorie eingeben..."
                className="border p-2 rounded"
            />

            {/* DropDown priority */}
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="border p-2 rounded">
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
            </select>

            {/* Deadline  */}
            <label>Deadline-Date</label>
            <input type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 rounded" />

            {/* buttons */}
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    ➕ Hinzufügen
                </button>
                <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
                    ❌ Abbrechen
                </button>
            </div>
        </form>
    );
}
