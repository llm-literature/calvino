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
      <Container as={Stack} py={10} centerContent
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={50}
        >
          <Stack align={'flex-start'} >
            <ListHeader>Github</ListHeader>
            <Box as="a" href={'https://github.com/llm-literature'}>
              Organization
            </Box>
              <Box as="a" href={'https://github.com/llm-literature/calvino'}>
                Repository
              </Box>
            <Stack direction={'row'} align={'center'} spacing={-1}>
              <Box as="a" href={'https://github.com/llm-literature/calvino/discussions'}>
                Discussion
              </Box>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}>
                New
              </Tag>
            </Stack>

            <Box as="a" href={'https://github.com/llm-literature/calvino/releases'}>
              Releases
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Project</ListHeader>
            <Stack direction={'row'} align={'center'} spacing={-1}>
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
            <Box as="a" href={'https://datahonor.com/toyml/'}>
              ToyML
            </Box>
            <Box as="a" href={'https://datahonor.com/toydl/'}>
              ToyDL
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Odyssey</ListHeader>
             <Box as="a" href={'https://datahonor.com/odyssey/aiops/'}>
              AIOps
            </Box>
            <Box as="a" href={'https://datahonor.com/odyssey/mlsys/'}>
              MlSys
            </Box>
            <Box as="a" href={'https://datahonor.com/odyssey/chc/'}>
              Crowdsourcing
            </Box>
            <Stack direction={'row'} align={'center'} spacing={-1}>
              <Box as="a" href={'https://datahonor.com/odyssey/llm/'}>
                LLM
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
            <ListHeader>Contact</ListHeader>
            <Box as="a" href={'https://datahonor.com'}>
              Website
            </Box>
            <Box as="a" href={'https://github.com/shenxiangzhuang'}>
              Github
            </Box>
            <Box as="a" href={'https://twitter.com/MathewShen42'}>
              Twitter
            </Box>
            <Box as="a" href={'https://linkedin.com/in/mathewshen'}>
              LinkedIn
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