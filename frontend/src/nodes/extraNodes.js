// extraNodes.js — 5 new nodes demonstrating the BaseNode abstraction

import React from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect, useField } from './BaseNode';

/* ── 1. API Request ── */
export function ApiNode({ id, data }) {
  const [url, setUrl]       = useField(data, 'url', 'https://api.example.com');
  const [method, setMethod] = useField(data, 'method', 'GET');
  return (
    <BaseNode id={id} type="API Request" icon="🌐" color="#06b6d4"
      inputs={[{ id: 'body', label: 'body' }, { id: 'headers', label: 'headers' }]}
      outputs={[{ id: 'response', label: 'response' }, { id: 'status', label: 'status' }]}
    >
      <NodeField label="URL">
        <NodeInput value={url} onChange={setUrl} placeholder="https://…" />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect value={method} onChange={setMethod}
          options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']} />
      </NodeField>
    </BaseNode>
  );
}

/* ── 2. Transform ── */
export function TransformNode({ id, data }) {
  const [op, setOp] = useField(data, 'operation', 'JSON Parse');
  return (
    <BaseNode id={id} type="Transform" icon="⚡" color="#d946ef"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <NodeField label="Operation">
        <NodeSelect value={op} onChange={setOp}
          options={['JSON Parse','JSON Stringify','Base64 Encode','Base64 Decode','Lowercase','Uppercase','Trim']} />
      </NodeField>
    </BaseNode>
  );
}

/* ── 3. Conditional ── */
export function ConditionalNode({ id, data }) {
  const [condition, setCondition] = useField(data, 'condition', 'value > 0');
  return (
    <BaseNode id={id} type="Condition" icon="🔀" color="#f97316"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[{ id: 'true', label: 'true' }, { id: 'false', label: 'false' }]}
    >
      <NodeField label="Condition">
        <NodeInput value={condition} onChange={setCondition} placeholder="value > 0" />
      </NodeField>
    </BaseNode>
  );
}

/* ── 4. Database ── */
export function DatabaseNode({ id, data }) {
  const [db, setDb]       = useField(data, 'database', 'PostgreSQL');
  const [query, setQuery] = useField(data, 'query', 'SELECT * FROM users');
  return (
    <BaseNode id={id} type="Database" icon="🗄️" color="#64748b"
      inputs={[{ id: 'params', label: 'params' }]}
      outputs={[{ id: 'rows', label: 'rows' }, { id: 'count', label: 'count' }]}
      minWidth={240}
    >
      <NodeField label="Database">
        <NodeSelect value={db} onChange={setDb}
          options={['PostgreSQL','MySQL','MongoDB','SQLite','Redis']} />
      </NodeField>
      <NodeField label="Query">
        <NodeInput value={query} onChange={setQuery} placeholder="SELECT …" />
      </NodeField>
    </BaseNode>
  );
}

/* ── 5. Note ── */
export function NoteNode({ id, data }) {
  const [note, setNote] = useField(data, 'note', '');
  return (
    <BaseNode id={id} type="Note" icon="💬" color="#78716c">
      <NodeField>
        <textarea
          className="vs-textarea nodrag nowheel"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a comment…"
          rows={3}
          style={{ fontStyle: 'italic', color: '#a8a29e' }}
        />
      </NodeField>
    </BaseNode>
  );
}
