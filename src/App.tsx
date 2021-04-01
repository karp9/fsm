import React, { useEffect, useState } from 'react';
import './App.scss';
import { FsmStore } from './store/fsm';
import { WelcomeComponent } from './components/welcome-component/welcome.component';
import { Node } from './store/models/node';
import { Link } from './store/models/link';
import { getNodesAndLinks } from './services/data-service';
import useAsyncTask from './services/http-utils/http-utils';

function App() {
  let fsStore = new FsmStore();
  const [nodes, setNodesArr] = useState<Node[]>([]);
  const [links, setLinksArr] = useState<Link[]>([]);
  const task = useAsyncTask(async () => await getNodesAndLinks());

  useEffect(() => {
    task.run().then(({ links, nodes }) => {
      setLinksArr(links);
      setNodesArr(nodes);
      fsStore.init(nodes, links, nodes[0].id);
    });
    console.log('useEffectWasCalled');
    return () => {
      console.log("unMount was called APP");
    }
  }, []);


  useEffect(() => {
    console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
  }, [task.status]);

  return (
    <div className="App">
      {task.status !== 'SUCCESS' && 
        <div>{task.status + '...'}</div>
      }
      {nodes?.length > 0 && links?.length > 0 &&
        <WelcomeComponent fsmStore={fsStore} />
      }
    </div>
  );
}

export default App;


