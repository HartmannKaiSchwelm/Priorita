import React, { useState } from "react";
import { supabase } from "../supabase";

const DEFAULT_CATEGORIES = [
    "Work",
    "Personal",
    "Shopping",
    "Health",
    "Education",
    "Home",
    "Urgent"
];

type TodoFormProps = {
    onClose: () => void;
    refreshCategories: () => void;
    categories: string[]; // 🟢 Kategorien als Prop
    setCategories: (categories: string[]) => void; // 🟢 Setter-Funktion als Prop
};

export default function TodoForm({ onClose, refreshCategories, categories, setCategories }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [priority, setPriority] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [dateError, setDateError] = useState("");

    // Combine default and user categories, remove duplicates
    const allCategories = [...new Set([...DEFAULT_CATEGORIES, ...categories])].sort();

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    const validateDate = (date: string) => {
        if (!date) return true; // Optional date is valid
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
        
        if (selectedDate < today) {
            setDateError("Deadline cannot be in the past");
            return false;
        }
        setDateError("");
        return true;
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDueDate(newDate);
        validateDate(newDate);
    };

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;
        if (!validateDate(dueDate)) return;

        // Hole den aktuellen Benutzer direkt
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !currentUser) return alert("Not logged in!");

        // Verwende die neue Kategorie, wenn sie eingegeben wurde, sonst die ausgewählte Kategorie
        const categoryToSave = newCategory.trim() || selectedCategory;

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

        if (error) {
            alert("Error saving todo. Please try again.");
        } else {
            setTitle("");
            setNewCategory("");
            setSelectedCategory("");
            setPriority(1);
            setDueDate("");
            refreshCategories();
            onClose();
        }
    };

    return (
        <form onSubmit={addTodo} className="flex flex-col gap-4 bg-transparent rounded">
            <h2 className="text-xl font-bold mb-2">New Todo</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Todo..."
                className="border p-2 rounded"
                required />

            {/* Dropdown categories */}
            <label>Category:</label>
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                className="border p-2 rounded"
            >
                <option value="">Select a category</option>
                {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Eigene Kategorie */}
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Or enter new category..."
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
            <label>Deadline</label>
            <div className="flex flex-col gap-1">
                <input 
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                    min={today}
                    className={`border p-2 rounded ${dateError ? 'border-red-500' : ''}`}
                />
                {dateError && (
                    <p className="text-red-500 text-sm">{dateError}</p>
                )}
            </div>

            {/* buttons */}
            <div className="flex flex-col gap-2 mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    ➕ Add
                </button>
                <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 active:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    ❌ Cancel
                </button>
            </div>
        </form>
    );
}
