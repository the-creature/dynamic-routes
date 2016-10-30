import { createStore, compose } from 'redux'
import rootReducer  from '../reducers';

export default function configureStore() {
  return compose()(createStore)(rootReducer);
}