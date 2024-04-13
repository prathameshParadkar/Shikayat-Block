import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import APIRequests from "../api";
import { useNavigate } from "react-router-dom";
import { ActionTypes, auth } from "../reducers/auth";
import { useAppDispatch } from "../store";

export default function VerifyEmailForm({ open, handleClose, email }) {
  const [pin, setPin] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        otp: pin,
      };
      console.log("send", data);
      const res = await APIRequests.verifyOTP(data);
      console.log(res.data);
      if (res.status == 200) {
        console.log("success");
        // console.log("from verify otp", {
        //   name: res.data.name || "",
        //   email: email || "",
        //   token: res.data.token || "",
        //   privilege: res.data.privilege || 0,
        //   uid: res.data.uid || "",
        //   user_role: res.data.user_role || "",
        // });
        dispatch(
          auth({
            result: {
              name: res.data.name || "",
              email: email || "",
              token: res.data.token || "",
              privilege: res.data.privilege || 0,
              uid: res.data.uid || "",
              user_role: res.data.user_role || "",
            },
            type: ActionTypes.AUTH,
          })
        );

        if (res.data.user_role && res.data.user_role === "investigator") {
          navigate("/dashboard");
        } else {
          navigate("/blogs");
        }
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify your Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"sm"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={10}
            >
              <Center
                fontSize={{ base: "sm", sm: "md" }}
                color={useColorModeValue("gray.800", "gray.400")}
              >
                We have sent code to your email
              </Center>
              <Center
                fontSize={{ base: "sm", sm: "md" }}
                fontWeight="bold"
                color={useColorModeValue("gray.800", "gray.400")}
              >
                {email}
              </Center>
              <FormControl>
                <Center>
                  <Stack direction="row">
                    <PinInput onChange={(value) => setPin(value)}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </Stack>
                </Center>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                >
                  Verify
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
