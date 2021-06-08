import { of } from "rxjs";
import { Link } from "../fsm-store/models/link";
import { Node } from "../fsm-store/models/node";

export async function getNodesAndLinks() {
  const nodes: Node[] = [
    { id: "n0", name: "Initial Node" },
    { id: "n1", name: "Node1" },
    { id: "n2", name: "Node2" },
    { id: "n3", name: "Node3" },
    { id: "n4", name: "Node4" },
  ];
  const links: Link[] = [
    { source: "n0", target: "n1" },
    { source: "n0", target: "n2" },
    { source: "n1", target: "n2" },
    { source: "n2", target: "n1" },
    { source: "n2", target: "n3" },
    { source: "n3", target: "n4" },
    { source: "n0", target: "n4" },
  ];

  return of({ nodes, links }).toPromise();
}
