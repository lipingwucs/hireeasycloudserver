import { combineReducers } from 'redux';
import { reducer as geolocation } from 'react-redux-geolocation';

export default combineReducers({
  geolocation,
});