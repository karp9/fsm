import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FsmStore } from "../../fsm-store/fsm";
import { Link } from "../../fsm-store/models/link";
import { Node } from "../../fsm-store/models/node";
import { mockLinks, mockNodes } from "../../fsm-store/models/mock-objects";
import { FsmViewComponent } from "./fsm-view.component";

let fsStore = new FsmStore();
let container: any;

let fsm: FsmStore;
const nodes: Node[] = mockNodes;
const links: Link[] = mockLinks;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  fsm = new FsmStore();
});

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders without crashing", () => {
  fsm.init(nodes, links, nodes[0].id);
  act(() => {
    render(<FsmViewComponent fsmStore={fsStore} />, container);
  });
});
