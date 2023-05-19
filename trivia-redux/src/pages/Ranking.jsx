import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  sortLocalStorage = () => {
    const temp = JSON.parse(localStorage.getItem('ranking'));
    const ranking = temp !== null ? temp : [];
    ranking.sort((a, b) => b.score - a.score);

    return ranking;
  };

  render() {
    const { sortLocalStorage } = this;
    const ranking = sortLocalStorage();
    return (
      <div>
        <h4 data-testid="ranking-title">Ranking</h4>
        {ranking.map((user, index) => (
          <div key={ index }>
            <img
              src={ user.picture }
              alt={ `foto de perfil do usuario ${user.name}` }
            />
            <span data-testid={ `player-name-${index}` }>{user.name}</span>
            <span data-testid={ `player-score-${index}` }>{user.score}</span>
          </div>
        ))}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.redirectLogin }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
