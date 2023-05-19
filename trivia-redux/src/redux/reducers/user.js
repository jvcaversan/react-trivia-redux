const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'user':
    return ({
      ...state,
      gravatarEmail: payload.email,
      name: payload.nome,
    });
  case 'score':
    return ({
      ...state,
      score: payload.score,
      assertions: payload.assertions,
    });
  default:
    return state;
  }
}

export default userReducer;
