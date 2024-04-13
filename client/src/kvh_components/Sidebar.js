import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import {
  FiArrowDownCircle,
  FiBook,
  FiCalendar,
  FiCodesandbox,
  FiCpu,
  FiFile,
  FiHome,
  FiList,
  FiMonitor,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("investigator");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profile"));
    console.log("userData in sidebar:", userData);
    setUserRole(userData?.user_role);
  }, []);

  return (
    <Box
      bg="gray.900"
      color="white"
      w="60"
      h="100vh"
      px="4"
      py="36"
      position="fixed"
      left="0"
      top="0"
    >
      {userRole === "investigator" && (
        <VStack spacing="4" align="flex-start">
          {/* <SidebarLink icon={FiHome} link="home" label="Home" /> */}
          <SidebarLink
            icon={AiFillDashboard}
            link="dashboard"
            label="Dashboard"
          />
          <SidebarLink icon={FiCalendar} link="boards" label="Boards" />
          {/* <SidebarLink icon={FiUsers} link="users" label="Users" /> */}
          <SidebarLink icon={FiList} link="labels" label="Labels" />
          <SidebarLink icon={FiSearch} link="monitoring" label="Monitoring" />
          {/* <SidebarLink icon={FiBook} link="blogs" label="Blogs" /> */}
          <SidebarLink icon={FiSettings} link="auth/signin" label="Log Out" />
        </VStack>
      )}
      {userRole === "citizen" && (
        <VStack spacing="4" align="flex-start">
          {/* <SidebarLink icon={FiHome} link="home" label="Home" /> */}
          {/* <SidebarLink
            icon={AiFillDashboard}
            link="dashboard"
            label="Dashboard"
          /> */}
          {/* <SidebarLink icon={FiCalendar} link="boards" label="Boards" /> */}
          {/* <SidebarLink icon={FiUsers} link="users" label="Users" /> */}
          {/* <SidebarLink icon={FiList} link="labels" label="Labels" /> */}

          <SidebarLink icon={FiBook} link="blogs" label="Blogs" />
          <SidebarLink
            icon={FiSearch}
            link="complaint"
            label="File Complaint"
          />

          <SidebarLink icon={FiSettings} link="auth/signin" label="Log Out" />
        </VStack>
      )}
    </Box>
  );
};

const SidebarLink = ({ icon, label, link }) => {
  const pathName = window.location.pathname || "/none";
  console.log("pathName for dash", pathName);
  return (
    <a href={`/${link}`}>
      <Flex
        align="center"
        color={
          pathName && pathName.includes(`/${link}`)
            ? pathName === "/"
              ? ""
              : "blue.300"
            : ""
        }
        cursor="pointer"
        _hover={{ color: "blue.200" }}
        className="test"
      >
        <Box as={icon} fontSize="xl" mr="2" />
        <Text>{label}</Text>
      </Flex>
    </a>
  );
};

export default Sidebar;
