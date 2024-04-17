import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ChakraProvider,
  Box,
  Heading,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import APIRequests from "../../api";
import { useEffect, useState } from "react";

const data = [
  {
    category: "Fraud",
    dateTime: "2023-08-09 10:30 AM",
    suspectAccountType: "Email",
    suspectAccountLink: "example@example.com",
    suspectWalletAddress: "0x1234567890abcdef",
    transactionId: "abc123",
    otherDetails: "Some additional details about the case.",
    status: "Unassigned",
  },
  {
    category: "Money Laundering",
    dateTime: "2023-08-09 02:15 PM",
    suspectAccountType: "Username",
    suspectAccountLink: "@fakeuser",
    suspectWalletAddress: "0x9876543210fedcba",
    transactionId: "def456",
    otherDetails: "Additional information related to the case.",
    status: "In Progress",
  },
  {
    category: "Scam",
    dateTime: "2023-08-09 05:45 AM",
    suspectAccountType: "Phone Number",
    suspectAccountLink: "+1234567890",
    suspectWalletAddress: "0xfedcba0987654321",
    transactionId: "ghi789",
    otherDetails: "Detailed description of the case.",
    status: "Closed",
  },
  {
    category: "Identity Theft",
    dateTime: "2023-08-10 01:30 PM",
    suspectAccountType: "Social Media",
    suspectAccountLink: "@identitythief",
    suspectWalletAddress: "0x6543210987abcdef",
    transactionId: "jkl012",
    otherDetails: "Additional context about the case.",
    status: "Unassigned",
  },
  {
    category: "Hacking",
    dateTime: "2023-08-11 11:00 AM",
    suspectAccountType: "IP Address",
    suspectAccountLink: "192.168.1.1",
    suspectWalletAddress: "0x0123456789abcdef",
    transactionId: "mno345",
    otherDetails: "Elaboration on the case details.",
    status: "In Progress",
  },
  {
    category: "Insider Trading",
    dateTime: "2023-08-11 03:45 PM",
    suspectAccountType: "Employee ID",
    suspectAccountLink: "#12345",
    suspectWalletAddress: "0xabcdef0123456789",
    transactionId: "pqr567",
    otherDetails: "Additional insights into the case.",
    status: "Closed",
  },
  {
    category: "Phishing",
    dateTime: "2023-08-12 09:20 AM",
    suspectAccountType: "URL",
    suspectAccountLink: "http://fakephish.com",
    suspectWalletAddress: "0x56789abcdef0123",
    transactionId: "stu789",
    otherDetails: "Further notes about the case.",
    status: "Unassigned",
  },
  {
    category: "Embezzlement",
    dateTime: "2023-08-12 01:00 PM",
    suspectAccountType: "Bank Account",
    suspectAccountLink: "1234567890",
    suspectWalletAddress: "0x89abcdef01234567",
    transactionId: "vwx890",
    otherDetails: "More information about the case.",
    status: "In Progress",
  },
  {
    category: "Bribery",
    dateTime: "2023-08-13 10:10 AM",
    suspectAccountType: "Company Name",
    suspectAccountLink: "FakeCorp",
    suspectWalletAddress: "0x0123456789abcdef",
    transactionId: "yz012",
    otherDetails: "Additional case context.",
    status: "Closed",
  },
  {
    category: "Data Breach",
    dateTime: "2023-08-13 03:30 PM",
    suspectAccountType: "Server IP",
    suspectAccountLink: "123.456.78.90",
    suspectWalletAddress: "0xabcdef0123456789",
    transactionId: "abc123",
    otherDetails: "In-depth information about the case.",
    status: "Unassigned",
  },
];
const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

const AdminComplaint = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;

    APIRequests.getComplaints()
      .then((res) => {
        if (active) {
          console.log("Data: ", res.data);
          setData(res.data.data);
        }
        active = false;
      })
      .catch((err) => {
        console.log("Error in fetching complaints", err);
        active = false;
      });

    return () => {
      active = false;
    };
  }, []);
  const navigate = useNavigate();
  const onButtonClick = (complaint_id) => {
    console.log(data);
    navigate(`/admin/complaints/${complaint_id}`);
  };
  return (
    <ChakraProvider>
      <Box p={8}>
        <Heading mb={4}>User Complaints</Heading>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {data.map((positions) => {
              console.log("positions", positions);
              let position = positions.complaints[0].data;

              if (!position) return null;
              return (
                <li key={position.complaint_id}>
                  {/* <a href="#" className="block hover:bg-gray-50"> */}
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center ">
                        <p className="text-2xl font-medium text-[#0262AF] truncate">
                          {position.complaint_title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {position.complaint_type}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {/* <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p>
                        Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                      </p> */}
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() =>
                            onButtonClick(position.complaint_group_id)
                          }
                        >
                          View Complaint
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {position.reporting_agency}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {position.complaint_created_date}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}
                </li>
              );
            })}
          </ul>
        </div>
      </Box>
    </ChakraProvider>
  );
};

export default AdminComplaint;
