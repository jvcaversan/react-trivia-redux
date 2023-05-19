import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const mockFetch = () => {
  const mockData = {
    token: '123456789',
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );
};

describe('Teste o componente <Login />', () => {
  it('Login Title to exist', () => {
    renderWithRouterAndRedux(<App />);
    const headingEl = screen.getByRole('heading', {
      name: /^Login$/i,
      level: 2,
    });
    expect(headingEl).toBeInTheDocument();
  });
  it('Login buttons to exist', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /^Play$/i });
    const configBtn = screen.getByRole('button', { name: /^Configurações$/i });
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });
  it('Login labels to exist', () => {
    renderWithRouterAndRedux(<App />);
    const nameLabel = screen.getByText(/^nome:$/i);
    const emailLabel = screen.getByText(/email:/i);
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    // renderWithRouterAndStore(<App />, '/');
    renderWithRouterAndRedux(<App />);
    const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
    const NOME_INPUT_TEST_ID = 'input-player-name';
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
    // const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(email).toBeInTheDocument();
    expect(nome).toBeInTheDocument();
    // expect(senha).toBeInTheDocument();
  });

  it('Play button to be disabled', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /^Play$/i });
    expect(playBtn).toBeDisabled();
    const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
    const NOME_INPUT_TEST_ID = 'input-player-name';
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
    userEvent.type(nome, 'test name');
    userEvent.type(email, 'test@email.com');
    expect(playBtn).not.toBeDisabled();
  });
  it('Config button to redirect', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /^Configurações$/i });
    userEvent.click(configBtn);
    expect(history.location.pathname).toBe('/config');
  });

  it('Play button to redirect', () => {
    mockFetch();
    const { history } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /^play$/i });
    const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
    const NOME_INPUT_TEST_ID = 'input-player-name';
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
    userEvent.type(nome, 'test name');
    userEvent.type(email, 'test@email.com');
    userEvent.click(playBtn);
    setTimeout(() => {
      expect(history.location.pathname).toBe('/game');
    }, 500)
  });
});
