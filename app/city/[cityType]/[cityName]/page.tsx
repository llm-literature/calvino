import {
  Container,
  Heading,
  Stack,
  SimpleGrid,
  Box,
  Center,
  Image,
  Text
} from '@chakra-ui/react'

import ReactMarkdown from 'react-markdown';
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";

import data from '@/public/city/data.json';


export async function generateStaticParams() {
  const params = data.cities.map(city => ({
    cityType: city.type,
    cityName: city.name,
  }));
  return params;
}


function getCityDescription(cityType: string, cityName: string): string | undefined {
  const city = data.cities.find(
    (c) => c.type.toLowerCase() === cityType.toLowerCase() && c.name.toLowerCase() === cityName.toLowerCase()
  );
  return city?.description;
}

export default function CityPage({ params }: {params: { cityType: string, cityName: string }}) {
  const cityType = params.cityType;
  const cityName = params.cityName;

  const description = getCityDescription(cityType, cityName);
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`
  return (
    <Container minW={'100%'} minH={"100vh"}>
      <Box>
      <Stack
        textAlign={'center'}
        align={'center'}
        // spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 8 }}
      >
        {/*<Heading*/}
        {/*  fontWeight={600}*/}
        {/*  fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}*/}
        {/*  lineHeight={'110%'}>*/}
        {/*  Invisible Cities*/}
        {/*</Heading>*/}
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          {capitalizeString(cityType)}/{capitalizeString(cityName)}
        </Heading>
      </Stack>
      </Box>

        <Center>
          <SimpleGrid columns={1} spacing={1}>
            <Box>
              <Stack pt={1} align={'center'}>
              <Image
                rounded={'lg'}
                height={500}
                width={500}
                objectFit={'cover'}
                src={imageUrl}
                alt="#"
              />
              </Stack>
            </Box>
            <Box maxW={'80%'} justifySelf={'center'}>
                <Stack
                  // pt={1}
                  textAlign={'left'}
                  align={'left'}
                  textStyle="paragraph"
                  sx={{
                    textIndent: "2em",
                  }}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <Text fontSize="sm" color="gray.600" {...props} />
                      ),
                    }}>{description}</ReactMarkdown>
                </Stack>

            </Box>
        </SimpleGrid>
      </Center>
    </Container>
  )
}

