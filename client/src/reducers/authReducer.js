// Alkuperäinen tila on, että käyttäjä ei ole kirjautunut sisään ja käyttäjänä on tyhjä objecti
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state; // Default case which is going to return the state as it is
  }
}