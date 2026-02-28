import React from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect, useField } from './BaseNode';

export function OutputNode({ id, data }) {
  const [name, setName]             = useField(data, 'outputName', 'output_0');
  const [outputType, setOutputType] = useField(data, 'outputType', 'Text');
  return (
    <BaseNode id={id} type="Output" icon="📤" color="#f59e0b"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput value={name} onChange={setName} placeholder="output_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect value={outputType} onChange={setOutputType}
          options={['Text', 'File', 'Image', 'Number', 'Boolean']} />
      </NodeField>
    </BaseNode>
  );
}
