import { FsmStore } from "./fsm";
import { Node } from "../store/models/node";
import { Link } from "../store/models/link";
import { mockLinks, mockNodes } from "./models/mock-objects";

let fsm: FsmStore;
const nodes: Node[] = mockNodes;
const links: Link[] = mockLinks;

beforeEach(() => {
  fsm = new FsmStore();
});

it("Init with no errors", async () => {
  const { success, error } = fsm.init(nodes, links, nodes[0].id);
  expect(success).toBeTruthy();
  expect(error).toEqual("");
});

it("Init with errors", async () => {
  const { success, error } = fsm.init([] as Node[], links, nodes[0].id);
  expect(success).toBeFalsy();
  expect(error.length).toBeGreaterThan(0);
});

it("Valid transition", async () => {
  fsm.init(nodes, links, nodes[0].id);
  fsm.transition("n1");
  const state = fsm.getState();
  expect(state.error).toEqual("");
});

it("Not a valid transition", async () => {
  fsm.init(nodes, links, nodes[0].id);
  fsm.transition("n0");
  const state = fsm.getState();
  expect(state.error.length).toBeGreaterThan(0);
});

it("Clear store works", async () => {
  fsm.init(nodes, links, nodes[0].id);
  const tempState = fsm.getState();
  fsm.clearStore();
  expect(tempState.nodes.length).toBeGreaterThan(0);
  const stateAfterClear = fsm.getState();
  expect(stateAfterClear.nodes.length).toEqual(0);
});

it("Returns a new reference of state", async () => {
  fsm.init(nodes, links, nodes[0].id);
  const tempState = fsm.getState();
  const tempState2 = fsm.getState();
  const res = tempState !== tempState2;
  expect(res).toBeTruthy();
});
