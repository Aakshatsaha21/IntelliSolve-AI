# IntelliSolve AI — Multi-Agent Problem-Solving Platform

**IntelliSolve AI** is an interactive, frontend-only multi-agent problem-solving and code generation platform built with React, TypeScript, and Tailwind CSS. It demonstrates how autonomous specialized agents collaborate to analyze complex challenges, generate diverse candidate architectures, mathematically evaluate trade-offs, and iteratively refine solutions.

---

## 🌟 Key Features

### 1. Multi-Agent Arena
- **Four Specialized Autonomous Agents**:
  - 💡 **Innovator Agent**: Surfaces creative ideation and non-traditional vectors.
  - 💻 **Engineer Agent**: Validates technical feasibility, schemas, and resource allocations.
  - 📊 **Analyst Agent**: Conducts rigorous failure-mode audits, security boundaries, and trade-off analysis.
  - 🎯 **Optimizer Agent**: Synthesizes iterative refinements based on evaluation critique.
- **6-Stage Interactive Workflow**:
  1. Problem Analysis
  2. Solution Generation
  3. Multi-Criteria Evaluation
  4. Controlled Testing Demo
  5. Iterative Refinement
  6. Final Ranking & Synthesis
- Interactive execution controls: **Start Simulation**, **Pause**, **Resume**, **Reset**, and variable simulation speed (Fast / Normal / Slow).

### 2. Deterministic 5-Dimension Scoring Engine
- Dynamic mathematical evaluation based on transparent formula:
  $$\text{Score} = \sum (\text{Criterion Score} \times \text{Weight \%})$$
- Real-time interactive weight sliders with auto-normalization ensuring $\sum = 100\%$:
  - **Correctness & Requirement Alignment** (Default: 30%)
  - **Technical Feasibility** (Default: 25%)
  - **Reliability & Robustness** (Default: 20%)
  - **Resource Efficiency** (Default: 15%)
  - **Architectural Innovation** (Default: 10%)
- Live data visualizations using **Recharts**:
  - Horizontal Bar Chart of composite scores
  - Multi-axial Radar Chart for comparative trade-off profiling

### 3. Side-by-Side Solution Comparison
- Compares realistic candidate solutions for the student attendance management challenge:
  1. *QR Code-Based Dynamic Attendance*
  2. *RFID-Based Physical Badge Scanner System*
  3. *Smart Dynamic QR with Behavioral Anomaly Detection* (Recommended)
- Multi-dimensional tabs: **Overview & Approach**, **Architecture & Resources**, **Advantages & Limitations**, **Risks & Assumptions**, and **Revision History**.
- Multi-criteria sorting: Highest Score, Lowest Complexity, Highest Feasibility, and Lowest Risk.

### 4. Iterative Architecture Refinement
- Demonstrates before-and-after score uplifts with explicit delta indicators.
- Side-by-side weakness remediation (Analyst critiques vs. Optimizer enhancements).
- Interactive "Improve Solution" trigger that updates model data and recalculates weighted scores in real-time.

### 5. Final Recommendation Dossier & Export
- Comprehensive selection rationale and comparison against competing alternatives.
- Phased 4-stage implementation roadmap.
- **Export Capabilities**:
  - Copy formatted recommendation text to clipboard
  - Export full audit report as structured JSON
  - Browser print & Save to PDF dialog styling (`@media print`)

### 6. Interactive Code Generation & Live Sandbox Workspace (Section 19)
- **Automatic Coding Problem Detection**: Detects programming keywords and launches the dedicated code workspace.
- **Support for 8 Languages**: HTML, CSS, JavaScript, TypeScript, Python, Java, C++, React.
- **Curated Template Library**:
  - Student Grade & GPA Calculator
  - Interactive Counter with Undo History
  - Dynamic Task & Priority Manager (To-Do List)
  - Accessible & Responsive Auth Portal (Login Page)
  - Precision Scientific Calculator
  - Longest Word in a Sentence Analyzer (Python)
  - High-Performance Primality Checker with 6k ± 1 Optimization (C++)
  - Dual-Algorithm Quicksort vs Merge Sort Analyzer (Python)
- **Live Sandboxed Preview**: Renders HTML/CSS/JavaScript and React apps in a secure `iframe` with live DOM interaction.
- **Simulated Execution Console**: Formatted terminal output for Python, Java, and C++ algorithms.
- **Structured Explanations**: Algorithmic complexity ($O(N)$ time/space), step-by-step execution, functions, important variables, and edge cases.
- **Code Optimization & Diffs**: Side-by-side comparison of naive vs. production code with engineering rationale.
- **Project Export**: Download individual files or export multi-file projects as a ZIP archive (powered by JSZip).

### 7. Session Archives & Local Storage Persistence
- Saves problem submissions, candidate rankings, and custom weights into `localStorage`.
- Search, filter, re-load historical sessions, and safely delete archives.
- Application preferences (Theme, Simulation Speed, Default Weights) persist across page reloads.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (Responsive Bar Chart & Radar Chart)
- **Icons**: Lucide React
- **Archiving**: JSZip (ZIP file generator)
- **Build**: Vite

---

## 🚀 Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🔒 Frontend-Only Disclaimer

IntelliSolve AI is a client-side frontend demonstration. All agent workflows, test cases, and candidate solutions operate deterministically using local browser state and mock models. No external AI APIs (e.g. Gemini, OpenAI) or remote cloud databases are queried.
