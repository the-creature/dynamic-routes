const initialState = {
  loggedAs: 'enthusiastic'
};

export default function rootReducer(state = initialState, action){
  switch (action.type) {
    case 'LOGIN_AS':
      return {loggedAs: action.login};
    default:
      return state;
  }
}