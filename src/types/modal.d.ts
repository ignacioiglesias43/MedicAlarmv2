interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
  iconColor: string;
}

type ModalAction = {
  type: string;
  payload: any;
};

type DispatchModalActionType = (args: ModalAction) => ModalAction;
