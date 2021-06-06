import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FsmStore } from "../../store/fsm";
import { Link } from "../../store/models/link";
import { Node } from "../../store/models/node";
import { mockLinks, mockNodes } from "../../store/models/mock-objects";
import { WelcomeComponent } from "./welcome.component";

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
    render(<WelcomeComponent fsmStore={fsStore} />, container);
  });
});
