export function saveUser({ nome, email }) {
  return { type: 'user', payload: { nome, email } };
}

export function saveScore({ score, assertions }) {
  return { type: 'score', payload: { score, assertions } };
}
