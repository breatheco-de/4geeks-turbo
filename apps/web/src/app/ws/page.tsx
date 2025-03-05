"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function Index() {
  const [messages, setMessages] = useState<{ message: string; me: boolean }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/ws");
    setWs(socket);

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: event.data, me: false },
      ]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = async () => {
    if (ws && input.trim() !== "") {
      // if (input.trim() !== "") {
      ws.send(input);
      setInput("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: input, me: true },
      ]);

      // const { hc } = await import("hono/client");

      // const client = hc<AppType>("http://localhost:4000");
      // // const ws = client.ws.$ws(0);
      // const ws = client.ws.$ws(input);

      // ws.addEventListener("open", () => {
      //   setInterval(() => {
      //     ws.send(new Date().toString());
      //   }, 1000);
      // });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">WebSocket Demo</h1>
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </div>
      <ul className="list-disc pl-5">
        {messages.map((message, index) => (
          <li key={index} className="mb-2">
            {message.me ? (
              <span className="font-bold">{message.message}</span>
            ) : (
              <span>{message.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
