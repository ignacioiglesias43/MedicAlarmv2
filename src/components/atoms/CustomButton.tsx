import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';

interface ButtonProps {
    text: string,
    mode?: string,
    onPress: () => void,
}

const CustomButton = ({text, mode = 'contained', onPress}: ButtonProps) => {
    return (
        <Button>
            {text}
        </Button>
    )
}

export default CustomButton
