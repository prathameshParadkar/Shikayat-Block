import { Box, Stack, Text, HStack, Flex } from '@chakra-ui/layout'
import React from 'react'
import { typeToImgMap } from '../navbar/navbar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import AddAddressModal from './AddAddressModal'
import { setTrackedAddress } from '../../reducers/SiteCustom'
import { useDispatch, useSelector } from 'react-redux'

const Tile = ({ address, cryptoType }) => {
    
    if (cryptoType === 'trx') {
        cryptoType = 'tron'
    }
    const dispatch = useDispatch()
    return (
        <Box w={'full'} p={5} boxShadow={'lg'}>
             <Flex justify={'space-between'} >
             <HStack>
                    <img width={20} height={20} src={typeToImgMap[cryptoType]} alt="" />
                    <Text ml={3} fontWeight={'semibold'} fontSize={'xl'}>{address}</Text>
                </HStack>
                <Button onClick={() => {
                    dispatch(setTrackedAddress(address))
                }} variant={'outline'} colorScheme='blue'>
                    Track
                </Button>
                <AddAddressModal  />
            </Flex>
        </Box>
    )
}

export default Tile