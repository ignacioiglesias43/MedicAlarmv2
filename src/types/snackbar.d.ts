type SnackbarState = {
  visible: boolean;
  message: string;
};

type SnackbarAction = {
  type: string;
  payload: any;
};

type DispatchAppoinmtentActionType = (args: SnackbarAction) => SnackbarAction;
