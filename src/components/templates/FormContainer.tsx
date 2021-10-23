import React, {FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FormContainerProps {}

const FormContainer: FC<FormContainerProps> = ({children}) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}
      showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default FormContainer;
