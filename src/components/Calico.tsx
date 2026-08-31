"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export function Calico() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handleToggle = () => {
    if (isOpen) {
      setMessages([]);
      setInput("");
    }
    setIsOpen((prev) => !prev);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ parts: [{ type: "text", text: input }] });
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.5)] bg-white/70 shadow-lg backdrop-blur-[3px]">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="max-w-[85%] rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-800">
              Hi I&apos;m Calico! Franco&apos;s AI chatbot assistant. How can I
              help you today?
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-neutral-900 text-white"
                    : "bg-white/80 text-gray-800"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  }
                  return null;
                })}
              </div>
            ))}

            {status === "submitted" && (
              <div className="max-w-[85%] rounded-xl bg-white/80 px-3 py-2 text-sm text-gray-500">
                Calico is typing…
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 border-t border-[rgba(255,255,255,0.5)] p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Calico..."
              className="flex-1 rounded-full bg-white/60 px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={status !== "ready"}
              className="rounded-full bg-neutral-900 px-3 py-2 text-sm text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close Calico chat" : "Chat with Calico"}
        className="flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.5)] bg-white/40 px-5 py-3 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-[3px]"
      >
        {isOpen ? (
          <span className="text-lg leading-none">&times;</span>
        ) : (
          "Chat with Calico"
        )}
      </button>
    </div>
  );
}
