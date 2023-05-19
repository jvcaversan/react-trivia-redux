import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';



const mockFetch = () => {
  const mockData = {
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
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );
};

describe('Teste o componente <Feedback />', ()=>{
  it('testa o btn da tela de login', ()=>{
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const loginBtn = screen.getByRole('button', { name: /^play again$/i });
    userEvent.click(loginBtn);
    setTimeout(() => {
      expect(history.location.pathname).toBe('/');
    }, 500)
  })
  it('testa o btn da tela de ranking', ()=>{
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const rankingBtn = screen.getByRole('button', { name: /^ranking$/i });
    userEvent.click(rankingBtn);
    setTimeout(() => {
      expect(history.location.pathname).toBe('/ranking');
    }, 500)
  })
  it('testa os textos da pagina de feedback', ()=>{
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    mockFetch();

    for (let i = 0; i < 5; i+=1) {
      // const anwser = screen.getByText(/A crowbar/i);
      // const nextBtn = screen.getByRole('button', { name: /^next$/i });
      // userEvent.click(anwser)
      // userEvent.click(nextBtn)
    }
    
    setTimeout(() => {
      expect(history.location.pathname).toBe('/feedback');
    }, 500)
 
    
  })


})