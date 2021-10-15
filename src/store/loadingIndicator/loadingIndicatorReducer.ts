import {UPDATE_INDICATOR_VISIBLE} from './actionTypes';

const initialState: IndicatorState = {
  visible: false,
};

const loadingIndicatorReducer = (
  state = initialState,
  action: IndicatorAction,
) => {
  switch (action.type) {
    case UPDATE_INDICATOR_VISIBLE:
      return {...state, visible: action.payload};
    default:
      return state;
  }
};

export default loadingIndicatorReducer;
