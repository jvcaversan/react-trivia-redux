import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste o componente <Ranking />', () => {
  beforeEach(() => {
    const initialState = {
      player: [{ name: '', assertions: 0, score: 0, gravatarEmail: '' }],
    };

    renderWithRouterAndRedux(<App />, initialState, '/ranking');
  });

  test('Testa se possui o texto de Ranking', () => {
    const headingRanking = screen.getByRole('heading', {
      name: /^ranking$/i,
      level: 4,
    });
    expect(headingRanking).toBeInTheDocument();

    expect(localStorage.getItem).toBeCalledWith('ranking')
    // expect().toBeSorted();
    });

  test('Testa se volta para a página de Login', () => {
    const loginBtn = screen.getByRole('button', {
      name: /home/i,
    });
    expect(loginBtn).toBeInTheDocument();

    userEvent.click(loginBtn);

    const headingEl = screen.getByRole('heading', {
      name: /^Login$/i,
      level: 2,
    });
    expect(headingEl).toBeInTheDocument();
  });
});
