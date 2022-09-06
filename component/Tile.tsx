import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'
interface Props extends BoxProps{
}

export default function Tile(props:Props) {
  return (
    <Box
    h="auto"
    bg="white"
    borderRadius={5}
    boxShadow={"md"}
    p={5}
  >{props.children}</Box>
  )
}
