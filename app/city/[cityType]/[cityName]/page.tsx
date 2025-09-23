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
  // Process literal \n characters to actual newlines for proper text display
  return city?.description?.replace(/\\n/g, '\n');
}

export default function CityPage({ params }: {params: { cityType: string, cityName: string }}) {
  const cityType = params.cityType;
  const cityName = params.cityName;

  const description = getCityDescription(cityType, cityName);
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`
  return (
    <Container maxW={'7xl'} minH={"100vh"} py={{ base: 8, md: 12 }}>
      {/* Title Section */}
      <Box mb={{ base: 8, md: 12 }}>
        <Stack
          textAlign={'center'}
          align={'center'}
          py={{ base: 4, md: 6 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            mb={{ base: 4, md: 6 }}>
            {capitalizeString(cityType)}/{capitalizeString(cityName)}
          </Heading>
        </Stack>
      </Box>

      {/* Content Section */}
      <SimpleGrid 
        columns={{ base: 1, lg: 2 }} 
        spacing={{ base: 8, md: 12, lg: 16 }}
        alignItems={'start'}
      >
        {/* Image Section */}
        <Box>
          <Center>
            <Image
              rounded={'xl'}
              height={{ base: 400, md: 500, lg: 600 }}
              width={{ base: 400, md: 500, lg: 600 }}
              objectFit={'cover'}
              src={imageUrl}
              alt={`${capitalizeString(cityName)} - ${capitalizeString(cityType)}`}
              shadow={'xl'}
              transition={'transform 0.3s ease'}
              _hover={{ transform: 'scale(1.02)' }}
            />
          </Center>
        </Box>

        {/* Text Section */}
        <Box>
          <Stack
            spacing={4}
            textAlign={{ base: 'left', lg: 'left' }}
            px={{ base: 4, md: 6, lg: 0 }}
          >
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <Text 
                    fontSize={{ base: 'md', md: 'lg' }}
                    lineHeight={1.8}
                    color="gray.700"
                    textAlign={'justify'}
                    mb={4}
                    sx={{
                      textIndent: "2em",
                      whiteSpace: 'pre-line' // This allows newlines to be displayed properly
                    }}
                    {...props} 
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

