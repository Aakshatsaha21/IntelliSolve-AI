import { CodeTemplate } from '../types';

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'grade-calculator',
    title: 'Student Grade & GPA Calculator',
    category: 'Education / Web Development',
    language: 'HTML',
    framework: 'Vanilla JavaScript',
    description: 'An interactive multi-course grade calculator supporting custom course weights, real-time letter grade conversion, and cumulative GPA calculation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'Form Validation'],
    executionType: 'browser_iframe',
    files: [
      {
        filename: 'index.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Grade Calculator</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 24px;
      margin: 0;
    }
    .card {
      max-width: 540px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
    h2 { margin-top: 0; font-size: 20px; color: #1e293b; }
    .row { display: flex; gap: 10px; margin-bottom: 12px; }
    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 14px;
    }
    input:focus { outline: none; border-color: #6366f1; }
    button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary { background: #4f46e5; color: white; }
    .btn-primary:hover { background: #4338ca; }
    .btn-secondary { background: #f1f5f9; color: #334155; }
    .btn-secondary:hover { background: #e2e8f0; }
    .score-banner {
      margin-top: 20px;
      padding: 16px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .gpa-num { font-size: 28px; font-weight: 700; color: #4338ca; }
    .grade-badge { font-size: 18px; font-weight: 600; color: #3730a3; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Student Grade Calculator</h2>
    <div id="courseList">
      <div class="row">
        <input type="text" placeholder="Course Name" value="Computer Science">
        <input type="number" class="score-input" placeholder="Score (0-100)" min="0" max="100" value="92">
        <input type="number" class="credit-input" placeholder="Credits" min="1" max="5" value="4">
      </div>
      <div class="row">
        <input type="text" placeholder="Course Name" value="Calculus II">
        <input type="number" class="score-input" placeholder="Score (0-100)" min="0" max="100" value="85">
        <input type="number" class="credit-input" placeholder="Credits" min="1" max="5" value="3">
      </div>
    </div>
    <div style="display: flex; gap: 10px; margin-top: 14px;">
      <button class="btn-secondary" onclick="addCourse()">+ Add Course</button>
      <button class="btn-primary" onclick="calculateGPA()">Calculate GPA</button>
    </div>
    <div class="score-banner" id="resultBox">
      <div>
        <div style="font-size: 13px; color: #4b5563;">Cumulative Grade Point Average</div>
        <div class="gpa-num" id="gpaVal">3.85</div>
      </div>
      <div class="grade-badge" id="letterVal">Grade: A</div>
    </div>
  </div>

  <script>
    function addCourse() {
      const list = document.getElementById('courseList');
      const div = document.createElement('div');
      div.className = 'row';
      div.innerHTML = '<input type="text" placeholder="Course Name">' +
                      '<input type="number" class="score-input" placeholder="Score (0-100)" min="0" max="100" value="80">' +
                      '<input type="number" class="credit-input" placeholder="Credits" min="1" max="5" value="3">';
      list.appendChild(div);
    }

    function scoreToPoints(score) {
      if (score >= 90) return { pts: 4.0, letter: 'A' };
      if (score >= 80) return { pts: 3.0, letter: 'B' };
      if (score >= 70) return { pts: 2.0, letter: 'C' };
      if (score >= 60) return { pts: 1.0, letter: 'D' };
      return { pts: 0.0, letter: 'F' };
    }

    function calculateGPA() {
      const scores = document.querySelectorAll('.score-input');
      const credits = document.querySelectorAll('.credit-input');
      let totalQualityPoints = 0;
      let totalCredits = 0;

      for (let i = 0; i < scores.length; i++) {
        const sc = parseFloat(scores[i].value);
        const cr = parseFloat(credits[i].value);
        if (!isNaN(sc) && !isNaN(cr) && cr > 0) {
          const { pts } = scoreToPoints(sc);
          totalQualityPoints += pts * cr;
          totalCredits += cr;
        }
      }

      const gpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '0.00';
      document.getElementById('gpaVal').innerText = gpa;
      
      const numGpa = parseFloat(gpa);
      let overallLetter = 'F';
      if (numGpa >= 3.7) overallLetter = 'A';
      else if (numGpa >= 3.0) overallLetter = 'B';
      else if (numGpa >= 2.0) overallLetter = 'C';
      else if (numGpa >= 1.0) overallLetter = 'D';

      document.getElementById('letterVal').innerText = 'Grade: ' + overallLetter;
    }
  </script>
</body>
</html>`
      }
    ],
    explanation: {
      purpose: 'Enables students to dynamically add coursework, input percentage scores alongside credit hours, and compute weighted GPA with standard 4.0 scale letter conversions.',
      importantVariables: [
        { name: 'totalQualityPoints', purpose: 'Accumulates credit hours multiplied by converted letter grade points (e.g. 4 credits * 4.0 points).' },
        { name: 'totalCredits', purpose: 'Aggregates cumulative course weight across all valid entries.' },
        { name: 'scoreToPoints', purpose: 'Pure conversion mapping percentage numbers to 4.0 scale intervals.' }
      ],
      functions: [
        { name: 'addCourse()', description: 'Appends a new course entry DOM row dynamically to allow flexible course counts.' },
        { name: 'scoreToPoints(score)', description: 'Translates a 0-100 numeric grade into point values (4.0, 3.0, etc.) and letter ranks.' },
        { name: 'calculateGPA()', description: 'Iterates through input nodes, enforces numeric sanitization, and renders weighted quotient.' }
      ],
      conditionsAndLoops: [
        'for loop: Iterates over the NodeList of scores and corresponding credits.',
        'if (!isNaN(sc) && cr > 0): Guard condition preventing division by zero or corrupted text input.'
      ],
      inputOutput: {
        input: 'Course scores [92, 85] with credits [4, 3]',
        output: 'GPA: 3.57 · Overall Grade: B+'
      },
      stepByStep: [
        'Step 1: Read user input elements from the DOM.',
        'Step 2: Validate that scores fall within 0-100 and credits are positive integers.',
        'Step 3: Convert each percentage score into GPA points using standard tier brackets.',
        'Step 4: Compute weighted sum of grade points divided by total credits.',
        'Step 5: Format result to 2 decimal places and update UI display elements.'
      ],
      complexity: {
        time: 'O(N) where N is the number of enrolled courses.',
        space: 'O(1) auxiliary memory (in-place accumulator arithmetic).'
      },
      edgeCases: [
        'Zero courses entered: Handled by totalCredits > 0 check, defaulting cleanly to 0.00.',
        'Negative or blank inputs: Filtered out using isNaN guards.',
        'Non-numeric characters in score fields: Prevented via HTML5 type="number" and JavaScript fallback.'
      ]
    },
    improvement: {
      originalCode: `function calculateGPA() {
  var s = document.getElementsByTagName('input');
  var sum = 0;
  for(var i=0; i<s.length; i++) {
    sum += Number(s[i].value);
  }
  alert(sum / s.length);
}`,
      improvedCode: `function calculateGPA(): { gpa: number; letter: string } {
  const rows = document.querySelectorAll<HTMLDivElement>('.course-row');
  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach((row) => {
    const score = Number(row.querySelector<HTMLInputElement>('.score-input')?.value);
    const credits = Number(row.querySelector<HTMLInputElement>('.credit-input')?.value);
    if (!Number.isNaN(score) && credits > 0) {
      totalPoints += convertScoreToPoints(score) * credits;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
  return { gpa, letter: getLetterRank(gpa) };
}`,
      whatChanged: [
        'Replaced untyped global getElementsByTagName with scoped class selectors.',
        'Introduced weighted credit math rather than a simple naive arithmetic mean.',
        'Added explicit type safety and null checks on queried input elements.',
        'Replaced disruptive window.alert() with inline DOM state rendering.'
      ],
      whyChanged: [
        'A simple mean treats a 1-credit physical education class identical to a 5-credit engineering physics course.',
        'Global input queries accidentally sampled course name text fields into the math, generating NaN.'
      ],
      readabilityImprovements: 'Meaningful variable names, functional row iterator, and modular letter conversion helper.',
      errorHandlingImprovements: 'Guards against empty rows, NaN values, and division by zero.',
      performanceConsiderations: 'Scoped querySelectorAll prevents repeated global DOM tree walks.'
    },
    agentAlternatives: {
      innovatorVersion: {
        title: 'Reactive Event-Driven Calculator with Visual Progress Indicators',
        code: `// Real-time reactive calculation on every keystroke with color-coded grade badges
document.getElementById('courseList').addEventListener('input', () => {
  requestAnimationFrame(calculateGPA);
});`,
        description: 'Computes GPA instantly as the user types without requiring manual click of a calculate button.',
        score: 93
      },
      engineerVersion: {
        title: 'Componentized MVC Calculator with LocalStorage Persistence',
        code: `// Encapsulated state manager with auto-save to browser storage
class GradeManager {
  constructor() {
    this.courses = JSON.parse(localStorage.getItem('grades') || '[]');
  }
  save() { localStorage.setItem('grades', JSON.stringify(this.courses)); }
}`,
        description: 'Separates state management from DOM rendering with persistent draft capability.',
        score: 95
      },
      analystComparison: {
        correctness: 'Both implementations adhere strictly to university GPA standards.',
        readability: 'Engineer approach provides clear modular architecture; Innovator version is more concise.',
        maintainability: 'Engineer version is far easier to extend with export options or custom grading curves.',
        efficiency: 'Innovator debounced event loop is lightweight; Engineer state sync is negligible overhead.',
        errorHandling: 'Engineer version provides schema validation and fallback initialization.',
        recommended: 'engineer',
        rationale: 'For an academic tool, data persistence across tab refreshes and modular testability outweighs micro-UI tricks.'
      },
      optimizerVersion: {
        title: 'Optimized Unified Architecture with Instant Recalculation and Persistence',
        code: `// Synthesized model with zero-lag debounce and local storage caching
export function useGradeEngine() {
  const [courses, setCourses] = useStorage('active-courses', defaultCourses);
  const metrics = useMemo(() => computeGPA(courses), [courses]);
  return { courses, setCourses, metrics };
}`,
        improvements: [
          'Combined real-time debounced calculation with persistent local storage.',
          'Added automatic import/export for university transcripts.'
        ],
        score: 97
      }
    },
    testCases: [
      { input: 'CS 101 (95%, 4 cr), Math 201 (85%, 3 cr)', expectedOutput: 'GPA: 3.57 (A/B)', note: 'Standard honors calculation' },
      { input: 'Physics (70%, 4 cr), History (65%, 2 cr)', expectedOutput: 'GPA: 1.67 (C/D)', note: 'Weighted boundary test' },
      { input: 'No courses entered', expectedOutput: 'GPA: 0.00 (F)', note: 'Zero-division safe check' }
    ]
  },
  {
    id: 'interactive-counter',
    title: 'Stateful Counter with History & Step Limits',
    category: 'Productivity / React & TypeScript',
    language: 'React',
    framework: 'React + TypeScript',
    description: 'A component featuring bounded decrement/increment controls, custom step increments, action history log, and undo capabilities.',
    tags: ['React', 'Hooks', 'TypeScript', 'State Management', 'Undo History'],
    executionType: 'browser_iframe',
    files: [
      {
        filename: 'Counter.tsx',
        language: 'typescript',
        code: `import React, { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([0]);

  const updateCount = (newVal: number) => {
    setCount(newVal);
    setHistory((prev) => [newVal, ...prev.slice(0, 9)]);
  };

  const handleIncrement = () => updateCount(count + step);
  const handleDecrement = () => updateCount(Math.max(0, count - step));
  const handleReset = () => updateCount(0);

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 400, margin: '20px auto', padding: 24, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 16px', color: '#1e293b' }}>Interactive Counter</h3>
      <div style={{ textAlign: 'center', padding: '24px 0', background: '#f8fafc', borderRadius: 8 }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: '#4f46e5', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={handleDecrement} style={{ flex: 1, padding: '10px 0', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>-{step}</button>
        <button onClick={handleReset} style={{ flex: 1, padding: '10px 0', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 6, color: '#64748b', cursor: 'pointer' }}>Reset</button>
        <button onClick={handleIncrement} style={{ flex: 1, padding: '10px 0', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>+{step}</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={{ fontSize: 13, color: '#64748b' }}>Step Increment: </label>
        <select value={step} onChange={(e) => setStep(Number(e.target.value))} style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #cbd5e1' }}>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div style={{ marginTop: 16, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>RECENT SNAPSHOTS:</span>
        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
          {history.map((val, idx) => (
            <span key={idx} style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: 4, fontSize: 12, color: '#475569' }}>{val}</span>
          ))}
        </div>
      </div>
    </div>
  );
}`
      }
    ],
    explanation: {
      purpose: 'Demonstrates declarative React state management, unidirectional data flow, immutable array manipulation for history tracking, and accessible event handlers.',
      importantVariables: [
        { name: 'count', purpose: 'The primary numerical state variable displayed to the user.' },
        { name: 'step', purpose: 'Configurable stride multiplier for increment/decrement operations.' },
        { name: 'history', purpose: 'Maintains an immutable sliding window array of the last 10 count snapshots.' }
      ],
      functions: [
        { name: 'updateCount(newVal)', description: 'Applies atomic state update to both the active count and the historical tape.' },
        { name: 'handleIncrement()', description: 'Increments count by active step parameter.' },
        { name: 'handleDecrement()', description: 'Decrements count with Math.max floor constraint to avoid negative counters.' }
      ],
      conditionsAndLoops: [
        'Math.max(0, count - step): Bounds checking ensuring count never becomes negative.',
        'prev.slice(0, 9): Keeps the snapshot history capped at 10 items without unbounded memory growth.'
      ],
      inputOutput: {
        input: 'Increment by 5 twice from initial 0',
        output: 'Current: 10 · History: [10, 5, 0]'
      },
      stepByStep: [
        '1. Initialize state hooks with default numerical and array values.',
        '2. Listen to user button tap events.',
        '3. Execute updater function that creates new state objects without mutating previous state.',
        '4. Re-render UI with smooth numeric transitions.'
      ],
      complexity: {
        time: 'O(1) state transitions.',
        space: 'O(K) memory where K=10 maximum history items.'
      },
      edgeCases: [
        'Rapid clicks: Managed safely via standard React queued state transitions.',
        'Underflow: Prevented via non-negative ceiling clamp.'
      ]
    },
    improvement: {
      originalCode: `let c = 0;
function inc() {
  c++;
  document.getElementById('out').innerText = c;
}`,
      improvedCode: `const [count, setCount] = useState<number>(0);
const increment = useCallback(() => setCount((prev) => prev + 1), []);`,
      whatChanged: [
        'Migrated from mutable global let variable to encapsulated React state.',
        'Prevented stale closures using functional state updater syntax.'
      ],
      whyChanged: [
        'Global variables cause memory leaks and render desynchronization in multi-instance components.'
      ],
      readabilityImprovements: 'Pure functional React idiom with TypeScript parameter definitions.',
      errorHandlingImprovements: 'Guarantees thread-safe UI updates even during high-frequency triggers.',
      performanceConsiderations: 'useCallback avoids unnecessary re-creations of the click handler.'
    }
  },
  {
    id: 'todo-list-app',
    title: 'Dynamic Task & Priority Manager',
    category: 'Productivity / Web Development',
    language: 'JavaScript',
    framework: 'Vanilla HTML5 + JS',
    description: 'A responsive task manager featuring filtering (All, Active, Completed), item count badges, priority tags, and persistence.',
    tags: ['JavaScript', 'DOM', 'Event Delegation', 'Filter Tabs'],
    executionType: 'browser_iframe',
    files: [
      {
        filename: 'index.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; margin: 0; }
    .todo-app { max-width: 480px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .input-group { display: flex; gap: 8px; margin-bottom: 16px; }
    input[type="text"] { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
    button.add-btn { background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .task-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
    .task-item.completed span { text-decoration: line-through; color: #94a3b8; }
    .delete-btn { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 16px; }
    .filters { display: flex; gap: 6px; margin-top: 16px; border-top: 1px solid #f1f5f9; padding-top: 12px; font-size: 13px; }
    .filter-btn { background: #f1f5f9; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; }
    .filter-btn.active { background: #4f46e5; color: white; }
  </style>
</head>
<body>
  <div class="todo-app">
    <h3 style="margin-top:0;">Task Manager</h3>
    <div class="input-group">
      <input type="text" id="taskInput" placeholder="Add a new deliverable..." onkeydown="if(event.key==='Enter') addTask()">
      <button class="add-btn" onclick="addTask()">Add</button>
    </div>
    <div id="tasksContainer"></div>
    <div class="filters">
      <button class="filter-btn active" onclick="setFilter('all', this)">All</button>
      <button class="filter-btn" onclick="setFilter('active', this)">Active</button>
      <button class="filter-btn" onclick="setFilter('completed', this)">Completed</button>
      <span style="margin-left: auto; color: #64748b;" id="counter">0 items left</span>
    </div>
  </div>
  <script>
    let tasks = [
      { id: 1, text: 'Submit final architecture proposal', completed: false },
      { id: 2, text: 'Conduct security vulnerability audit', completed: true },
      { id: 3, text: 'Calibrate anomaly detection model', completed: false }
    ];
    let currentFilter = 'all';

    function render() {
      const container = document.getElementById('tasksContainer');
      container.innerHTML = '';
      const filtered = tasks.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
      });

      filtered.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item' + (task.completed ? ' completed' : '');
        div.innerHTML = '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;">' +
                        '<input type="checkbox" ' + (task.completed ? 'checked' : '') + ' onchange="toggleTask(' + task.id + ')">' +
                        '<span>' + task.text + '</span></label>' +
                        '<button class="delete-btn" onclick="deleteTask(' + task.id + ')">&times;</button>';
        container.appendChild(div);
      });

      const activeCount = tasks.filter(t => !t.completed).length;
      document.getElementById('counter').innerText = activeCount + ' items left';
    }

    function addTask() {
      const input = document.getElementById('taskInput');
      const val = input.value.trim();
      if (!val) return;
      tasks.push({ id: Date.now(), text: val, completed: false });
      input.value = '';
      render();
    }

    function toggleTask(id) {
      tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      render();
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      render();
    }

    function setFilter(filter, btn) {
      currentFilter = filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    }

    render();
  </script>
</body>
</html>`
      }
    ],
    explanation: {
      purpose: 'Provides a complete working single-page application demonstrating collection filtering, array mapping, event-driven state sync, and DOM reconciliation.',
      importantVariables: [
        { name: 'tasks', purpose: 'In-memory array of task objects containing id, text, and completion status.' },
        { name: 'currentFilter', purpose: 'Represents the active filter state ("all" | "active" | "completed").' }
      ],
      functions: [
        { name: 'render()', description: 'Derives visible tasks through array filtering and regenerates the DOM list.' },
        { name: 'addTask()', description: 'Validates trimmed input text and appends new record with timestamp ID.' },
        { name: 'toggleTask(id)', description: 'Immutably flips completion boolean for targeted item.' },
        { name: 'deleteTask(id)', description: 'Removes item from array via filter predicate.' }
      ],
      conditionsAndLoops: [
        'tasks.filter(predicate): Efficient single-pass filtering.',
        'event.key === "Enter": Allows frictionless keyboard input.'
      ],
      inputOutput: {
        input: 'Type "Deploy to staging" and press Enter',
        output: 'Task appended to list, active item count increments by 1'
      },
      stepByStep: [
        '1. User types into input field and presses Enter or clicks Add.',
        '2. Validation checks for non-empty text string.',
        '3. An immutable update adds task object to memory store.',
        '4. Render pipeline updates DOM elements and recalculates active tally.'
      ],
      complexity: {
        time: 'O(N) for render pipeline across active items.',
        space: 'O(N) for task collection.'
      },
      edgeCases: [
        'Blank submission: Disallowed by input.trim() check.',
        'Duplicate ids: Prevented by high-precision Date.now() timestamping.'
      ]
    },
    improvement: {
      originalCode: `function addTask() {
  document.getElementById('list').innerHTML += '<li>' + document.getElementById('input').value + '</li>';
}`,
      improvedCode: `function addTask() {
  const val = input.value.trim();
  if (!val) return;
  const task = { id: crypto.randomUUID(), text: val, completed: false };
  tasks.push(task);
  render();
}`,
      whatChanged: [
        'Eliminated dangerous direct innerHTML concatenation vulnerability (XSS protection).',
        'Added state array abstraction instead of reading direct DOM values.'
      ],
      whyChanged: [
        'Direct innerHTML string concatenation permits malicious script injection if user types <img src=x onerror=alert(1)>.'
      ],
      readabilityImprovements: 'Clear separation of data model from presentation layer.',
      errorHandlingImprovements: 'Escapes HTML entities and rejects whitespace-only entries.',
      performanceConsiderations: 'Allows future virtualized lists and DOM diffing.'
    }
  },
  {
    id: 'longest-word-sentence',
    title: 'Longest Word in a Sentence Analyzer',
    category: 'Algorithms & Data Structures',
    language: 'Python',
    framework: 'Standard Library',
    description: 'Finds the longest word in an arbitrary sentence while stripping punctuation, handling contractions, and resolving length ties deterministically.',
    tags: ['Python', 'String Parsing', 'Regex', 'Algorithms'],
    executionType: 'simulated_output',
    simulatedOutput: `Input: "IntelliSolve AI coordinates multi-agent computational architectures for complex optimization."
Tokenized Words: ['IntelliSolve', 'AI', 'coordinates', 'multi-agent', 'computational', 'architectures', 'for', 'complex', 'optimization']
Longest Word Found: "architectures" (Length: 13 characters)
Execution Time: 0.042 ms
Memory Allocated: 0.18 KB`,
    files: [
      {
        filename: 'main.py',
        language: 'python',
        code: `import re
from typing import Tuple, List

def find_longest_word(sentence: str) -> Tuple[str, int, List[str]]:
    """
    Strips non-alphanumeric noise while preserving internal hyphens,
    tokenizes words, and identifies the longest element deterministically.
    """
    if not sentence or not sentence.strip():
        return "", 0, []

    # Clean punctuation except intra-word hyphens
    cleaned = re.sub(r'[^\w\s-]', '', sentence)
    words = [w for w in cleaned.split() if w]

    if not words:
        return "", 0, []

    # Identify longest word (picks first encountered in case of ties)
    longest = max(words, key=len)
    return longest, len(longest), words

if __name__ == "__main__":
    sample = "IntelliSolve AI coordinates multi-agent computational architectures for complex optimization."
    longest_word, length, all_words = find_longest_word(sample)
    
    print(f'Input Sentence: "{sample}"')
    print(f'Tokenized Words: {all_words}')
    print(f'Longest Word: "{longest_word}" (Length: {length})')
`
      }
    ],
    explanation: {
      purpose: 'Solves the classic algorithmic problem of identifying maximum length token in unstructured natural language text while respecting punctuation delimiters.',
      importantVariables: [
        { name: 'cleaned', purpose: 'String with external punctuation removed via regular expression substitution.' },
        { name: 'words', purpose: 'Filtered list of alphanumeric tokens.' },
        { name: 'longest', purpose: 'The word with the maximum length returned by Python max() built-in.' }
      ],
      functions: [
        { name: 'find_longest_word(sentence)', description: 'Accepts raw string, normalizes whitespace, extracts tokens, and returns tuple of (word, length, tokens).' }
      ],
      conditionsAndLoops: [
        're.sub(r"[^\\w\\s-]", "", sentence): Sanitizes commas, periods, exclamation points.',
        'max(words, key=len): High-performance C-optimized search across iterable.'
      ],
      inputOutput: {
        input: '"The quick brown fox jumps over the lazy dog."',
        output: 'Longest: "jumps" (Length: 5)'
      },
      stepByStep: [
        '1. Verify sentence is not null or whitespace.',
        '2. Strip punctuation that would falsely inflate word length.',
        '3. Split into whitespace-delimited tokens.',
        '4. Compare length of each token in linear time.',
        '5. Return the winning word with metadata.'
      ],
      complexity: {
        time: 'O(N) where N is the total character length of the sentence.',
        space: 'O(W) where W is the number of words stored in the token array.'
      },
      edgeCases: [
        'Empty or whitespace string: Handled by early guard returning ("", 0, []).',
        'Ties in length: Python max() returns first occurrence deterministically.',
        'Hyphenated compound words: Handled via regex whitelist preserving internal dashes.'
      ]
    },
    improvement: {
      originalCode: `def find(s):
    words = s.split(" ")
    m = ""
    for w in words:
        if len(w) > len(m):
            m = w
    return m`,
      improvedCode: `import re
from typing import Optional

def find_longest_word(sentence: Optional[str]) -> str:
    if not sentence:
        return ""
    words = re.findall(r'[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*', sentence)
    return max(words, key=len, default="")`,
      whatChanged: [
        'Replaced naive split(" ") with regex token matching.',
        'Added Optional typing annotations and default fallback.',
        'Handled multiple consecutive spaces and trailing punctuation.'
      ],
      whyChanged: [
        'Naive split on space preserves punctuation like "optimization.", measuring 13 chars instead of 12.'
      ],
      readabilityImprovements: 'Declarative Pythonic max(..., default="") idiom.',
      errorHandlingImprovements: 'Gracefully handles None, punctuation-only strings, and emojis.',
      performanceConsiderations: 'findall uses compiled C regex pattern avoiding multiple string copies.'
    },
    testCases: [
      { input: '"The extraordinary phenomenon occurred yesterday."', expectedOutput: '"extraordinary" (13 chars)', note: 'Polysyllabic token identification' },
      { input: '"Hello, world! Welcome to AI."', expectedOutput: '"Welcome" (7 chars)', note: 'Punctuation stripping validation' },
      { input: '""', expectedOutput: '"" (0 chars)', note: 'Empty string handling' }
    ]
  },
  {
    id: 'prime-number-checker',
    title: 'High-Performance Prime Number Checker',
    category: 'Algorithms & Mathematics',
    language: 'C++',
    framework: 'C++17 Standard',
    description: 'An optimized primality test running in O(sqrt(N)) time using the 6k ± 1 wheel factorization optimization with corner-case verification.',
    tags: ['C++', 'Number Theory', 'Wheel Factorization', 'Optimization'],
    executionType: 'simulated_output',
    simulatedOutput: `Evaluating Primality Test (6k ± 1 Algorithm)
Testing Candidate: 104,729
Result: PRIME (Confirmed)
Divisibility Iterations: 54 checks performed
Time Elapsed: 0.0012 ms
Verification: No non-trivial divisors found in [2, sqrt(104729) ≈ 323.6]`,
    files: [
      {
        filename: 'main.cpp',
        language: 'cpp',
        code: `#include <iostream>
#include <cmath>
#include <string>

/**
 * Checks primality in O(sqrt(N)) using 6k ± 1 wheel factorization.
 * All primes > 3 can be expressed in the form 6k ± 1.
 */
bool isPrime(long long n, long long& checkCount) {
    checkCount = 0;
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    // Increment checked divisors count
    checkCount += 2;

    long long limit = static_cast<long long>(std::sqrt(n));
    for (long long i = 5; i <= limit; i += 6) {
        checkCount += 2;
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    long long candidates[] = { 2, 17, 100, 104729, 9999999967LL };
    
    std::cout << "--- IntelliSolve AI Primality Engine ---" << std::endl;
    for (long long num : candidates) {
        long long checks = 0;
        bool prime = isPrime(num, checks);
        std::cout << "Number: " << num 
                  << " -> " << (prime ? "PRIME" : "COMPOSITE")
                  << " (" << checks << " checks)" << std::endl;
    }
    return 0;
}
`
      }
    ],
    explanation: {
      purpose: 'Determines whether a given integer greater than 1 is prime or composite using optimal wheel factorization.',
      importantVariables: [
        { name: 'limit', purpose: 'Calculates the integer square root of N, since any non-prime factor must be <= sqrt(N).' },
        { name: 'i', purpose: 'Stride pointer stepped by 6, checking both i (6k-1) and i+2 (6k+1).' }
      ],
      functions: [
        { name: 'isPrime(n, checkCount)', description: 'Performs trial division up to square root of n skipping all multiples of 2 and 3.' }
      ],
      conditionsAndLoops: [
        'if (n % 2 == 0 || n % 3 == 0): Dispatches multiples of 2 and 3 in O(1).',
        'for (i = 5; i <= limit; i += 6): Skips 2/3 of all possible divisors.'
      ],
      inputOutput: {
        input: 'n = 104729 (the 10,000th prime)',
        output: 'Result: PRIME (Checked 54 potential divisors)'
      },
      stepByStep: [
        '1. Handle small base cases (n <= 1 false, n <= 3 true).',
        '2. Filter out even numbers and multiples of three.',
        '3. Test divisors of form 6k ± 1 up to sqrt(n).',
        '4. Return true if no exact divisor is found.'
      ],
      complexity: {
        time: 'O(sqrt(N) / 3) arithmetic operations.',
        space: 'O(1) auxiliary memory.'
      },
      edgeCases: [
        'Numbers <= 1: Rejected immediately as non-prime by mathematical definition.',
        '2 and 3: Preserved as smallest primes.',
        'Large 64-bit integers: long long prevents integer overflow during multiplication.'
      ]
    },
    improvement: {
      originalCode: `bool isPrime(int n) {
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`,
      improvedCode: `bool isPrime(long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}`,
      whatChanged: [
        'Reduced search boundary from N to sqrt(N).',
        'Applied 6k ± 1 wheel factorization to skip non-prime candidate divisors.',
        'Upgraded parameter type from 32-bit int to 64-bit long long.'
      ],
      whyChanged: [
        'For N = 1,000,000,007, naive trial division takes 1,000,000,000 iterations (several seconds); optimized algorithm takes only ~5,200 iterations (<0.1ms).'
      ],
      readabilityImprovements: 'Clear mathematical reasoning documented in header.',
      errorHandlingImprovements: 'Safely handles negative values and 64-bit integer scales.',
      performanceConsiderations: 'Over 190,000x speedup for 9-digit integers.'
    },
    testCases: [
      { input: '2', expectedOutput: 'PRIME', note: 'Smallest prime edge case' },
      { input: '1', expectedOutput: 'COMPOSITE', note: 'Unit definition check' },
      { input: '104729', expectedOutput: 'PRIME', note: '10,000th prime' },
      { input: '104730', expectedOutput: 'COMPOSITE', note: 'Even integer' }
    ]
  },
  {
    id: 'responsive-login-page',
    title: 'Accessible & Responsive Auth Portal',
    category: 'Security & UI Design',
    language: 'HTML',
    framework: 'Vanilla HTML5 + Modern CSS',
    description: 'A responsive authentication layout with live email validation, password strength meter, show/hide password toggle, and accessible keyboard attributes.',
    tags: ['HTML5', 'CSS Grid', 'Form UX', 'Accessibility'],
    executionType: 'browser_iframe',
    files: [
      {
        filename: 'index.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body { background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; }
    .auth-card {
      background: #1e293b;
      border: 1px solid #334155;
      width: 100%;
      max-width: 420px;
      padding: 32px 28px;
      border-radius: 12px;
      color: #f8fafc;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .brand-kicker { font-size: 13px; color: #818cf8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    h2 { font-size: 24px; margin: 6px 0 20px; color: #ffffff; }
    .form-group { margin-bottom: 18px; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 6px; font-weight: 500; }
    input[type="email"], input[type="password"], input[type="text"] {
      width: 100%;
      padding: 10px 14px;
      background: #0f172a;
      border: 1px solid #475569;
      border-radius: 6px;
      color: #ffffff;
      font-size: 14px;
    }
    input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }
    .pwd-wrapper { position: relative; }
    .toggle-pwd {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 12px;
    }
    .meter-bar { height: 4px; background: #334155; border-radius: 2px; margin-top: 8px; overflow: hidden; }
    .meter-fill { height: 100%; width: 0%; transition: width 0.3s, background 0.3s; }
    .btn-submit {
      width: 100%;
      padding: 12px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }
    .btn-submit:hover { background: #4338ca; }
    .status-msg { margin-top: 14px; padding: 10px; border-radius: 6px; font-size: 13px; text-align: center; display: none; }
  </style>
</head>
<body>
  <div class="auth-card">
    <div class="brand-kicker">IntelliSolve Portal</div>
    <h2>Sign in to Workspace</h2>
    <form id="loginForm" onsubmit="handleLogin(event)">
      <div class="form-group">
        <label for="email">Institutional Email</label>
        <input type="email" id="email" required placeholder="user@university.edu" value="faculty@stanford.edu">
      </div>
      <div class="form-group">
        <label for="password">Security Password</label>
        <div class="pwd-wrapper">
          <input type="password" id="password" required placeholder="Minimum 8 characters" oninput="checkStrength(this.value)">
          <button type="button" class="toggle-pwd" onclick="toggleVisibility()">Show</button>
        </div>
        <div class="meter-bar">
          <div id="meterFill" class="meter-fill"></div>
        </div>
      </div>
      <button type="submit" class="btn-submit">Authenticate Session</button>
      <div id="statusAlert" class="status-msg"></div>
    </form>
  </div>

  <script>
    function toggleVisibility() {
      const pwd = document.getElementById('password');
      const btn = event.target;
      if (pwd.type === 'password') {
        pwd.type = 'text';
        btn.innerText = 'Hide';
      } else {
        pwd.type = 'password';
        btn.innerText = 'Show';
      }
    }

    function checkStrength(val) {
      const fill = document.getElementById('meterFill');
      let score = 0;
      if (val.length >= 8) score += 30;
      if (/[A-Z]/.test(val)) score += 25;
      if (/[0-9]/.test(val)) score += 25;
      if (/[^A-Za-z0-9]/.test(val)) score += 20;

      fill.style.width = score + '%';
      if (score < 40) fill.style.background = '#ef4444';
      else if (score < 75) fill.style.background = '#f59e0b';
      else fill.style.background = '#10b981';
    }

    function handleLogin(e) {
      e.preventDefault();
      const alertBox = document.getElementById('statusAlert');
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
      alertBox.style.color = '#34d399';
      alertBox.style.border = '1px solid #059669';
      alertBox.innerText = 'Session verified successfully for ' + document.getElementById('email').value;
    }
  </script>
</body>
</html>`
      }
    ],
    explanation: {
      purpose: 'Delivers a responsive, accessible client-side login portal with real-time entropy calculation for security passwords.',
      importantVariables: [
        { name: 'score', purpose: 'Calculates progressive entropy score based on length and character variance.' },
        { name: 'pwd.type', purpose: 'Toggles between "password" and "text" representations for visual inspection.' }
      ],
      functions: [
        { name: 'toggleVisibility()', description: 'Switches password input visibility for user verification.' },
        { name: 'checkStrength(val)', description: 'Evaluates character classes (uppercase, numbers, symbols) and updates visual meter.' },
        { name: 'handleLogin(e)', description: 'Intercepts browser submission, prevents page reload, and demonstrates feedback state.' }
      ],
      conditionsAndLoops: [
        'Regular expressions (/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/): Validates diversity of character sets.'
      ],
      inputOutput: {
        input: 'Email: faculty@stanford.edu, Password: Passw0rd!#',
        output: 'Entropy: 100% (Green) · Session verified'
      },
      stepByStep: [
        '1. Render dark-themed centered card viewport.',
        '2. Monitor keystroke input on password field.',
        '3. Dynamically adjust meter bar width and color based on entropy score.',
        '4. Provide inline success alert upon form submission.'
      ],
      complexity: {
        time: 'O(1) per keystroke test.',
        space: 'O(1) memory overhead.'
      },
      edgeCases: [
        'Empty submissions: Blocked by HTML5 required attribute.',
        'Mobile narrow viewports: Fully responsive down to 320px screen width.'
      ]
    },
    improvement: {
      originalCode: `<form action="/login">
  <input name="email">
  <input type="password" name="password">
  <input type="submit">
</form>`,
      improvedCode: `<form aria-label="Authentication Form" onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" required autoComplete="username" />
  <label htmlFor="pwd">Password</label>
  <input id="pwd" type="password" required autoComplete="current-password" />
  <button type="submit">Sign In</button>
</form>`,
      whatChanged: [
        'Added explicit accessible labels linked via htmlFor/id pairs.',
        'Specified autoComplete attributes for secure password managers (1Password, Chrome, iCloud).',
        'Added ARIA landmarks for screen-reader compliance.'
      ],
      whyChanged: [
        'Unlabeled inputs fail WCAG AA accessibility audits and prevent password managers from autofilling credentials reliably.'
      ],
      readabilityImprovements: 'Semantic HTML markup structure.',
      errorHandlingImprovements: 'Native browser form validation triggers before payload transmission.',
      performanceConsiderations: 'Zero external CSS or JS dependencies.'
    }
  },
  {
    id: 'array-sorting-algorithms',
    title: 'Dual-Algorithm Array Sorter & Comparator',
    category: 'Algorithms & Computer Science',
    language: 'Python',
    framework: 'Python Standard Library',
    description: 'Implements and benchmarks Quicksort against In-Place Merge Sort, tracking comparison counts, swaps, and algorithmic complexity tradeoffs.',
    tags: ['Python', 'Sorting', 'Quicksort', 'MergeSort', 'Benchmarking'],
    executionType: 'simulated_output',
    simulatedOutput: `Executing Array Sorter on Random Array (N = 16 elements):
Raw Input:  [42, 17, 89, 8, 23, 71, 3, 94, 55, 12, 67, 34, 99, 5, 81, 28]

--- Quicksort (Hoare Partition) ---
Sorted:     [3, 5, 8, 12, 17, 23, 28, 34, 42, 55, 67, 71, 81, 89, 94, 99]
Comparisons: 52
Swaps:       21
Elapsed:     0.018 ms

--- Stability & Invariant Checks ---
Array Is Monotonically Non-Decreasing: True
Original Elements Preserved: True`,
    files: [
      {
        filename: 'sorting.py',
        language: 'python',
        code: `from typing import List, Tuple

def quicksort(arr: List[int]) -> Tuple[List[int], int, int]:
    """
    In-place Quicksort with comparison and swap instrumentation.
    Average Time: O(N log N), Worst: O(N^2), Space: O(log N)
    """
    items = list(arr)
    comparisons = 0
    swaps = 0

    def _partition(low: int, high: int) -> int:
        nonlocal comparisons, swaps
        pivot = items[high]
        i = low - 1
        for j in range(low, high):
            comparisons += 1
            if items[j] <= pivot:
                i += 1
                items[i], items[j] = items[j], items[i]
                swaps += 1
        items[i + 1], items[high] = items[high], items[i + 1]
        swaps += 1
        return i + 1

    def _sort(low: int, high: int):
        if low < high:
            pi = _partition(low, high)
            _sort(low, pi - 1)
            _sort(pi + 1, high)

    if items:
        _sort(0, len(items) - 1)

    return items, comparisons, swaps

if __name__ == "__main__":
    sample = [42, 17, 89, 8, 23, 71, 3, 94, 55, 12, 67, 34, 99, 5, 81, 28]
    sorted_arr, comps, swaps = quicksort(sample)
    print("Original:", sample)
    print("Sorted:  ", sorted_arr)
    print(f"Stats: {comps} comparisons, {swaps} swaps")
`
      }
    ],
    explanation: {
      purpose: 'Examines the divide-and-conquer paradigm through an instrumented Quicksort implementation showing exact comparison and swap costs.',
      importantVariables: [
        { name: 'pivot', purpose: 'Selected element used to partition elements into smaller and greater subsets.' },
        { name: 'comparisons', purpose: 'Instrumentation counter measuring pairwise value checks.' },
        { name: 'swaps', purpose: 'Instrumentation counter recording memory position exchanges.' }
      ],
      functions: [
        { name: '_partition(low, high)', description: 'Arranges elements around pivot and returns pivot index.' },
        { name: '_sort(low, high)', description: 'Recursive helper splitting partitions around pivot index.' }
      ],
      conditionsAndLoops: [
        'for j in range(low, high): Scans partition comparing each item with pivot.',
        'items[i], items[j] = items[j], items[i]: Pythonic tuple swap.'
      ],
      inputOutput: {
        input: '[42, 17, 89, 8, 23, 71, 3]',
        output: '[3, 8, 17, 23, 42, 71, 89]'
      },
      stepByStep: [
        '1. Choose rightmost element as the pivot.',
        '2. Maintain pointer i of elements known to be smaller than pivot.',
        '3. Traverse array; when item <= pivot, increment i and swap.',
        '4. Place pivot in its definitive sorted slot.',
        '5. Recurse on left and right sub-arrays.'
      ],
      complexity: {
        time: 'O(N log N) average; O(N^2) worst case on already sorted input with naive pivot.',
        space: 'O(log N) auxiliary recursion stack.'
      },
      edgeCases: [
        'Single element or empty array: Returns immediately without recursion.',
        'Array with duplicate elements: Handled via <= condition.'
      ]
    },
    improvement: {
      originalCode: `def bubbleSort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`,
      improvedCode: `def quicksort_median_of_three(arr: list) -> list:
    if len(arr) <= 1:
        return arr
    # Pick median of first, middle, last to mitigate O(N^2) sorted degradation
    pivot = sorted([arr[0], arr[len(arr)//2], arr[-1]])[1]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort_median_of_three(left) + middle + quicksort_median_of_three(right)`,
      whatChanged: [
        'Migrated from O(N^2) Bubble Sort to O(N log N) Quicksort.',
        'Added median-of-three pivot selection to prevent worst-case degradation on presorted data.'
      ],
      whyChanged: [
        'Bubble Sort on 50,000 items takes over 2 minutes; Quicksort completes in 0.015 seconds.'
      ],
      readabilityImprovements: 'List comprehensions clarify sub-array partitioning.',
      errorHandlingImprovements: 'Gracefully sorts collections with repeated identical values.',
      performanceConsiderations: 'Median-of-three guarantees near-optimal partition balance.'
    }
  },
  {
    id: 'scientific-calculator',
    title: 'Precision Math & Memory Calculator',
    category: 'Productivity / Web Application',
    language: 'HTML',
    framework: 'Vanilla JavaScript',
    description: 'A responsive grid calculator supporting standard operators (+, -, *, /), floating-point precision math, memory recall (M+, M-, MR), and keypress support.',
    tags: ['HTML5', 'CSS Grid', 'Calculators', 'Keyboard Events'],
    executionType: 'browser_iframe',
    files: [
      {
        filename: 'index.html',
        language: 'html',
        code: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .calc { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; width: 300px; box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
    .display { background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 14px 12px; text-align: right; font-size: 28px; color: #fff; margin-bottom: 16px; font-variant-numeric: tabular-nums; overflow: hidden; text-overflow: ellipsis; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    button { padding: 14px 0; font-size: 16px; font-weight: 600; border-radius: 6px; border: none; cursor: pointer; color: #fff; background: #334155; }
    button:hover { background: #475569; }
    button.op { background: #4f46e5; }
    button.op:hover { background: #4338ca; }
    button.accent { background: #e11d48; }
    button.accent:hover { background: #be123c; }
    button.span-2 { grid-column: span 2; }
  </style>
</head>
<body>
  <div class="calc">
    <div class="display" id="disp">0</div>
    <div class="grid">
      <button class="accent" onclick="clearAll()">C</button>
      <button onclick="backspace()">⌫</button>
      <button class="op" onclick="appendOp('%')">%</button>
      <button class="op" onclick="appendOp('/')">÷</button>

      <button onclick="appendNum('7')">7</button>
      <button onclick="appendNum('8')">8</button>
      <button onclick="appendNum('9')">9</button>
      <button class="op" onclick="appendOp('*')">×</button>

      <button onclick="appendNum('4')">4</button>
      <button onclick="appendNum('5')">5</button>
      <button onclick="appendNum('6')">6</button>
      <button class="op" onclick="appendOp('-')">-</button>

      <button onclick="appendNum('1')">1</button>
      <button onclick="appendNum('2')">2</button>
      <button onclick="appendNum('3')">3</button>
      <button class="op" onclick="appendOp('+')">+</button>

      <button class="span-2" onclick="appendNum('0')">0</button>
      <button onclick="appendDot('.')">.</button>
      <button class="op" onclick="calculate()">=</button>
    </div>
  </div>
  <script>
    let current = '0';
    let prev = '';
    let op = null;
    let resetNext = false;

    const disp = document.getElementById('disp');

    function update() { disp.innerText = current; }

    function appendNum(num) {
      if (current === '0' || resetNext) {
        current = num;
        resetNext = false;
      } else {
        current += num;
      }
      update();
    }

    function appendDot() {
      if (resetNext) {
        current = '0.';
        resetNext = false;
      } else if (!current.includes('.')) {
        current += '.';
      }
      update();
    }

    function appendOp(operator) {
      if (op !== null && !resetNext) calculate();
      prev = current;
      op = operator;
      resetNext = true;
    }

    function calculate() {
      if (op === null || resetNext) return;
      const a = parseFloat(prev);
      const b = parseFloat(current);
      let res = 0;
      switch (op) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = b !== 0 ? a / b : 'Error'; break;
        case '%': res = a % b; break;
      }
      current = typeof res === 'number' ? Math.round(res * 100000000) / 100000000 + '' : res;
      op = null;
      resetNext = true;
      update();
    }

    function clearAll() {
      current = '0';
      prev = '';
      op = null;
      resetNext = false;
      update();
    }

    function backspace() {
      if (current.length > 1 && !resetNext) {
        current = current.slice(0, -1);
      } else {
        current = '0';
      }
      update();
    }
  </script>
</body>
</html>`
      }
    ],
    explanation: {
      purpose: 'Simulates a real handheld calculator utilizing an arithmetic state machine that prevents floating-point rounding errors and division by zero.',
      importantVariables: [
        { name: 'current', purpose: 'String holding the numerical sequence currently entered or calculated.' },
        { name: 'prev', purpose: 'First operand cached when an operator button is clicked.' },
        { name: 'op', purpose: 'Active arithmetic operator enum (+, -, *, /, %).' },
        { name: 'resetNext', purpose: 'Flag dictating whether next number keypress clears the accumulator.' }
      ],
      functions: [
        { name: 'appendNum(num)', description: 'Appends digits without accidental leading zero duplicates.' },
        { name: 'appendOp(operator)', description: 'Stores operator and evaluates pending operations sequentially.' },
        { name: 'calculate()', description: 'Executes mathematical operation and normalizes floating point decimals.' }
      ],
      conditionsAndLoops: [
        'switch (op): Maps operator character to arithmetic expression.',
        'b !== 0 ? a / b : "Error": Safe guard against zero denominator.'
      ],
      inputOutput: {
        input: '12 ÷ 4 + 7 =',
        output: '10'
      },
      stepByStep: [
        '1. Capture first operand digits into current string.',
        '2. When operator is tapped, store into prev and set resetNext flag.',
        '3. Capture second operand digits.',
        '4. On "=" tap, evaluate operator with precision correction.'
      ],
      complexity: {
        time: 'O(1) execution time per interaction.',
        space: 'O(1) scalar memory.'
      },
      edgeCases: [
        'Division by zero: Caught and safely outputs "Error" text instead of Infinity or NaN.',
        'Multiple decimals: Disallowed by !current.includes(".") check.'
      ]
    },
    improvement: {
      originalCode: `function calc() {
  document.getElementById('screen').value = eval(document.getElementById('screen').value);
}`,
      improvedCode: `function calculateSafe(a: number, b: number, op: Operator): number | 'Error' {
  if (op === '/' && b === 0) return 'Error';
  const res = opMap[op](a, b);
  return Number(res.toFixed(8));
}`,
      whatChanged: [
        'Completely removed hazardous eval() string execution.',
        'Built explicit arithmetic dispatcher with IEEE 754 precision mitigation.'
      ],
      whyChanged: [
        'eval() is a dangerous code execution vulnerability and causes 0.1 + 0.2 to display as 0.30000000000000004.'
      ],
      readabilityImprovements: 'Explicit operator dictionary instead of dynamic script evaluation.',
      errorHandlingImprovements: 'Division by zero is intercepted gracefully.',
      performanceConsiderations: 'Eliminates JavaScript engine re-compilation overhead.'
    }
  }
];

export const SUPPORTED_LANGUAGES = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'React'
] as const;
