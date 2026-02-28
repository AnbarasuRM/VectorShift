import React from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect, useField } from './BaseNode';

export function InputNode({ id, data }) {
  const [name, setName]           = useField(data, 'inputName', 'input_0');
  const [inputType, setInputType] = useField(data, 'inputType', 'Text');
  return (
    <BaseNode id={id} type="Input" icon="📥" color="#10b981"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput value={name} onChange={setName} placeholder="variable_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect value={inputType} onChange={setInputType}
          options={['Text', 'File', 'Image', 'Number', 'Boolean']} />
      </NodeField>
    </BaseNode>
  );
}
