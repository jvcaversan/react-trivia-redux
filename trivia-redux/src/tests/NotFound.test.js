import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../redux/reducers';

describe('Teste o componente <NotFound />', () => {
  test('Testa o texto de Not Found', () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push('/*');

    const notFoundEl = screen.getByRole('heading', {
      name: /confira seu endereço, parece que está errado!!!\(404\)/i,
    });

    expect(notFoundEl).toBeInTheDocument();
  });

  test('Testa o texto de Not Found', () => {
    const initialState = {
      player: [{ name: '', assertions: 0, score: 0, gravatarEmail: '' }],
    };

    renderWithRouterAndRedux(<App />,  
      initialState, 
       '/*' );

    expect(
      screen.getByRole('heading', {
        name: /confira seu endereço, parece que está errado!!!\(404\)/i,
      })
    ).toBeInTheDocument();
  });
});
