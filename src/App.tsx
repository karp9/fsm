import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { FsmStore } from './store/fsm';
import { WizardSteps } from './enums/wiz-steps';
import { WelcomeComponent } from './components/welcome-component/welcome.component';
import { Subscription } from 'rxjs';
import { Node } from './store/models/node';
import { Link } from './store/models/link';

function App() {
  let wizardSteps: WizardSteps = { initial: 'welcome', firstPage: 'firstPage', secondPage: 'secondPage', ThirdPage: 'thirdPage', end: 'end' };
  let nodes: Node[] = [{ id: 'n0', name: 'initialNode' }, { id: 'n1', name: 'node1' }, { id: 'n2', name: 'node2' }, { id: 'n3', name: 'node3' }, { id: 'n4', name: 'node4' }];
  let links: Link[] = [{ from: 'n0', to: 'n1' }, { from: 'n0', to: 'n2' }, { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n0', to: 'n4' }]
  let fsStore = new FsmStore(wizardSteps);
  const [fsmState, setFsmState] = useState(fsStore.initialState);
  let subscription$: Subscription;

  useEffect(() => {
    subscription$ = fsStore.subscribe(setFsmState);
    fsStore.init(nodes, links, nodes[0].id);
    console.log('useEffectWasCalled');
    return () => {
      subscription$.unsubscribe();
    } 
  }, []);


  let handleClick = (e: any) => {
    e.preventDefault();
    // fsStore.transition({name: 'moshe', id: 44}, nodes[1].id);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <WelcomeComponent fsmStore={fsStore} wizardSteps={wizardSteps} />

      <div className="" onClick={handleClick}>
        mosssClick
      </div>
    </div>
  );
}

export default App;


// function componentDidMount(arg0: () => void) {
//   throw new Error('Function not implemented.');
// }

