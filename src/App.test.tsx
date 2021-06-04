import React from 'react';
import { render, RenderOptions, screen} from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', async () => {
  act(()=> {
    render(<App />, container);
  
  });  
});


