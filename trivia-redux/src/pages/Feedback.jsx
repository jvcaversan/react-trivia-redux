import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

const assertionsNumber = 3;

class Feedback extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { nomeUser, score, emailUser, assertions } = this.props;
    return (
      <>
        <header>
          <h2 data-testid="header-player-name">{nomeUser}</h2>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(emailUser).toString()}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-score">{score}</h3>
        </header>
        <div>
          <h2 data-testid="feedback-total-score">{score}</h2>
          <h1 data-testid="feedback-text">
            {(assertions < assertionsNumber) ? 'Could be better...' : 'Well Done!'}
          </h1>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectLogin }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  nomeUser: globalState.player.name,
  score: globalState.player.score,
  emailUser: globalState.player.gravatarEmail,
  assertions: globalState.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape().isRequired,
  nomeUser: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  emailUser: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
