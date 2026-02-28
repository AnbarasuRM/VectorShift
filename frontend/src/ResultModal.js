// ResultModal.js — Displays pipeline analysis results from the backend
import React from 'react';

export function ResultModal({ result, onClose }) {
  if (!result) return null;
  const { num_nodes, num_edges, is_dag } = result;

  return (
    <div className="vs-modal-overlay" onClick={onClose}>
      <div className="vs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vs-modal-title">
          <span>📊</span> Pipeline Analysis
        </div>

        <div className="vs-modal-stat">
          <span className="vs-modal-stat-label">Nodes</span>
          <span className="vs-modal-stat-value">{num_nodes}</span>
        </div>

        <div className="vs-modal-stat">
          <span className="vs-modal-stat-label">Edges</span>
          <span className="vs-modal-stat-value">{num_edges}</span>
        </div>

        <div className="vs-modal-stat">
          <span className="vs-modal-stat-label">DAG (no cycles)</span>
          <span
            className={`vs-dag-badge ${is_dag ? 'vs-dag-true' : 'vs-dag-false'}`}
          >
            {is_dag ? '✓ Valid DAG' : '✗ Has Cycles'}
          </span>
        </div>

        {!is_dag && (
          <p
            style={{
              marginTop: 12,
              fontSize: 11,
              color: '#f87171',
              lineHeight: 1.5,
            }}
          >
            ⚠️ Your pipeline contains a cycle. DAG pipelines must be acyclic
            for deterministic execution.
          </p>
        )}

        <div className="vs-modal-footer">
          <button className="vs-btn vs-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
