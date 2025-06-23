"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Gagal mengambil pesan:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/messages", { name, message });
      setName("");
      setMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-1/3 bg-teal-600 text-white flex flex-col items-center justify-center p-6">
        <div className="text-5xl mb-4">📓</div>
        <h1 className="text-3xl font-bold text-center">Mini Guestbook</h1>
        <p className="mt-2 text-sm text-teal-100 text-center">
          Tinggalkan pesanmu dan lihat pesan dari orang lain ✍️
        </p>
      </aside>

      <section className="w-full md:w-2/3 p-6">
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pesan"
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white p-2 rounded w-full hover:bg-teal-700 transition"
          >
            Kirim
          </button>
        </form>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex gap-4 p-4 border rounded shadow-sm bg-white"
            >
              <div className="bg-teal-100 text-teal-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                💬
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{msg.name}</p>
                <p className="text-gray-700">{msg.message}</p>
                <small className="text-gray-400 block mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
