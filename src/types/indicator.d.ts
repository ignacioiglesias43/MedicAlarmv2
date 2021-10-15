interface IndicatorState {
  visible: boolean;
}

type IndicatorAction = {
  type: string;
  payload: boolean;
};

type DispatchIndicatorActionType = (args: IndicatorAction) => IndicatorAction;
