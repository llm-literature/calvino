'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'

import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";

interface CityCardProps {
  cityType: string
  cityName: string
}


export default function CityCard({cityType, cityName} : CityCardProps) {
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`;
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        maxH={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={1}
          pos={'relative'}
          height={'300px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imageUrl})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'full'}
            // height={230}
            // width={282}
            objectFit={'cover'}
            src={imageUrl}
            alt="#"
          />

        </Box>
        <Stack pt={10} align={'center'}>

          <Text fontWeight={300} fontSize={'l'}>
            {cityType.toUpperCase()}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            <LinkOverlay href={imagePath.split('.')[0]}>
                {capitalizeString(cityName)}
            </LinkOverlay>
          </Heading>
        </Stack>
      </Box>
    </Center>
  )
}



const DemoCityCardComponent = () => {
  return (
    <CityCard cityType="demo" cityName="hello"/>
  );
};

export { CityCard, DemoCityCardComponent };
