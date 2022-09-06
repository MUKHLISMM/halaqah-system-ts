import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { primaryColor } from '../theme'

interface Props extends ButtonProps{
}
export default function MyButton(props:Props) {
  return (
            <Button
                mx={2}
                type="submit"
                size="md"
                height="48px"
                width="150px"
                border="2px"
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
