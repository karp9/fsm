import { Link } from "./link";
import { Node } from "./node";

export const mockNodes: Node[] = [
  { id: "n0", name: "Initial Node" },
  { id: "n1", name: "node1" },
  { id: "n2", name: "node2" },
  { id: "n3", name: "node3" },
];
export const mockLinks: Link[] = [
  { source: "n0", target: "n1" },
  { source: "n1", target: "n2" },
  { source: "n2", target: "n3" },
];
