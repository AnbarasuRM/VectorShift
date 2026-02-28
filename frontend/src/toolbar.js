import React from 'react';

const NODE_TYPES = [
  { type: 'input',       label: 'Input',     icon: '📥', color: '#10b981' },
  { type: 'output',      label: 'Output',    icon: '📤', color: '#f59e0b' },
  { type: 'llm',         label: 'LLM',       icon: '🧠', color: '#8b5cf6' },
  { type: 'text',        label: 'Text',      icon: '📝', color: '#3b82f6' },
  null, // divider
  { type: 'api',         label: 'API Request', icon: '🌐', color: '#06b6d4' },
  { type: 'transform',   label: 'Transform',   icon: '⚡', color: '#d946ef' },
  { type: 'conditional', label: 'Condition',   icon: '🔀', color: '#f97316' },
  { type: 'database',    label: 'Database',    icon: '🗄️', color: '#64748b' },
  { type: 'note',        label: 'Note',        icon: '💬', color: '#78716c' },
];

export function Toolbar() {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow-type', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="vs-toolbar">
      <div className="vs-toolbar-title">Nodes</div>
      {NODE_TYPES.map((n, i) =>
        n === null ? (
          <div key={`divider-${i}`} className="vs-toolbar-divider" />
        ) : (
          <div
            key={n.type}
            className="vs-toolbar-item"
            draggable
            onDragStart={(e) => onDragStart(e, n.type)}
          >
            <div
              className="vs-toolbar-icon"
              style={{
                background: `${n.color}20`,
                border: `1px solid ${n.color}50`,
              }}
            >
              {n.icon}
            </div>
            <span className="vs-toolbar-label">{n.label}</span>
          </div>
        )
      )}
    </aside>
  );
}
