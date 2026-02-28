// submit.js — Part 4: Backend Integration
// Sends pipeline nodes+edges to /pipelines/parse and shows a result modal.

export async function submitPipeline(nodes, edges) {
  const response = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json(); // { num_nodes, num_edges, is_dag }
}
