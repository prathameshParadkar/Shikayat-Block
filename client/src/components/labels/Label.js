import { useState, useEffect } from "react";
import LabelTable from "../Dashboard/LabelTable";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Image,
  InputAddon,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { AiFillDashboard } from "react-icons/ai";
// import { FiFile } from "react-icons/fi";
import { searchBar } from "../searchbar/searchbar";
// import { Box, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Image, InputAddon } from '@chakra-ui/react'
import { FiFile, FiList } from "react-icons/fi";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import APIRequests from "../../api";

const Label = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    APIRequests.getLabels()
      .then((res) => {
        let arr = [];

        let label = res.data.foundTransaction;

        for (let i = 0; i < label.length; i++) {
          arr.push({
            label: label[i].title,
            boardId: label[i].boardID ?? "",
            cryptoType: label[i].network,
          });
        }

        setData(arr);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  console.log(data);

  return (
    <Box py={16} px={6}>
      <Heading color="primary">
        <FiList style={{ display: "inline" }} /> Labels
      </Heading>
      <InputGroup mt={6} rounded={"md"}>
        <InputAddon pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputAddon>
        <Input
          type="text"
          variant={"outline"}
          placeholder="Search labels here"
          background={"white"}
          color={"primary"}
          w={"50%"}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}

        />
      </InputGroup>
      <Box mt={6}>
        {isLoading ? (
          <Flex w={"100%"} h={"50vh"} justify={"center"} align={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <LabelTable data={data.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))} />
        )}
      </Box>

    </Box>
  );
};

export default Label;
