import { Link } from "./link";
import { Node } from "./node";

export const mockNodes: Node[] = [
  { id: "n0", name: "Initial Node" },
  { id: "n1", name: "node1" },
  { id: "n2", name: "node2" },
  { id: "n3", name: "node3" },
];
export const mockLinks: Link[] = [
  { from: "n0", to: "n1" },
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
];
