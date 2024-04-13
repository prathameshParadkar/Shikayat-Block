import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillDashboard } from "react-icons/ai";
import LabelTable from "./LabelTable";
import WebHook from "./WebHook";
import APIRequests from "../../api";
import ComplainsTable from "../ComplaintsTable";
import { useAppDispatch } from "../../store";
import { setShouldShowSideBar } from "../../reducers/SiteCustom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShouldShowSideBar(true));
  }, []);

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
  return (
    <Box py={16} px={6}>
      <Heading color="primary">
        <AiFillDashboard style={{ display: "inline" }} /> Dashboard
      </Heading>

      <Grid
        mt={6}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem boxShadow={"lg"} rounded={"lg"} rowSpan={2} colSpan={1}>
          {isLoading ? (
            <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
              <Spinner />
            </Flex>
          ) : (
            <LabelTable data={data} />
          )}
        </GridItem>

        <GridItem boxShadow={"lg"} rounded={"lg"} colSpan={2}>
          {/* {loading ? <Box textAlign={'center'}><Spinner /></Box> :<WebHook />} */}

          <WebHook />
        </GridItem>

        <GridItem colSpan={2} bg="transaparent">
          {/* <div>Test</div> */}
          {/* add complaints table here */}
        </GridItem>

        <GridItem colSpan={4}>
          <Heading color="primary" className="mb-[1rem] mt-[1rem]">
            Complaints
          </Heading>
          <ComplainsTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
