import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { primaryColor } from '../theme'

interface Props extends ButtonProps{
}
export default function AddButton(props:Props) {
  return (
            <Button
                mx={2}
                size="sm"
                height="40px"
                width="75px"
                border="1px"
                borderRadius="3xl"
                borderColor={primaryColor}
                _hover={{
                  background: primaryColor,
                  color: "white",
                }}
                bg={"transparent"}
                color={primaryColor}
                {...props}
              >
                {props.children}
              </Button>
  )
}
