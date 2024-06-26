import { Box, Container, VStack, Heading, Text, SimpleGrid, Image, Button, Input, Checkbox, CheckboxGroup, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stylish smartwatch with health tracking",
    price: 199,
    category: "Wearables",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    category: "Accessories",
    imageUrl: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearchQuery && matchesCategory && matchesPrice;
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Electronics Store</Heading>
        <Text fontSize="xl">Find the latest and greatest in electronics</Text>
        <Input
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
        />
        <CheckboxGroup colorScheme="teal" onChange={handleCategoryChange}>
          <Stack spacing={5} direction="row">
            <Checkbox value="Electronics">Electronics</Checkbox>
            <Checkbox value="Wearables">Wearables</Checkbox>
            <Checkbox value="Accessories">Accessories</Checkbox>
          </Stack>
        </CheckboxGroup>
        <Box width="100%">
          <Text>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
          <Slider
            min={0}
            max={1000}
            step={50}
            defaultValue={[0, 1000]}
            onChangeEnd={handlePriceChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} index={0} />
            <SliderThumb boxSize={6} index={1} />
          </Slider>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.imageUrl} alt={product.name} mb={4} />
              <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>${product.price}</Text>
              <Button colorScheme="teal">Add to Cart</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;