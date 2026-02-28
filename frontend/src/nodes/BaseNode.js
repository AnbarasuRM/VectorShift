// BaseNode.js — Core node abstraction for VectorShift Pipeline Builder

import React from 'react';
import { Handle, Position } from 'reactflow';

export function BaseNode({
  id,
  type,
  icon = '⚙️',
  color = '#4f80ff',
  inputs = [],
  outputs = [],
  children,
  style = {},
  minWidth = 220,
}) {
  const getTop = (arr, i) =>
    arr[i].top ?? `${((i + 1) / (arr.length + 1)) * 100}%`;

  return (
    <div
      className="vs-node"
      style={{ '--node-color': color, minWidth, ...style }}
    >
      {/* ── Input handles (left side) ── */}
      {inputs.map((h, i) => (
        <div key={h.id} className="vs-handle-wrap" style={{ top: getTop(inputs, i), left: 0 }}>
          <Handle
            id={`${id}-${h.id}`}
            type="target"
            position={Position.Left}
            style={{ background: color }}
          />
          {h.label && (
            <span className="handle-label handle-label-left">{h.label}</span>
          )}
        </div>
      ))}

      {/* ── Header ── */}
      <div className="vs-node-header" style={{ background: color }}>
        <span className="vs-node-icon">{icon}</span>
        <span className="vs-node-type">{type}</span>
      </div>

      {/* ── Body ── */}
      <div className="vs-node-body">{children}</div>

      {/* ── Output handles (right side) ── */}
      {outputs.map((h, i) => (
        <div key={h.id} className="vs-handle-wrap vs-handle-wrap-right" style={{ top: getTop(outputs, i), right: 0 }}>
          <Handle
            id={`${id}-${h.id}`}
            type="source"
            position={Position.Right}
            style={{ background: color }}
          />
          {h.label && (
            <span className="handle-label handle-label-right">{h.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function NodeField({ label, children }) {
  return (
    <div className="vs-field">
      {label && <label className="vs-field-label">{label}</label>}
      {children}
    </div>
  );
}

export function NodeInput({ value, onChange, placeholder = '', type = 'text' }) {
  return (
    <input
      className="vs-input nodrag"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function NodeSelect({ value, onChange, options = [] }) {
  return (
    <select
      className="vs-select nodrag"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => {
        const val = typeof opt === 'object' ? opt.value : opt;
        const lbl = typeof opt === 'object' ? opt.label : opt;
        return <option key={val} value={val}>{lbl}</option>;
      })}
    </select>
  );
}

export function useField(data, key, defaultValue = '') {
  const [val, setVal] = React.useState(data?.[key] ?? defaultValue);
  return [val, setVal];
}
