# Chatbot Guide

The chatbot is completely offline and does not use OpenAI, Gemini, or any paid API.

## Files

- `src/chatbot/about-sachin.md`
- `src/chatbot/skills.md`
- `src/chatbot/projects.md`
- `src/chatbot/contact.md`
- `src/chatbot/knowledge.ts`

The Markdown files are the human-readable knowledge base. `knowledge.ts` contains the browser-ready structured version used by the chatbot UI.

## Supported Questions

- Who is Sachin?
- What skills does he have?
- What is he learning?
- How can I contact him?
- What projects has he built?

## How It Works

The chatbot normalizes the user's question, matches it against keyword groups, and returns a prepared answer. If no match is found, it suggests supported questions.

## Future Upgrade Path

The local matcher can later be replaced with a small client-side search index, embeddings generated at build time, or Markdown parsing during the build process.
