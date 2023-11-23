'use client'

import {
  Container,
  Heading,
  Stack,
  Button,
  Box,
} from '@chakra-ui/react'
import Link from "next/link";
import CityCard, {DemoCityCardComponent} from '@/app/components/CityCard';
import { SimpleGrid } from '@chakra-ui/react'

import data from '@/public/city/data.json';

export default function InvisibleCityPage() {
    const cityCardComponents = data.cities.map((city) => (
    <CityCard cityType={city.type} cityName={city.name} key={`${city.type}.${city.name}`}/>
  ));

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
          Invisible Cities
        </Heading>
      </Stack>

      <SimpleGrid minChildWidth={'300px'} spacing={5}>
        {cityCardComponents}
      </SimpleGrid>
    </Container>
  )
}
