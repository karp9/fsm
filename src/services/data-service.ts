import { of } from "rxjs";
import { Link } from "../store/models/link";
import { Node } from "../store/models/node";

export async function getNodesAndLinks() {
    const nodes: Node[] = [{ id: 'n0', name: 'initialNode' }, { id: 'n1', name: 'node1' }, { id: 'n2', name: 'node2' }, { id: 'n3', name: 'node3' }, { id: 'n4', name: 'node4' }];
    const links: Link[] = [{ from: 'n0', to: 'n1' }, { from: 'n0', to: 'n2' }, { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n0', to: 'n4' }]

    return of({ nodes, links }).toPromise(); 
}