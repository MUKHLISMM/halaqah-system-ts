import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { primaryColor } from '../theme'

interface Props extends ButtonProps{
}
export default function MoreButton(props:Props) {
  return (
    <Button
                mx={2}
                size="sm"
                height="28px"
                width="auto"
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
