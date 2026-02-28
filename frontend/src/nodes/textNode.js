// textNode.js — Part 3: dynamic resize + {{variable}} handles

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let m;
  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(m[1])) { seen.add(m[1]); vars.push(m[1]); }
  }
  return vars;
}

const COLOR = '#3b82f6';

export function TextNode({ id, data }) {
  const [text, setText] = useState(data?.text ?? '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => { autoResize(); }, [text, autoResize]);

  // Compute node width from longest line
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((l) => l.length), 20);
  const nodeWidth = Math.max(220, Math.min(600, longestLine * 7.5 + 56));

  return (
    <div
      className="vs-node"
      style={{ '--node-color': COLOR, width: nodeWidth, minWidth: 220 }}
    >
      {/* Dynamic variable input handles on the left */}
      {variables.map((varName, i) => (
        <div
          key={varName}
          className="vs-handle-wrap"
          style={{ top: `${((i + 1) / (variables.length + 2)) * 100}%`, left: 0 }}
        >
          <Handle
            id={`${id}-var-${varName}`}
            type="target"
            position={Position.Left}
            style={{ background: COLOR }}
          />
          <span className="handle-label handle-label-left" style={{ color: '#93c5fd' }}>
            {varName}
          </span>
        </div>
      ))}

      {/* Header */}
      <div className="vs-node-header" style={{ background: COLOR }}>
        <span className="vs-node-icon">📝</span>
        <span className="vs-node-type">Text</span>
      </div>

      {/* Body */}
      <div className="vs-node-body">
        <div className="vs-field">
          <label className="vs-field-label">Content</label>
          <textarea
            ref={textareaRef}
            className="vs-textarea nodrag nowheel"
            value={text}
            onChange={(e) => { setText(e.target.value); autoResize(); }}
            placeholder="Type text or use {{variable}} to add input handles…"
            rows={3}
          />
        </div>

        {/* Variable pills */}
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map((v) => (
              <span key={v} className="vs-var-pill">{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </div>

      {/* Single output handle */}
      <div
        className="vs-handle-wrap vs-handle-wrap-right"
        style={{ top: '50%', right: 0 }}
      >
        <Handle
          id={`${id}-output`}
          type="source"
          position={Position.Right}
          style={{ background: COLOR }}
        />
        <span className="handle-label handle-label-right">output</span>
      </div>
    </div>
  );
}
