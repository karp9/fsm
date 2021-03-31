import { Dispatch } from 'react';
import { Subject } from 'rxjs';
import { BaseSteps } from './enums/base-enum';
import { FsmState } from './models/fsm-state-object';
import { Link } from './models/link';
import { Node } from './models/node';

const subject$ = new Subject();

const initialState = {
    initialNodeId: '',
    step: '',
    previousStep: '',
    data: [] as any,
    dataMap: new Map<string, any>(),
    stepsHistory: [] as any,
    error: '',
    links: [] as Link[],
    nodes: [] as Node[],
    nodeIdToNode: new Map<string, Node>(),
    nodeIdToNodes: new Map<string, Node[]>()
} as FsmState;

let state = initialState;

export class FsmStore<E extends BaseSteps> {
    initialState: FsmState;
    private userStateEnum: E;
    constructor(userStateEnum: E) {
        this.initialState = initialState;
        this.userStateEnum = userStateEnum;
    }
    init(nodes: Node[], links: Link[], initialNodeId: string) {
        const { nodeIdToNodes, nodeIdToNode, err } = this.initValidTransitions(nodes, links);
        const successObj = { success: true, error: '' };
        if (err) {
            successObj.success = false;
            successObj.error = 'There was a problem to initialize the state. please try again';
            // return successObj;
        }
        state = {
            ...state,
            initialNodeId,
            previousStep: initialNodeId,
            step: initialNodeId,
            error: successObj.error || '',
            links,
            nodes,
            nodeIdToNode,
            nodeIdToNodes
        };
        subject$.next(state);
        console.log('init called', state);
        return successObj;
    }
    subscribe(setState: Dispatch<any>) {
        console.log('subscribe called', state);
        return subject$.subscribe(setState);
    }
    unSubscribe() {
        // if(subject$)
        //     subject$.unsubscribe();
        console.log('subscribe called', state);
    }
    /**
     * The transition to the next state.
     * @param data the object we want to add to data array
     */
    transition(data: any, nextStep: string) {
        const isValidTransition = this.isValidTransition(state.step, nextStep); 
        if (state.step === this.userStateEnum.end) {
            console.error('we are at the last step');
            return;
        }
        if(isValidTransition) {
            const dataMap = new Map(state.dataMap);
            dataMap.set(nextStep, data);
            const tempStep = state.step;
            state = {
                ...state,
                data: [...state.data, { ...data }],
                dataMap,
                previousStep: state.step,
                step: nextStep,
                error: '',
            };
            subject$.next(state);
            console.log('transition', state);
        }
        else {
            state = {
                ...state,
                error: 'Error not a valid transition',
            }
            subject$.next(state);
        }
    }
    clearStore() {
        state = { ...state, data: [] };
        subject$.next(state);
    }
    getState() {
        return { ...state };
    }
    private initValidTransitions(nodes: Node[], links: Link[]) {
        let nodeIdToNode = new Map<string, Node>();
        let nodeIdToNodes = new Map<string, Node[]>();
        let err = '';
        if (nodes && nodes.length > 0 && links && links.length > 0) {
            nodes.forEach((node) => {
                nodeIdToNode.set(node.id, node);
            });

            links.forEach((link) => {
                if (nodeIdToNodes.has(link.from)) {
                    nodeIdToNodes.get(link.from)?.push(nodeIdToNode.get(link.to) || {} as Node)
                }
                else {
                    nodeIdToNodes.set(link.from, [nodeIdToNode.get(link.to) || {} as Node])
                }
            });

        }
        else {
            err = 'nodes or links array is empty';
        }

        return { nodeIdToNode, nodeIdToNodes, err }
    }
    private isValidTransition(from: string, to: string) {
        const link = state.links.find(l => l.from === from && l.to === to);
        if (link) {
            return true;
        }
        return false;
    }
}
