import { CHANGE_OPTIONS, ADD_OPTION } from '../actions/options_actions_types';

const initialState = {
  options: [],
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_OPTIONS:
      return {
        options: action.payload,
      };
    case ADD_OPTION:
      return {
        options: [...state.options, action.payload],
      };
    default: return state;
  }
};

export default OptionsReducer;
