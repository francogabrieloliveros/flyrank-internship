# Send the Link: Launch, Demo & Story

## General AI Fluency — Capstone

**Live site:** https://franco-oliveros.dev

**One claim:** I build concurrent backend systems and AI-powered pipelines that stay stable under load.

https://github.com/user-attachments/assets/efaa9098-e82e-47d3-a2da-1d9c91b78a3f

---

## The Build Write-Up

- **Stack chosen and why:** Next.js, since I wanted to move off MERN and learn a new framework and Vercel AI SDK for Calico because it's already TypeScript-native and integrates natively with Next.js.
- **Hardest thing that broke:** The LLM integration itself and getting Calico's responses to be reliable. Moreover, I had to build guardrails so it stays on-topic and doesn't hallucinate answers about me.
- **What I'd build next:** Outside of the internship capstones, I want to build an AI workflow/agent that turns a topic into a PowerPoint deck; letting the user specify the topic, where to source information, a color palette, and the audience the design should be styled for.

**Plan to keep building:**

- **Next piece:** The topic-to-PowerPoint AI agent described above.
- **Reminder:** I'd place myself on a deadline before christmas. I think its a sufficient amount of time and Christmas itself is an unforgettable deadline.

---

## The Build-in-Public Story

**The win:** With enough context fed to the LLM, it produced a website that actually followed my design philosophy — not a generic template, but something that reflected specific taste and intent I'd given it.

**The limitation:** Layout consistency, glassmorphism effects, and dynamic mobile styling all needed manual correction — the AI's first passes didn't hold up across breakpoints or maintain visual consistency site-wide. Coming from React, Next.js itself was an easy pickup, but there were still real gaps (routing model, rendering strategy, SDK integration patterns) I had to learn by hand rather than prompt my way through.
