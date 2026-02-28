# VectorShift — Frontend Technical Assessment Solution

## Project Structure

```
vectorshift/
├── backend/
│   ├── main.py              # FastAPI backend with DAG detection
│   └── requirements.txt
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── index.js          # React entry point
        ├── index.css         # Global dark-theme design system
        ├── App.js            # Main app: ReactFlow canvas + toolbar + submit bar
        ├── store.js          # Zustand state management (nodes, edges)
        ├── submit.js         # Part 4: POST to /pipelines/parse
        ├── Toolbar.js        # Drag-and-drop node palette
        ├── ResultModal.js    # Part 4: Modal showing analysis results
        └── nodes/
            ├── BaseNode.js   # Part 1: Core abstraction
            ├── inputNode.js  # Original: Input node
            ├── outputNode.js # Original: Output node
            ├── llmNode.js    # Original: LLM node
            ├── textNode.js   # Part 3: Text node (dynamic resize + {{variables}})
            └── extraNodes.js # Part 1: 5 new nodes (API, Transform, Condition, Database, Note)
```

---

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## Part 1: Node Abstraction

**`BaseNode.js`** is the core abstraction. Every node is created by:
1. Calling `<BaseNode>` with `type`, `icon`, `color`, `inputs[]`, `outputs[]`
2. Passing children (fields) into the body

### Helper primitives (exported from BaseNode.js)
| Export | Purpose |
|---|---|
| `BaseNode` | Wrapper that renders header + handles + body |
| `NodeField` | Labeled field row |
| `NodeInput` | Styled `<input>` |
| `NodeSelect` | Styled `<select>` |
| `useField` | Local state hook scoped to a data key |

### 5 New Nodes (extraNodes.js)
| Node | Color | Inputs | Outputs |
|---|---|---|---|
| **API Request** | Cyan | body, headers | response, status |
| **Transform** | Purple | input | output |
| **Condition** | Orange | value | true, false |
| **Database** | Slate | params | rows, count |
| **Note** | Brown | — | — |

---

## Part 2: Styling

Dark-theme design system using CSS custom properties (`--bg`, `--surface`, `--accent`, etc.).
- Each node has a unique accent color driving its header and handle color
- Selected nodes glow with a color-matched ring
- Smooth hover/focus transitions throughout
- Custom MiniMap and Controls styling

---

## Part 3: Text Node Logic

**Dynamic sizing:** The textarea's `scrollHeight` is measured on every keystroke and applied directly, so the node grows vertically. Width is calculated from the longest line (`longestLine * 7.5 + 48px`, clamped 220–600px).

**Variable handles:** `{{varName}}` pattern (valid JS identifier inside `{{ }}`) is extracted with a regex on every change. Each unique variable gets its own `<Handle>` on the left side of the node, labeled with the variable name, and a pill badge inside the body.

---

## Part 4: Backend Integration

**Frontend (`submit.js`):** `POST http://localhost:8000/pipelines/parse` with body `{ nodes, edges }`.

**Backend (`main.py`):** Uses Kahn's algorithm (BFS topological sort) to detect cycles:
- If all nodes are visited → acyclic → `is_dag: true`
- If any node has remaining in-degree → cycle exists → `is_dag: false`

**Response modal (`ResultModal.js`):** Displays `num_nodes`, `num_edges`, and a color-coded DAG badge (green ✓ / red ✗).
