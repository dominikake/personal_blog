import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import { Icon, createIcon } from "@chakra-ui/react";

const HeartIcon = createIcon({
  displayName: "HeartIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="red"
      d="M12 21.35l-1.45-1.32C4.54 14.35.99 10.98 1 6.75c0-2.42 1.01-4.6 2.64-6.18C5.5-.21 8.22-.21 9.85 1.4L12 3.14l2.15-1.74c1.63-1.61 4.35-1.61 5.98 0 1.63 1.58 2.64 3.76 2.64 6.18 0 4.23-3.55 7.6-10.55 13.28L12 21.35z"
    />
  ),
});

export default function FooterSmallCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={4}
    >
      <Container
        maxW={"6xl"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontSize="xs" color="gray.500">
          Made with <Icon as={HeartIcon} w={3} h={3} /> in CDO
        </Text>
        <Text fontSize="xs" color="gray.500">
          Copyright © 2023
        </Text>
      </Container>
    </Box>
  );
}
