# 🖥️ Multi-Agent Autonomous Job Search System - Frontend UI

The interactive, responsive single-page application dashboard built with **React**, **Vite**, and modular styling layouts. This interface serves as the visualization and human-in-the-loop validation layer for the multi-agent automation backend loop.

---

## 🎨 User Interface & Page Workspaces

The application maps frontend routes and interactive components directly to the specialized execution nodes inside the autonomous backend graph:

*   **`Landing Page` (`src/pages/Landing.jsx`)** — System onboarding landing interface including features overview and execution workflows layouts.
*   **`Master Resume Entry` (`src/pages/MasterResume.jsx`)** — Secure playground to drop/upload your raw core PDF resume, executing the background parsing sequence.
*   **`Interactive Workspace` (`src/pages/WorkSpace.jsx`)** — The core engine room where users process live iterations, submit continuous refinement feedback loops, and tweak agent outputs.
*   **`Main Metrics Dashboard` (`src/pages/Dashboard.jsx`)** — Houses data aggregators, matching circles, scoring matrices, and macro tracking boards.
*   **`Applications Ledger` (`src/pages/Applications.jsx`)** — Central tracking board for applications flagged as `ready` by the agent graph.

---

## 🏗️ UI Architecture & File Hierarchy

```text
src/
├── assets/          # Static layout assets and global branding marks
├── components/      # Atomized, reusable functional layouts
│   ├── dashboard/   # Specialized dashboard micro-cards (StatCard, RecommendedJobs)
│   └── common/      # Global shell nodes (Sidebar, Topbar, Layout, SkillBadge)
├── lib/             # Backend connector protocols
│   ├── api.js       # Asynchronous Axios/Fetch engine tracking backend endpoints
│   └── diff.js      # Text mutation and revision highlight calculations
├── pages/           # View layout states mapped to agent execution checkpoints
└── styles/          # Fragmented CSS definitions governing interface themes
```

---

## 🛠️ Technical Implementation Stack

*   **Core UI Engine:** React 19 (Functional Components, Hooks API)
*   **Compilation & Scaffolding Bundler:** Vite
*   **Code Sanity Layer:** ESLint + Prettier
*   **Communication Gateway:** Asynchronous Fetch Client Engine (`src/lib/api.js`)

---

## 🚀 Local Deployment Instructions

### 1. Replicate Project Locally
Clone down the standalone user-interface layer repository:
```bash
git clone https://github.com
cd multi-agent-job-search-frontend
```

### 2. Node Dependency Setup
Install the necessary package blocks specified inside the `package.json` layout tree:
```bash
npm install
```

### 3. Local Development Server Execution
Launch the local Hot-Module-Replacement (HMR) node engine instance:
```bash
npm run dev
```
The interface will boot up locally at **`http://localhost:5173`**. Ensure your FastAPI companion server is executing locally at **`http://127.0.0.1:8000`** to support end-to-end data fetching.
