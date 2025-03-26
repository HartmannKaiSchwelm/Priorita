// src/pages/Login.tsx
import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert("Fehler beim Login: " + error.message);
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <input
                type="email"
                placeholder="E-Mail"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Passwort"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white">
                Login
            </button>
        </div>
    );
}
