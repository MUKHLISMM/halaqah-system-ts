import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps{
}
export default function CancelButton(props:Props) {
  return (
            <Button
                mx={2}
                size="sm"
                height="40px"
                width="75px"
                border="1px"
                borderRadius="3xl"
                borderColor="red.500"
                _hover={{
                  background: "red.500",
                  color: "white",
                }}
                bg={"transparent"}
                color={"red.500"}
                {...props}
              >
                {props.children}
              </Button>
  )
}
