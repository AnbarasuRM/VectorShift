import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';

import { useStore } from './store';
import { Toolbar } from './Toolbar';
import { ResultModal } from './ResultModal';
import { submitPipeline } from './submit';

import { InputNode }       from './nodes/inputNode';
import { OutputNode }      from './nodes/outputNode';
import { LLMNode }         from './nodes/llmNode';
import { TextNode }        from './nodes/textNode';
import { ApiNode, TransformNode, ConditionalNode, DatabaseNode, NoteNode } from './nodes/extraNodes';

const nodeTypes = {
  input:       InputNode,
  output:      OutputNode,
  llm:         LLMNode,
  text:        TextNode,
  api:         ApiNode,
  transform:   TransformNode,
  conditional: ConditionalNode,
  database:    DatabaseNode,
  note:        NoteNode,
};

// Inner component has access to useReactFlow()
function PipelineCanvas() {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, clearPipeline } =
    useStore();

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/reactflow-type');
      if (!type) return;
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitPipeline(nodes, edges);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="vs-header">
        <div className="vs-header-brand">
          <div className="vs-header-logo">⚡</div>
          VectorShift
          <span className="vs-header-tag">Pipeline Builder</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
        </span>
      </header>

      {/* Canvas */}
      <div className="canvas-area">
        <Toolbar />
        <div className="canvas-flow" ref={reactFlowWrapper} onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode="Backspace"
            snapToGrid
            snapGrid={[14, 14]}
            defaultEdgeOptions={{ animated: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e2433" />
            <Controls showInteractive={false} />
            <MiniMap
              nodeColor={(n) => ({
                input:'#10b981', output:'#f59e0b', llm:'#8b5cf6',
                text:'#3b82f6', api:'#06b6d4', transform:'#d946ef',
                conditional:'#f97316', database:'#64748b', note:'#78716c',
              }[n.type] ?? '#4f80ff')}
              maskColor="rgba(11,13,18,0.7)"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Submit Bar */}
      <div className="vs-submit-bar">
        {error && <span style={{ fontSize: 12, color: '#f87171' }}>⚠️ {error}</span>}
        <button className="vs-btn vs-btn-secondary" onClick={clearPipeline} disabled={loading}>
          Clear
        </button>
        <button className="vs-btn vs-btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Analyzing…' : '▶ Run Pipeline'}
        </button>
      </div>

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
    </div>
  );
}

// Wrap with ReactFlowProvider so useReactFlow() works
export default function App() {
  return (
    <ReactFlowProvider>
      <PipelineCanvas />
    </ReactFlowProvider>
  );
}
