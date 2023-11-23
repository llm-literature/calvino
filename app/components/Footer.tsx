'use client'

import {
  Avatar,
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

const Logo = (props: any) => {
  return (
    <Avatar name='Calvino' src='/logo.png' />
  )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function LargeWithLogoCentered() {
  return (
    <Box
    //   bg={useColorModeValue('gray.50', 'gray.900')}
    //   color={useColorModeValue('gray.700', 'gray.200')}
      >
      <Container as={Stack} py={10}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={15}
        >
          <Stack align={'flex-start'} >
            <ListHeader>Github</ListHeader>
            <Box as="a" href={'https://github.com/llm-literature'}>
              Organization
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box as="a" href={'https://github.com/llm-literature/calvino'}>
                Repository
              </Box>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}>
                New
              </Tag>
            </Stack>
            <Box as="a" href={'https://github.com/llm-literature/calvino/discussions'}>
              Discussion
            </Box>
            <Box as="a" href={'https://github.com/llm-literature/calvino/releases'}>
              Releases
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Fun</ListHeader>
            <Stack direction={'row'} align={'center'} spacing={2}>
                <Box as="a" href={'https://datahonor.com/beer/'}>
                Beer
                </Box>
                <Tag
                    size={'sm'}
                    bg={useColorModeValue('red.300', 'red.800')}
                    ml={2}
                    color={'white'}>
                    Hot
                </Tag>
            </Stack>

            <Box as="a" href={'https://datahonor.com/pysesd/'}>
              [Py]S-ESD
            </Box>
            <Box as="a" href={'https://datahonor.com/python-package-template/'}>
              MPPT
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Toys</ListHeader>
            <Box as="a" href={'https://datahonor.com/toyml/'}>
              ToyML
            </Box>
            <Box as="a" href={'https://datahonor.com/toydl/'}>
              ToyDL
            </Box>
            <Box as="a" href={'https://datahonor.com/toydata/'}>
              ToyData
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
                <Box as="a" href={'https://datahonor.com/toystat/'}>
                ToyStat
                </Box>
                <Tag
                    size={'sm'}
                    bg={useColorModeValue('gray.300', 'gray.800')}
                    ml={2}
                    color={'white'}>
                    Coming
                </Tag>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Contact Me</ListHeader>
            <Box as="a" href={'https://github.com/shenxiangzhuang'}>
              Github
            </Box>
            <Box as="a" href={'https://twitter.com/MathewShen42'}>
              Twitter
            </Box>
            <Box as="a" href={'#'}>
              LinkedIn(TBD)
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2023 Mathew Shen. All rights reserved
        </Text>
      </Box>
    </Box>
  )
}