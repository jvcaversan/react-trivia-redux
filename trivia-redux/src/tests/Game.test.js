import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

// {
//   "response_code":0,
//   "results":[
//       {
//         "category":"Entertainment: Video Games",
//         "type":"multiple",
//         "difficulty":"easy",
//         "question":"What is the first weapon you acquire in Half-Life?",
//         "correct_answer":"A crowbar",
//         "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//         ]
//       }
//   ]
// }

const mockFetch = () => {
  const mockData = {
    response_code:0,
    results:[
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"easy",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists"
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"easy",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists"
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"easy",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists"
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"easy",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists"
          ]
        }
    ]
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );
};

describe('Teste o componente <Ranking />', () => {
  // beforeEach(() => {
  //   renderWithRouterAndRedux(<App />);
  //   const playBtn = screen.getByRole('button', { name: /^play$/i });
  //   const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
  //   const NOME_INPUT_TEST_ID = 'input-player-name';
  //   const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
  //   const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
  //   userEvent.type(nome, 'test name');
  //   userEvent.type(email, 'test@email.com');
  //   userEvent.click(playBtn);
  //   // const initialState = {
  //   //   player: [{ nome: 'test', assertions: 0, score: 0, gravatarEmail: 'test@email.com' }],
  //   // };
  //   // renderWithRouterAndRedux(<App />, initialState, '/game');
  // })
  test('Testa se as questões são exibidas no inicio do jogo', async () => {
    mockFetch()

    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /^play$/i });
    const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
    const NOME_INPUT_TEST_ID = 'input-player-name';
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
    userEvent.type(nome, 'test name');
    userEvent.type(email, 'test@email.com');
    userEvent.click(playBtn);

    const anwsers = await screen.findAllByTestId(/wrong-answer-/i)
    expect(anwsers.length).toBe(3)
    const anwser = await screen.findByTestId(/correct-answer/i)
    expect(anwser).toHaveTextContent('A crowbar')
  });
  test('Testa o redirecionameto no final do jogo', async () => {
    mockFetch()

    const { history } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /^play$/i });
    const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
    const NOME_INPUT_TEST_ID = 'input-player-name';
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nome = screen.getByTestId(NOME_INPUT_TEST_ID);
    userEvent.type(nome, 'test name');
    userEvent.type(email, 'test@email.com');
    userEvent.click(playBtn);

    for (let i = 0; i < 4; i += 1) {
      const anwser = await screen.findByTestId('correct-answer')
      userEvent.click(anwser)
      const nextBtn = await screen.findByTestId('btn-next')
      userEvent.click(nextBtn)
    expect(history.location.pathname).toBe('/game')

    }
  });
});
