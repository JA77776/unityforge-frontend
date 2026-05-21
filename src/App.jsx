import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "./supabase";

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    fetchMessages();
  }, []);

  const checkUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const signUp = async () => {
    await supabase.auth.signUp({
      email,
      password
    });

    alert("Check your email.");
  };

  const signIn = async () => {
    const { data } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    setUser(data.user);
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/messages"
      );

      setMessages(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const askAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3001/ask-ai",
        {
          prompt
        }
      );

      setPrompt("");

      await fetchMessages();

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        
        <div className="bg-slate-900 p-10 rounded-3xl w-full max-w-md border border-slate-800">

          <h1 className="text-4xl font-bold mb-6">
            UnityForge AI
          </h1>

          <div className="flex flex-col gap-4">

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="bg-slate-800 p-4 rounded-xl"
            />

            <button
              onClick={signUp}
              className="bg-blue-600 p-4 rounded-xl font-bold"
            >
              Sign Up
            </button>

            <button
              onClick={signIn}
              className="bg-emerald-600 p-4 rounded-xl font-bold"
            >
              Sign In
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      <header className="border-b border-slate-800 p-5">
        <h1 className="text-3xl font-bold">
          UnityForge AI
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl p-5 rounded-2xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-slate-900 border border-slate-800 self-start"
            }`}
          >
            <div className="font-bold mb-2">
              {msg.role === "user"
                ? "You"
                : "Donn"}
            </div>

            <div>
              {msg.text}
            </div>
          </div>
        ))}

      </main>

      <div className="border-t border-slate-800 p-5">
        
        <div className="flex gap-4">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Donn anything..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none resize-none h-24"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="bg-blue-600 px-8 rounded-2xl font-bold"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;