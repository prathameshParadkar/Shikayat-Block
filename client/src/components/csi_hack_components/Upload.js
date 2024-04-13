
import ImageUpload from "./ImageUpload";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Lorem, Progress } from "@chakra-ui/react";
import { useState } from "react";
// import { storage } from "@/app/firebase";
// import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { PlusIcon } from "@heroicons/react/outline";

const Upload = () => {
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState({ progress: 0, status: 'not started' })
    const onFileCancel = () => {
        setFile(null)
    }

    // const onUpload = () => {

    //     const storageRef = ref(storage, `reports/$` + uuidv4())
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             // console.log('Upload is ' + progress + '% done')
    //             switch (snapshot.state) {
    //                 case 'paused':
    //                     // console.log('Upload is paused')
    //                     setUploading({ progress, status: 'paused' })
    //                     break
    //                 case 'running':
    //                     // console.log('Upload is running')
    //                     setUploading({ progress, status: 'running' })
    //                     break
    //             }
    //         },
    //         (error) => {
    //             console.log(error)
    //             toast({
    //                 title: "Report upload failed.",
    //                 description: "We couldn't upload your report for analysis.",
    //                 status: "error",
    //                 duration: 3000,
    //                 isClosable: true,
    //             })
    //         },
    //         () => {
    //             toast({
    //                 title: "Report uploaded.",
    //                 description: "We've uploaded your report for analysis.",
    //                 status: "success",
    //                 duration: 3000,
    //                 isClosable: true,
    //             })
    //             onClose()
    //             onFileCancel()
    //         }
    //     )
    // }

    const onUploadV2 = async () => {
        const formData = new FormData()
        formData.append('file', file)
        console.log(file)
        const headers = {
            "ngrok-skip-browser-warning": "1231",
        }
        axios.post('https://b0f1-2401-4900-5095-5a23-a966-e6f3-1760-1ebe.ngrok-free.app/upload',
            formData, {
            headers: headers,
        }
        )
            .then((response) => {
                if (response.data.status == '1') {
                    console.log(response.data.data)
                    toast({
                        title: "Report uploaded.",
                        description: "We've uploaded your report for analysis.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    })
                    onClose()
                    onFileCancel()
                } else {
                    toast({
                        title: "Report upload failed.",
                        description: "We couldn't upload your report for analysis.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                }
            }, (error) => {
                console.log(error);
                toast({
                    title: "Server Error",
                    description: "We couldn't upload your report for analysis.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            });
    }
    console.log(file)
    return (
        <>
            <button className="ml-3 inline-flex items-center pr-4 pl-2 py-2 border border-transparent rounded-md shadow-sm text-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-h-12" onClick={onOpen}>
                {/* <PlusIcon className="flex-shrink-0 h-5 w-5 text-white mx-2" aria-hidden="true" /> */}
                Upload</button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload your report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {file ? <div class="rounded-md bg-[#F5F7FB] py-4 px-8">
                            <div class="flex items-center justify-between">
                                <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                                    {file.name}
                                </span>
                                <button onClick={() => {
                                    setFile(null)

                                }} class="text-[#07074D]">
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
                            <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                                <Progress value={uploading.progress} colorScheme='blue' />
                            </div>
                        </div>
                            : (<ImageUpload>
                                <input id="dropzone-file" type="file" class="hidden" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </ImageUpload>)
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" variant='ghost' onClick={() => {
                            onClose()
                            onFileCancel()
                        }}>Cancel</Button>
                        <Button colorScheme='blue' mr={3} isDisabled={file ? false : true}
                            onClick={() => {
                                // onUpload()
                                onUploadV2()
                            }}
                        >
                            Med Scan it
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Upload