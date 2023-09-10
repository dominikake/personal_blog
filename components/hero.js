"use client";

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function WithBackgroundImage() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1471958680802-1345a694ba6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1566&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "5xl", md: "6xl" })}
          >
            Embark on a Tech Journey: Thoughts, Discoveries, Unveilings
          </Text>
          <Text color={"white"} noOfLines={[1, 2, 3]} lineHeight={1.2}>
            This is a work in progress - one component at a time.
          </Text>
          <Stack direction={"row"}>
            <Link href="https://github.com/dominikake">
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                rounded={"full"}
                color={"white"}
              >
                Visit GitHub
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
