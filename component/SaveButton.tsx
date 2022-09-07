import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { HiSave } from 'react-icons/hi'
import { primaryColor } from '../theme'

interface Props extends ButtonProps{
}
export default function SaveButton(props:Props) {
  return (
            <Button
               
                mx={2}
                type="submit"
                size="md"
                height="45px"
                width="130px"
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
                <HiSave size={30}/>
                {props.children}
              </Button>
  )
}
