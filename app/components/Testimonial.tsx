'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const { children } = props

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function WithSpeechBubbles() {
  return (
    <Box 
    // bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12} centerContent>
        <Stack spacing={0} align={'center'}>
          <Heading>他/她们说</Heading>
          <Text>让世界听见你的声音</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>感慨良多</TestimonialHeading>
              <TestimonialText>
                我可能永远读不懂卡尔维诺，我可能不会停止读卡尔维诺。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://avatars.githubusercontent.com/u/17157965?v=4'
              }
              name={'Mathew Shen'}
              title={'小小白'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>喜欢卡尔维诺</TestimonialHeading>
              <TestimonialText>
                我不是奉承意大利人啊，我比较喜欢卡尔维诺。喜欢卡尔维诺。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://upload.wikimedia.org/wikipedia/zh/7/79/%E7%8E%8B%E5%B0%8F%E6%B3%A2.jpg'
              }
              name={'王小波'}
              title={'作家'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}