// store.js — Zustand store for pipeline state
import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIdCounter: 0,

  getNodeId: () => {
    const id = get().nodeIdCounter;
    set({ nodeIdCounter: id + 1 });
    return `node_${id}`;
  },

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  onConnect: (connection) =>
    set({ edges: addEdge({ ...connection, animated: true }, get().edges) }),

  addNode: (type, position) => {
    const id = get().getNodeId();
    set({ nodes: [...get().nodes, { id, type, position, data: {} }] });
  },

  clearPipeline: () => set({ nodes: [], edges: [] }),
}));
