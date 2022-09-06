import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps{
}
export default function UpdateButton(props:Props) {
  return (
            <Button
                mx={2}
                size="sm"
                height="28px"
                width="45px"
                border="1px"
                borderRadius="3xl"
                borderColor="orange.500"
                _hover={{
                  background: "orange.500",
                  color: "white",
                }}
                bg={"transparent"}
                color={"orange.500"}
                {...props}
              >
                {props.children}
              </Button>
  )
}
