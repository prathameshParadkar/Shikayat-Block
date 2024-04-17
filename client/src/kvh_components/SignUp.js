import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select, // Add Select import
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import APIRequests from "../api";
import { ActionTypes, auth } from "../reducers/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { useTranslation } from "react-i18next";
import { setShouldShowSideBar } from "../reducers/SiteCustom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // phone: Yup.number()
  //   .required("phone is required")
  //   .positive("phone must be a positive number"),
  password: Yup.string().required("Password is required"),
  // .min(6, "Password must be at least 6 characters long"),
  userRole: Yup.string().required("User Role is required"),
});

export default function SignupCardOg() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    console.log("in handle submit", values);
    const body = {
      user_role: values.userRole,
      name: values.name,
      email: values.email,
      phone: values.phone,
      // phone: values.phone,
      password: values.password,
      // teamid: "-999",
      // teamname: "-999",
      // points: -999,
      // badges: [],
    };
    console.log("values", values);
    const res = await APIRequests.signUp(body).catch((err) => {
      console.log("Error in SignIn", err);
    });

    if (!res) {
      console.log("Error in SignIn");
      return;
    }
    console.log("res", res);

    dispatch(
      auth({
        result: {
          name: values.name || "",
          email: values.email || "",
          token: res.data.token || "",
          privilege: res.data.privilege || 0,
          uid: res.data.uid || "",
          user_role: values.user_role || "",
        },
        type: ActionTypes.AUTH,
      })
    );

    actions.resetForm();
    actions.setSubmitting(false);

    navigate("/auth/signin");
  };

  return (
    <Flex
      // minH={"100vh"}
      // className= "min-h-[calc(100vh-172px)]"
      className="min-h-[calc(100vh-120px+32px)] mt-[-32px]"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {t("signup.title")}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {t("signup.description")}
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
              name: "",
              email: "",
              phone: "",
              password: "",
              userRole: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl
                    id="name"
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    <FormLabel>{t("name")}</FormLabel>
                    <Field name="name" as={Input} type="text" />
                    <ErrorMessage
                      name="name"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>

                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel>{t("email")}</FormLabel>
                    <Field name="email" as={Input} type="email" />
                    <ErrorMessage
                      name="email"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>

                  <FormControl
                    id="phone"
                    isRequired
                    isInvalid={errors.phone && touched.phone}
                  >
                    <FormLabel>Phone Number</FormLabel>
                    <Field name="phone" as={Input} type="number" />
                    <ErrorMessage
                      name="phone"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel>{t("password")}</FormLabel>
                    <InputGroup>
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                        )}
                      </Field>
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <ErrorMessage
                      name="password"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                  <FormControl
                    id="userRole"
                    isRequired
                    isInvalid={errors.userRole && touched.userRole}
                  >
                    <FormLabel>{t("userRole")}</FormLabel>
                    <Field name="userRole" as={Select}>
                      <option value="">{t("signup.selectRole")}</option>
                      <option value="authority">{"Authority"}</option>
                      <option value="citizen">{"Citizen"}</option>
                    </Field>
                    <ErrorMessage
                      name="userRole"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                  <div className="w-[400px]"></div>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      {t("signup.button")}
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link color={"blue.400"} href="/auth/signin">
                        {t("signin.title")}
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
