import { Dispatch } from "react";
import { BehaviorSubject, Subject } from "rxjs";
import { BaseSteps } from "./enums/base-enum";
import { FsmState } from "./models/fsm-state-object";
import { Link } from "./models/link";
import { Node } from "./models/node";

const initialState = {
  initialNodeId: "",
  step: "",
  previousStep: "",
  dataMap: new Map<string, any>(),
  stepsHistory: [] as any,
  error: "",
  links: [] as Link[],
  nodes: [] as Node[],
  nodeIdToNode: new Map<string, Node>(),
  nodeIdToNodes: new Map<string, Node[]>(),
} as FsmState;

const subject$ = new BehaviorSubject(initialState);
let state = initialState;

export class FsmStore {
  initialState: FsmState;
  constructor() {
    this.initialState = initialState;
  }
  init(nodes: Node[], links: Link[], initialNodeId: string) {
    const { nodeIdToNodes, nodeIdToNode, err } = this.initValidTransitions(
      nodes,
      links
    );
    const successObj = { success: true, error: "" };
    if (err) {
      successObj.success = false;
      successObj.error =
        "There was a problem to initialize the state. please try again";
    }
    state = {
      ...state,
      initialNodeId,
      previousStep: initialNodeId,
      step: initialNodeId,
      error: successObj.error || "",
      links,
      nodes,
      nodeIdToNode,
      nodeIdToNodes,
    };
    subject$.next(state);
    console.log("init called", state);
    return successObj;
  }
  subscribe(setState: Dispatch<any>) {
    console.log("subscribe called", state);
    return subject$.subscribe(setState);
  }
  /**
   * The transition to the next state.
   * @param nextStep The next node id
   * @param data Optional data to save for each step.
   */
  transition(nextStep: string, data?: any) {
    const isValidTransition = this.isValidTransition(state.step, nextStep);
    if (isValidTransition) {
      if (data) {
        const dataMap = new Map(state.dataMap);
        dataMap.set(nextStep, data);
        state = {
          ...state,
          dataMap,
          previousStep: state.step,
          step: nextStep,
          error: "",
        };
      } else {
        state = {
          ...state,
          previousStep: state.step,
          step: nextStep,
          error: "",
        };
      }
      console.log("transition", state);
    } else {
      state = {
        ...state,
        error: "Error not a valid transition",
      };
    }
    subject$.next(state);
  }
  clearStore() {
    state = { ...initialState };
    subject$.next(state);
  }
  getState() {
    return { ...state };
  }
  private initValidTransitions(nodes: Node[], links: Link[]) {
    let nodeIdToNode = new Map<string, Node>();
    let nodeIdToNodes = new Map<string, Node[]>();
    let err = "";
    if (nodes?.length > 0 && links?.length > 0) {
      nodes.forEach((node) => {
        nodeIdToNode.set(node.id, node);
      });

      links.forEach((link) => {
        if (nodeIdToNodes.has(link.from)) {
          nodeIdToNodes
            .get(link.from)
            ?.push(nodeIdToNode.get(link.to) || ({} as Node));
        } else {
          nodeIdToNodes.set(link.from, [
            nodeIdToNode.get(link.to) || ({} as Node),
          ]);
        }
      });
    } else {
      err = "nodes or links array is empty";
    }

    return { nodeIdToNode, nodeIdToNodes, err };
  }
  private isValidTransition(from: string, to: string) {
    const nodesArr = state.nodeIdToNodes.get(from);
    // can't use ? here because of Strict null checks for Map members
    if (nodesArr && nodesArr.length > 0) {
      const node = nodesArr.find((n) => n.id === to);
      if (node) {
        return true;
      }
    }
    return false;
  }
}
