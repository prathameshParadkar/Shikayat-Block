import {
  Box,
  Text,
  TableContainer,
  Table,
  Th,
  Thead,
  Tbody,
  Badge,
  Flex,
  Divider,
  Stack,
  HStack,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { typeToImgMap } from "../navbar/navbar";
import { FiArrowRight } from "react-icons/fi";

const WebHook = () => {
  return (
    <Box w={"full"} h={"full"}>
      <TableContainer>
        <Table>
          <Thead bgColor="primary">
            <Th color="white">Current Address being tracked</Th>
          </Thead>
          <Tbody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={8}
          >
            <Stack align={"center"}>
              {/* <HStack>
                <Text ml={3} fontWeight={"semibold"} fontSize={"xl"}>
                  NA
                </Text>
              </HStack> */}

              <HStack>
                <img width={20} height={20} src={typeToImgMap["eth"]} alt="" />
                <Text ml={3} fontWeight={"semibold"} fontSize={"xl"}>
                  0xab5c66752a9e8167967685f1450532fb96d5d24f
                </Text>
              </HStack>
              <Divider />
              <Flex
                gap={4}
                mt={3}
                flexWrap={"wrap"}
                width={"75%"}
                justify={"space-evenly"}
              >
                <Box display={"inline"}>
                  Balance:
                  <Tag ml={2} variant={"outline"} colorScheme="blue">
                    0.9 ETH
                  </Tag>
                </Box>
                <Box display={"inline"}>
                  Conformations:
                  <Tag ml={2} variant={"outline"} colorScheme="blue">
                    2
                  </Tag>
                </Box>
                <Box display={"inline"}>
                  Time:
                  <Tag ml={2} variant={"outline"} colorScheme="blue">
                    15/08/2023
                  </Tag>
                </Box>
                <Box display={"inline"}>
                  Token address:
                  <Tag ml={2} variant={"outline"} colorScheme="blue">
                    0xdac17f958d2ee523a2206206994597c13d831ec7
                  </Tag>
                </Box>
              </Flex>

              <a href="/monitoring">
                <HStack mt={2} textDecor={"underline"}>
                  <Text>Monitor more address</Text>
                  <FiArrowRight />
                </HStack>
              </a>
            </Stack>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WebHook;
