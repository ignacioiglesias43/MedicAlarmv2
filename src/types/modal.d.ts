interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
  iconColor: string;
  isConfirm: boolean;
  userHasConfirmed: boolean;
}

type ModalAction = {
  type: string;
  payload: any;
};

type DispatchModalActionType = (args: ModalAction) => ModalAction;
