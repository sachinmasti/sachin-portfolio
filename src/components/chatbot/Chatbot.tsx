"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { askKnowledgeBase } from "@/chatbot/knowledge";

type Message = {
  role: "bot" | "user";
  content: string;
};

const suggestions = [
  "Who is Sachin?",
  "What skills does he have?",
  "What is he learning?",
  "How can I contact him?"
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi, I am Sachin AI. Ask me about Sachin, his skills, learning path, projects, or contact details."
    }
  ]);

  const lastMessages = useMemo(() => messages.slice(-8), [messages]);

  function ask(question: string) {
    const clean = question.trim();
    if (!clean) return;
    const answer = askKnowledgeBase(clean);
    setMessages((items) => [
      ...items,
      { role: "user", content: clean },
      { role: "bot", content: answer }
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm border border-white/[0.12] bg-black/95 p-4 shadow-2xl shadow-black/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Ask Sachin AI</p>
                <p className="text-xs text-muted">Offline knowledge-base chatbot</p>
              </div>
              <button
                type="button"
                aria-label="Close chatbot"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
              {lastMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}-${message.content}`}
                  className={message.role === "user" ? "text-right" : "text-left"}
                >
                  <p
                    className={`inline-block max-w-[85%] px-3 py-2 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-accent text-white"
                        : "border border-white/10 bg-white/[0.04] text-white/[0.84]"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => ask(item)}
                  className="border border-white/10 px-2.5 py-1.5 text-xs text-white/[0.76] transition hover:border-accent hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-h-11 flex-1 border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-accent"
                placeholder="Ask a question..."
              />
              <button
                type="submit"
                aria-label="Send question"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-accent hover:text-white"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Open Ask Sachin AI"
        onClick={() => setOpen((value) => !value)}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/25"
        data-cursor="magnetic"
      >
        <FiMessageCircle size={22} />
      </button>
    </div>
  );
}
