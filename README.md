# Myanmar AI 🤖

A modern AI-powered Myanmar language assistant built with TypeScript, React, and Vite.

[![Live Demo](https://img.shields.io/badge/Live-Demo-22c55e?style=for-the-badge)](https://myanmar-rho.vercel.app)
[![GitHub](https://img.shields.io/github/stars/amkyawdev/myanmar?style=for-the-badge)](https://github.com/amkyawdev/myanmar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## ✨ Demo

[![Myanmar AI Assistant](https://raw.githubusercontent.com/amkyawdev/myanmar/0c3f491c8fe416635e5ee07133ade77117896c4a/screenshot.png)](https://myanmar-rho.vercel.app)

**Try it live:** 👉 [DEMO](https://myanmar-rho.vercel.app)

---

## 🚀 Features

- 🤖 **AI Chat** - Intelligent Myanmar language assistant powered by Groq API
- 🎨 **Modern UI** - Clean, responsive React components with Radix UI
- 💬 **Real-time Streaming** - Live streaming responses from AI
- 📱 **Mobile First** - Fully responsive design
- ⚡ **Fast Performance** - Built with Vite for optimal speed

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS, Radix UI |
| Build | Vite 7 |
| API | Groq (LLama 3.3) |
| Deploy | Vercel |

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/myanmar.git
cd myanmar

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📁 Project Structure

```
myanmar/
├── api/                  # Serverless API endpoints
│   └── chat.ts           # Groq API proxy
├── client/              # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/     # Page components
│   │   └── hooks/     # Custom hooks
│   └── index.html     # Entry point
├── public/             # Static assets
│   └── skills/       # AI skill definitions
├── vercel.json        # Vercel configuration
└── package.json     # Dependencies
```

---

## 🔧 Configuration

### Environment Variables

Set the following in Vercel project settings:

| Variable | Description |
|----------|------------|
| `GROQ_API_KEY` | Your Groq API key |

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📄 License

MIT License © 2026 [Amkyaw Dev](https://github.com/amkyawdev)

---

<div align="center">

Made with ❤️ for Myanmar developers

</div>
