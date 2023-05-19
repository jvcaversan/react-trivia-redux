import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveScore } from '../redux/actions';

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

const ONE_SECOND = 1000;
const QUESTIONS = 4;
const NUMERO_PLACAR = 10;
const ZERO = 0;

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
    time: 30,
    answers: [],
  };

  componentDidMount = () => {
    const { getQuestions, handleTimer } = this;
    const { submitScore } = this.props;
    getQuestions();
    setInterval(handleTimer, ONE_SECOND);
    submitScore({ score: 0, assertions: 0 });
  };

  getQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const result = await response.json();
    if (result.response_code === 0) {
      const { results } = result;
      const answers = this.getAnswers(results, 0);
      this.setState({
        questions: results,
        index: 0,
        answered: false,
        time: 30,
        answers,
      });
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  getAnswers = (questions, index) => {
    const question = questions[index];
    const answers = [...question.incorrect_answers];
    const randIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(randIndex, 0, question.correct_answer);
    return answers;
  };

  saveUserRank = () => {
    const { nomeUser, emailUser, score } = this.props;
    let oldData = JSON.parse(localStorage.getItem('ranking'));
    oldData = [
      ...oldData,
      { name: nomeUser,
        score,
        picture: `https://www.gravatar.com/avatar/${md5(emailUser).toString()}`,
      },
    ];

    // oldData.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(oldData));
  };

  next = () => {
    const { state, saveUserRank } = this;
    const { questions, index } = state;
    if (index < QUESTIONS) {
      const answers = this.getAnswers(questions, index + 1);
      this.setState({
        ...state,
        index: index + 1,
        time: 30,
        answered: false,
        answers,
      });
    } else {
      const { history } = this.props;
      saveUserRank();
      history.push('/feedback');
    }
  };

  handleTimer = () => {
    const { time } = this.state;
    if (time === 0) {
      this.setState({
        answered: true,
      });
    } else {
      this.setState({
        time: time - 1,
      });
    }
  };

  handleClick = ({ target }) => {
    const { submitScore, score, assertions } = this.props;
    const { name } = target;
    const { state } = this;
    const { time, questions, index } = state;
    const mult = { easy: 1, medium: 2, hard: 3 };
    if (name === 'correct') {
      const d = questions[index].difficulty;
      const points = NUMERO_PLACAR + time * mult[d];
      submitScore({ score: score + points, assertions: assertions + 1 });
    }
    this.setState({
      ...state,
      answered: true,
    });
  };

  render() {
    const { nomeUser, emailUser, score } = this.props;
    const { questions, index, answered, time, answers } = this.state;
    const { handleClick, next } = this;
    return (
      <div className="allContainers">
        <header className="header">
          <h1>{emailUser}</h1>
          <h2 data-testid="header-player-name">{nomeUser}</h2>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(emailUser).toString()}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-score">{score}</h3>
        </header>
        <div className="questions">
          {questions.length > 0 && (
            <div data-testid="answer-options">
              <h4>{time}</h4>
              <h2 data-testid="question-category">
                {questions[index].category}
              </h2>
              <h3 data-testid="question-text">{questions[index].question}</h3>
              <div className="questions-data">
                {answers.map((a, i) => (a !== questions[index].correct_answer ? (
                  <button
                    key={ i }
                    data-testid={ `wrong-answer-${i}` }
                    type="button"
                    name="incorrect"
                    className={ answered ? 'incorrect' : 'default' }
                    onClick={ handleClick }
                    disabled={ answered }
                  >
                    {a}
                  </button>
                ) : (
                  <button
                    key={ i }
                    data-testid="correct-answer"
                    type="button"
                    name="correct"
                    className={ answered ? 'correct' : 'default' }
                    onClick={ handleClick }
                    disabled={ answered }
                  >
                    {questions[index].correct_answer}
                  </button>
                )))}
              </div>
            </div>
          )}

          {(answered || time === ZERO) && (
            <button type="button" data-testid="btn-next" onClick={ next }>
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  nomeUser: globalState.player.name,
  emailUser: globalState.player.gravatarEmail,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  submitScore: (value) => {
    dispatch(saveScore(value));
    return value;
  },
});

Game.propTypes = {
  history: PropTypes.shape().isRequired,
  nomeUser: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  submitScore: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
