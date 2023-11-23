'use client'

import {
  Container,
  Heading,
  Stack,
  Button,
} from '@chakra-ui/react'
import Link from "next/link";
import WithSpeechBubbles from './Testimonial';


export default function LandingPage() {
  return (
    <Container minW={'100%'} minH={"100vh"}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Italo Calvino
        </Heading>

        <Button textAlign={"center"} color={"gray"}>
          <Link href={"/city"}>Invisible Cities</Link>
        </Button>
      </Stack>
      <WithSpeechBubbles/>
    </Container>
  )
}
