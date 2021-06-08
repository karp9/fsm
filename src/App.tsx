import React, { useEffect, useState } from "react";
import "./App.scss";
import { FsmStore } from "./fsm-store/fsm";
import { FsmViewComponent } from "./components/fsm-view-component/fsm-view.component";
import { Node } from "./fsm-store/models/node";
import { Link } from "./fsm-store/models/link";
import { getNodesAndLinks } from "./services/data-service";
import useAsyncTask from "./services/http-utils/http-utils";
import { Graph } from "react-d3-graph";

function App() {
  let fsStore = new FsmStore();
  const [nodes, setNodesArr] = useState<Node[]>([]);
  const [links, setLinksArr] = useState<Link[]>([]);
  const task = useAsyncTask(async () => await getNodesAndLinks());
  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 200,
      highlightStrokeColor: "blue",
      labelProperty: (node: Node) => {
        return node.name;
      },
    },
    link: {
      highlightColor: "lightblue",
    },
    directed: true,
    height: 400,
    width: 400,
    initialZoom: 1.5
  };

  useEffect(() => {
    task.run().then(({ links, nodes }) => {
      setLinksArr(links);
      setNodesArr(nodes);
      fsStore.init(nodes, links, nodes[0].id);
    });
    console.log("useEffectWasCalled");
    return () => {
      console.log("unMount was called APP");
    };
  }, []);

  useEffect(() => {
    console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
  }, [task.status]);

  return (
    <div className="App">
      {task.status !== "SUCCESS" && <div>{task.status + "..."}</div>}
      {nodes?.length > 0 && links?.length > 0 && (
        <> 
        <FsmViewComponent fsmStore={fsStore} />
        {/* last minute addition. this should be in a component */}
        <div className="graph-container">
          <Graph id="graph-id" data={{ nodes, links }} config={graphConfig} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
