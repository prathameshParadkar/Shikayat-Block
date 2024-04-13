import React from "react";
import {
  Table,
  Text,
  Th,
  Thead,
  Tbody,
  TableContainer,
  Td,
  Tr,
  HStack,
  Badge,
  Tag,
} from "@chakra-ui/react";
import { typeToImgMap } from "../navbar/navbar";

const LabelTable = ({ data }) => {
  console.log("data form label table", data);
  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead bgColor="primary">
            <Th color="white">Label</Th>
            <Th color="white">BoardLink</Th>
            <Th color="white">Crypto</Th>
          </Thead>
          <Tbody>
            {data && data.length > 0 ? (
              data.map((data, id) => (
                <TableRow
                  key={id}
                  label={data.label}
                  boardId={data.boardId}
                  cryptoType={data.cryptoType}
                />
              ))
            ) : (
              <Text p={5}>No Labels Found</Text>
            )}
          </Tbody>
        </Table>
        {/* <EmptyState show={false} /> */}
      </TableContainer>
    </>
  );
};

const TableRow = ({ label, boardId, cryptoType }) => {
  // console.log(boardId)
  return (
    <Tr>
      <Td>{label}</Td>
      <Td maxW={"200px"} pr={10} overflow={"hidden"}>
        <Tag colorScheme="blue" overflow={"hidden"}>
          <a href={`/boards/${boardId}`}>/{boardId}</a>
        </Tag>
      </Td>
      <Td maxW={"400px"} pr={10} overflow={"hidden"}>
        <HStack align={"center"}>
          <img
            width={20}
            height={20}
            src={typeToImgMap[cryptoType]}
            alt={cryptoType}
          />
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            {cryptoType.toUpperCase()}
          </Text>
        </HStack>
      </Td>
    </Tr>
  );
};

export default LabelTable;
