import { Formik, Form, Field } from "formik";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select, // Import Select component
} from "@chakra-ui/react";
import { object, string } from "yup";
import APIRequests from "../api";
import { useNavigate } from "react-router-dom";
import { ActionTypes, auth } from "../reducers/auth";
import { useAppDispatch } from "../store";
import { setShouldShowSideBar } from "../reducers/SiteCustom";
import { useEffect, useState } from "react";

import VerifyEmailForm from "./VerifyEmailCard";

const validationSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
  // userRole: string().required("User role is required"), // Add userRole validation
});

export default function Login() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(auth({ result: {}, type: ActionTypes.AUTH }));
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (values) => {
    setEmail(values.email);
    const res = await APIRequests.signIn(values).catch((err) => {
      console.log("Error in SignIn", err);
    });

    // console.log("login res",res)
    if (!res) {
      console.log("Error in SignIn");
      return;
    }

    setOpen(true);

    console.log("res", res);

    dispatch(
      auth({
        result: {
          name: res.data.name || "",
          email: values.email || "",
          token: res.data.token || "",
          privilege: res.data.privilege || 0,
          uid: res.data.uid || "",
          user_role: res.data.user_role || "",
        },
        type: ActionTypes.AUTH,
      })
    );

    // navigate("/boards/71a0d6d8");
  };

  return (
    <Flex
      // className= "w-full min-h-[calc(100vh-172px)]"
      className="w-full min-h-[calc(100vh-120px+32px)] mt-[-32px]"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VerifyEmailForm
        email={email}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign In</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              // , userRole: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} type="password" name="password" />
                </FormControl>
                <div className="w-[400px]"></div>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox name="rememberMe">Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>

                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
