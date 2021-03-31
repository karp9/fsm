import React, { useState, useEffect } from 'react';
import { Subscription } from 'rxjs';
import { WizardSteps } from '../../enums/wiz-steps';
import { FsmStore } from '../../store/fsm';
import { FsmState } from '../../store/models/fsm-state-object';
import {Node} from '../../store/models/node'
import '../welcome-component/welcome.component.scss';

export interface IProps {
    fsmStore: FsmStore<WizardSteps>,
    wizardSteps: WizardSteps
};

export interface IState {
    wizardStep: string,
    fsmState: FsmState;
}


export function WelcomeComponent(props: IProps) {
    let fsmStore = props.fsmStore;
    let [fsmState, setFsmState] = useState(props.fsmStore.initialState);
    let subscription$: Subscription;
    const currentStep = props.wizardSteps.initial;
    let selectedValue = '';

    useEffect(() => {
        subscription$ = fsmStore.subscribe(setFsmState);
        return () => {
            subscription$.unsubscribe();
        }
    }, []);

    const handleChange = (event: any) => {
        const nodeId = event.target.value;
        if(nodeId) {
            fsmStore.transition({moshe: '2'}, nodeId);
        }
    }

    return (
        <div className="container">
            <div>welcome component</div>
            <div>Current step: {fsmState.nodeIdToNode.get(fsmState.step)?.name}</div>
            {!!fsmState.error &&
                <div> {fsmState.error}</div>
            }
            <div>
                { fsmState.nodeIdToNodes.get(fsmState.step)?.length && 
                    <select value={selectedValue} onChange={handleChange} name="optional-steps" id="">
                        <option key={'empty'} value={''}>Select a node</option>
                        {fsmState.nodeIdToNodes.get(fsmState.step)?.map((node, index) => {
                           return <option key={index} value={node.id}>{node.name}</option>
                        })}
                    </select>

                }
            </div>

        </div>
    );
}

// export default welcome.component

