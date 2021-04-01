import { Link } from './link';
import { Node } from './node';
export interface FsmState {
    initialNodeId: string;
    step: string;
    previousStep: string;
    dataMap: Map<string, any>;
    stepsHistory: Array<any>;
    newDataCount: number;
    error: string;
    nodes: Node[];
    links: Link[];
    /**
     * Node id to array of all possible nodes to go to
     */
    nodeIdToNodes: Map<string, Node[]>;
    /**
     * Node id to node object
     */
    nodeIdToNode: Map<string, Node>;
}