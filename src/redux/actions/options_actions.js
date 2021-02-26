import { CHANGE_OPTIONS, ADD_OPTION } from './options_actions_types';

export const changeOptions = options => ({
  type: CHANGE_OPTIONS,
  payload:
    options,
});

export const addOption = option => ({
  type: ADD_OPTION,
  payload:
    option,

});
