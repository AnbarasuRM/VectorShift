import React from 'react';
import { BaseNode, NodeField, NodeSelect, useField } from './BaseNode';

export function LLMNode({ id, data }) {
  const [model, setModel] = useField(data, 'model', 'gpt-4o');
  return (
    <BaseNode id={id} type="LLM" icon="🧠" color="#8b5cf6"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <NodeField label="Model">
        <NodeSelect value={model} onChange={setModel}
          options={[
            { value: 'gpt-4o',            label: 'GPT-4o' },
            { value: 'gpt-4o-mini',       label: 'GPT-4o Mini' },
            { value: 'claude-opus-4',     label: 'Claude Opus 4' },
            { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
            { value: 'gemini-2-flash',    label: 'Gemini 2.0 Flash' },
            { value: 'llama-3-3-70b',     label: 'LLaMA 3.3 70B' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
