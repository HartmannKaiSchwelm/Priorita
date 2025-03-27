// src/pages/Login.tsx
import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
          console.log('Attempting login with:', email);
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
    
          if (error) {
            console.error('Supabase Login Error:', error);
            setError(error.message);
            return;
          }
    
          if (data.user) {
            console.log('Login successful');
            navigate('/dashboard');
          }
        } catch (err) {
          console.error('Unexpected login error:', err);
          setError('An unexpected error occurred. Please try again.');
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form 
            onSubmit={handleLogin} 
            className="bg-white p-8 rounded shadow-md w-96"
          >
            <h2 className="text-2xl mb-4">Login</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      );
    }