import {LOAD_RECOGNITIONS} from '../actions';

export const recognitions = (state = false, {type, payload}) => {
  /* eslint-disable indent */
  switch (type) {
    case LOAD_RECOGNITIONS:
      return payload;
    default:
      return state;
  }
};
