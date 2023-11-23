'use client'

import {
  Box,
  Center,
  useColorModeValue,
  LinkOverlay,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

export default function InvisibleCityCard() {
  const IMAGE = "/logo.png"

  return (
    <Center py={1}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('lightgrey', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-1}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.700'} fontSize={'xl'} textTransform={'uppercase'}>
            <LinkOverlay href={'/city'}>
                Invisible City
            </LinkOverlay> 
          </Text>
          {/* <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Nice Chair, pink
          </Heading> */}
        </Stack>
      </Box>
    </Center>
  )
}