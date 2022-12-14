import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { IoMdHome } from 'react-icons/io'

interface Props extends ButtonProps{
}
export default function CancelButton(props:Props) {
  return (
            <Button
               
                mx={2}
                type="submit"
                size="md"
                height="45px"
                width="130px"
                border="2px"
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
                 <IoMdHome size={27} />
                {props.children}
              </Button>
  )
}
