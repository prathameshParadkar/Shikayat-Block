import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIRequests from "../api";
import { Progress } from "@chakra-ui/progress";
import ImageUpload from "./csi_hack_components/ImageUpload";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/progress";

const isDM = true;

const ComplaintForm = () => {
  const [netComLoading, setNetComLoading] = useState(false);
  const [authority, setAuthority] = useState(null);
  const [loading, setLoading] = useState(false);
  let active = true;
  let authorityNameTimeout = null;
  // let count = 0;

  const getAuthorityName = (complaint_description, active) => {
    // count += 1;
    APIRequests.getAuthorityName(complaint_description)
      .then((res) => {
        console.log(res);
        if (active) {
          setAuthority(res.data.authority);
          setLoading(false);
        } else {
          console.log("Request cancelled");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplaintDescriptionChange = (e) => {
    const { value } = e.target;
    console.log("from form", value);
    if (value.length > 5) {
      setLoading(true);
      if (authorityNameTimeout) {
        clearTimeout(authorityNameTimeout);
      }
      authorityNameTimeout = setTimeout(() => {
        getAuthorityName(value, active);
        // setLoading(false);
      }, 3000);
    } else {
      setAuthority(null);
    }
  };

  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState({
    progress: 0,
    status: "not started",
  });
  const onFileCancel = () => {
    setFile(null);
  };

  const initialValues = {
    complaint_title: "",
    complaint_description: "",
    complaint_type: "",
    authority: "",
    // category: "",
    // dateTime: "",
    // suspectAccountType: "",
    // suspectAccountLink: "",
    // suspectWalletAddress: "",
    // transactionId: "",
    // otherDetails: "",
  };

  const validationSchema = Yup.object().shape({
    complaint_title: Yup.string().required("Required"),
    complaint_description: Yup.string().required("Required"),
    complaint_type: Yup.string().required("Required"),
    // authority:
    // category: Yup.string().required("Required"),
    // dateTime: Yup.string().required("Required"),
    // suspectAccountType: Yup.string().required("Required"),
    // suspectAccountLink: Yup.string().required("Required"),
    // suspectWalletAddress: Yup.string().required("Required"),
    // transactionId: Yup.string().required("Required"),
    // otherDetails: Yup.string().required("Required"),
  });
  let fd = null;

  const onSubmit = async (values) => {
    try {
      setNetComLoading(true);
      {
        console.log(values);

        let formData = new FormData();
        formData.append("complaint_title", values.complaint_title);
        formData.append("complaint_description", values.complaint_description);
        // formData.append("complaint_type", values.complaint_type);
        formData.append("complaint_type", "Other");
        formData.append("authority", authority);
        // formData.append('file', file)
        // Append the file with a unique name ('file' in this case)
        // formData.append('complaint_documents', file);
        formData.append("file", file);

        // formData.append('complaint_status', 'pending')
        // formData.append('complaint_category', 'cybercrime')

        // formData.append('status', values.status)
        // formData.append('suspectAccountType', values.suspectAccountType)
        console.log(file);
        console.log(formData);
        if (isDM && false) {
          if (fd) {
            formData = fd;
          } else {
            fd = formData;
          }
        }
        const res = await APIRequests.createComplaint(formData);

        if (res && res.status === 200) {
          console.log(res.data);
          toast({
            title: "Form submitted successfully.",
            description: "We've uploaded your report for analysis.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (isDM) {
            return;
          }
          onClose();
          navigate(`/complaints`);
        } else {
          toast({
            title: "Form upload failed.",
            description: "We couldn't upload your report for analysis.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        // You can handle form submission logic here
      }
    } catch (error) {
    } finally {
      setNetComLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <div className="relative">
        <div
          className={
            netComLoading
              ? "fixed inset-0 w-full h-full bg-gray-400 bg-opacity-50 z-[100] flex items-center justify-center"
              : "hidden"
          }
        >
          <div>
            <CircularProgress isIndeterminate color="#0262AF" />
          </div>
        </div>
        <CSSReset />
        <Box p={8}>
          <Heading mb={4}>File a Complaint</Heading>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                <FormControl
                  id="complaint_title"
                  // name="complaint_title"
                  mb={4}
                  isInvalid={errors.complaint_title && touched.complaint_title}
                >
                  <FormLabel>Complaint Title</FormLabel>
                  <Field as={Input} type="text" name="complaint_title" />
                </FormControl>

                <FormControl
                  id="complaint_description"
                  mb={4}
                  // name="complaint_description"
                  isInvalid={
                    errors.complaint_description &&
                    touched.complaint_description
                  }
                >
                  <FormLabel>Complaint Description</FormLabel>
                  <Field
                    as={Input}
                    name="complaint_description"
                    type="text"
                    onChange={(e) => {
                      handleChange(e);
                      handleComplaintDescriptionChange(e);
                    }}
                    // onBlur={handleComplaintDescriptionChange}
                  ></Field>
                </FormControl>

                {false ? (
                  <p>Loading...</p>
                ) : authority || true ? (
                  // <p>Authority: {authority}</p>
                  // have text field here
                  <FormControl
                    id="authority"
                    mb={4}
                    isInvalid={errors.authority && touched.authority}
                  >
                    <FormLabel>Report To</FormLabel>
                    <Field
                      as={Input}
                      name="authority"
                      type="text"
                      value={
                        loading
                          ? "Loading..."
                          : values.complaint_description == ""
                          ? ""
                          : authority
                      }
                      // readOnly
                    />
                  </FormControl>
                ) : null}

                {/* <FormControl
                  id="complaint_type"
                  mb={4}
                  isInvalid={errors.complaint_type && touched.complaint_type}
                >
                  <FormLabel>Complaint Type</FormLabel>
                  <Field
                    as={Select}
                    name="complaint_type"
                    placeholder="Select a Complaint Type"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Petition ">Petition</option>
                    <option value="other">Other</option>
                  </Field>
                </FormControl> */}

                <FormLabel>Related Document</FormLabel>
                {file ? (
                  <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                        {file.name}
                      </span>
                      <button
                        onClick={() => {
                          setFile(null);
                        }}
                        className="text-[#07074D]"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                      <Progress value={uploading.progress} colorScheme="blue" />
                    </div>
                  </div>
                ) : (
                  <ImageUpload>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </ImageUpload>
                )}

                <Button colorScheme="blue" type="submit" className="mt-[1rem]">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default ComplaintForm;
