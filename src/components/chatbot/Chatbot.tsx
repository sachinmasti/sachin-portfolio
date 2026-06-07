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
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm rounded-[24px] border border-white/[0.1] bg-void p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-bone">Ask Sachin AI</p>
                <p className="text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">Offline knowledge-base chatbot</p>
              </div>
              <button
                type="button"
                aria-label="Close chatbot"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-[24px] border border-line text-bone"
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
                        ? "rounded-[24px] bg-plum-voltage text-bone"
                        : "rounded-[24px] border border-white/[0.1] bg-void text-ash"
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
                    className="rounded-[24px] border border-white/[0.1] px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-smoke transition hover:text-bone"
                >
                  {item}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-h-11 flex-1 rounded-[24px] border border-white/[0.1] bg-void px-4 text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-bone outline-none placeholder:text-smoke focus:border-plum-voltage"
                placeholder="Ask a question..."
              />
              <button
                type="submit"
                aria-label="Send question"
                className="grid h-11 w-11 place-items-center rounded-[24px] bg-plum-voltage text-bone transition hover:opacity-90"
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
        className="grid h-14 w-14 place-items-center rounded-[24px] bg-plum-voltage text-bone"
        data-cursor="magnetic"
      >
        <FiMessageCircle size={22} />
      </button>
    </div>
  );
}
