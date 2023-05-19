import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { saveUser } from '../redux/actions';

const NUMERO_VALIDACAO = 3;
const validEmail = /^[\w]+@[\w]+\.[a-z]/;

class Login extends React.Component {
  state = {
    email: '',
    nome: '',
    logged: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationButton);
  };

  handleClick = async (event) => {
    const { submitEmail, history } = this.props;
    event.preventDefault();

    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const jsonResponse = await response.json();
    const { token } = jsonResponse;
    console.log(token);
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));

    const oldData = JSON.parse(localStorage.getItem('ranking'));
    const data = ((oldData === null ? [] : oldData));
    localStorage.setItem('ranking', JSON.stringify(data));

    history.push('/game');

    submitEmail(this.state);
  };

  toConfig = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push('/config');
  };

  validationButton = () => {
    const { nome, email } = this.state;
    if (nome.length >= NUMERO_VALIDACAO && validEmail.test(email)) {
      this.setState({ logged: false });
    } else {
      this.setState({ logged: true });
    }
  };

  render() {
    const { nome, email, logged } = this.state;
    const { handleChange, handleClick, toConfig } = this;
    return (
      <div className="main-login">
        <div className="left-login">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <div className="right-login">
          <div className="card-login">
            <h1>Login</h1>
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                name="nome"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                value={ nome }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                placeholder="example@example.com"
                value={ email }
                onChange={ handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ logged }
              onClick={ handleClick }
            >
              Play
            </button>
            <button type="button" data-testid="btn-settings" onClick={ toConfig }>
              Configurações
            </button>
          </div>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  submitEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (value) => {
    dispatch(saveUser(value));
  },
});

export default connect(null, mapDispatchToProps)(Login);
