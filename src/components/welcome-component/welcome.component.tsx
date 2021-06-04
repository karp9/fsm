import {
  Button,
  FormControl,
  MenuItem,
  Select,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Subscription } from "rxjs";
import { FsmStore } from "../../store/fsm";
import { FsmState } from "../../store/models/fsm-state-object";
import "../welcome-component/welcome.component.scss";

export interface IProps {
  fsmStore: FsmStore;
}

export interface IState {
  fsmState: FsmState;
}

export function WelcomeComponent(props: IProps) {
  const fsmStore = props.fsmStore;
  const [fsmState, setFsmState] = useState(props.fsmStore.getState());
  // for cleanup
  const [subscription$, setSubscription] = useState<Subscription>();
  let selectedValue = "";

  useEffect(() => {
    const subscription = fsmStore.subscribe(setFsmState);
    setSubscription(subscription);
    return () => {
      if (subscription$) {
        subscription$.unsubscribe();
      }
      console.log("unMount was called welcome");
    };
  }, []);

  const handleChange = (event: any) => {
    const nodeId = event.target.value;
    if (nodeId) {
      fsmStore.transition(nodeId, {
        name: "Mock data",
        id: "22123",
        nodeId: nodeId,
      });
    }
  };
  const startOverClick = (event: any) => {
    fsmStore.init(fsmState.nodes, fsmState.links, fsmState.initialNodeId);
  };

  const currentNode = fsmState.nodeIdToNode.get(fsmState.step);
  const currentStepOptions = fsmState.nodeIdToNodes.get(fsmState.step);
  return (
    <div className="container">
      <div className="text-header">Tal's Fsm Using Rxjs Subject</div>
      <div className="text-item">Current Step: {currentNode?.name}</div>
      {fsmState.error && <div> {fsmState.error}</div>}
      <div>
        {currentStepOptions?.length && (
          <select
            className="select-node"
            value={selectedValue}
            onChange={handleChange}
            name="optional-steps"
            id=""
          >
            <option className="select-option" key={"empty"} value={""}>
              Select a node
            </option>
            {currentStepOptions.map((node, index) => {
              return (
                <option className="select-option" key={index} value={node.id}>
                  {node.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <Button
        onClick={startOverClick}
        className="start-over-container"
        color="primary"
      >
        Start Over
      </Button>
    </div>
  );
}
