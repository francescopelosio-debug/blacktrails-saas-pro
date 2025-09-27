"use client"

import React from "react"
import NextLink from "next/link"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  VStack,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
} from "@chakra-ui/react"
import { FiArrowRight, FiPlay } from "react-icons/fi"

export interface HeroProps {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({
  title = (
    <>
      Build beautiful
      <br />
      <Text
        as="span"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
      >
        software faster
      </Text>
    </>
  ),
  description = "Modern SaaS platform that doesn't get in your way and helps you build intuitive products with speed.",
  children,
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.600", "gray.400")
  const badgeBg = useColorModeValue("cyan.50", "gray.800")

  return (
    <Box position="relative" overflow="hidden">
      {/* Background gradient effect */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="120%"
        height="120%"
        bgGradient="radial-gradient(circle at center, var(--chakra-colors-cyan-500), transparent 70%)"
        opacity={useColorModeValue(0.03, 0.05)}
        pointerEvents="none"
        filter="blur(60px)"
      />

      <Container maxW="container.xl" pt={{ base: 20, lg: 40 }} pb={{ base: 16, lg: 24 }}>
        <Stack spacing={{ base: 8, lg: 10 }} align="center">
          {/* Announcement Badge */}
          <Badge
            bg={badgeBg}
            color={useColorModeValue("cyan.700", "cyan.300")}
            px={3}
            py={1}
            borderRadius="full"
            textTransform="none"
            fontSize="sm"
            fontWeight="medium"
            border="1px solid"
            borderColor={useColorModeValue("cyan.200", "gray.700")}
          >
            🚀 New: AI-powered features now available
          </Badge>

          {/* Main Content */}
          <VStack spacing={6} textAlign="center" maxW="3xl">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              letterSpacing="tight"
            >
              {title}
            </Heading>

            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              color={textColor}
              maxW="2xl"
              lineHeight="relaxed"
            >
              {description}
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack spacing={4} pt={4}>
            <Button
              as={NextLink}
              href="/signup"
              size="lg"
              colorScheme="cyan"
              rightIcon={<Icon as={FiArrowRight} />}
              px={8}
              bg="cyan.500"
              color="white"
              _hover={{
                bg: "cyan.600",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Get Started Free
            </Button>

            <Button
              as={NextLink}
              href="#demo"
              size="lg"
              variant="outline"
              leftIcon={<Icon as={FiPlay} />}
              borderColor={borderColor}
              color={useColorModeValue("gray.700", "gray.300")}
              _hover={{
                bg: useColorModeValue("gray.50", "whiteAlpha.50"),
                borderColor: "cyan.500",
                color: "cyan.500",
              }}
            >
              Watch Demo
            </Button>
          </HStack>

          {/* Screenshot/Preview */}
          <Box
            mt={10}
            position="relative"
            width="100%"
            maxW="5xl"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
            border="1px solid"
            borderColor={borderColor}
            bg={bgColor}
          >
            {/* Gradient border effect */}
            <Box
              position="absolute"
              top={-1}
              left={-1}
              right={-1}
              bottom={-1}
              bgGradient="linear-gradient(45deg, var(--chakra-colors-cyan-400), var(--chakra-colors-blue-500), var(--chakra-colors-purple-500))"
              opacity={0.1}
              filter="blur(10px)"
              zIndex={-1}
            />

            {/* Dashboard Preview Container */}
            <Flex
              align="center"
              justify="center"
              height={{ base: "300px", md: "400px", lg: "500px" }}
              bg={useColorModeValue("white", "gray.800")}
              position="relative"
            >
              <VStack spacing={4} opacity={0.3}>
                <Box
                  w="100px"
                  h="100px"
                  borderRadius="lg"
                  bg="cyan.500"
                  opacity={0.3}
                />
                <Text fontSize="lg" fontWeight="medium">
                  Dashboard Preview
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Your app screenshot here
                </Text>
              </VStack>
            </Flex>
          </Box>

          {/* Trust indicators */}
          <HStack spacing={8} pt={6} color={textColor} fontSize="sm">
            <HStack>
              <Text fontWeight="bold">✓</Text>
              <Text>No credit card required</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">✓</Text>
              <Text>14-day free trial</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">✓</Text>
              <Text>Cancel anytime</Text>
            </HStack>
          </HStack>

          {children}
        </Stack>
      </Container>
    </Box>
  )
}
