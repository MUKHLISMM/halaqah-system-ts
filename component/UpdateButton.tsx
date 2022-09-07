import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { TbEdit } from 'react-icons/tb'
import { primaryColor } from '../theme'

interface Props extends ButtonProps{
}
export default function UpadateButton(props:Props) {
  return (
            <Button
                mx={2}
                type="submit"
                size="md"
                height="45px"
                width="130px"
                border="2px"
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
                 <TbEdit size={30} />
                {props.children}
              </Button>
  )
}
