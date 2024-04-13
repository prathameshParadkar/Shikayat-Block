import { CheckIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";

const RightDrawer = ({ data: timeline, isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [remark, setRemark] = useState("");
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const onSubmit = () => {
    console.log(selectedOption, remark);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}

      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Remark</DrawerHeader>

        <DrawerBody>
          <div className="flex flex-col-reverse ">
            <div className="flex ">
              <div className="w-full">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add your Remark
                </label>

                <div className="mt-1">
                  <textarea
                    rows={4}
                    onChange={(e) => setRemark(e.target.value)}
                    name="comment"
                    id="comment"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md"
                    defaultValue={""}
                  />
                </div>
              </div>
              {/* <div></div> */}
            </div>

            <div>
              <div className="flex justify-center space-x-4">
                <div
                  className={`relative w-24 mb-4 h-10 rounded-full border border-gray-300 text-black overflow-hidden ${
                    selectedOption === "success"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    id="success"
                    name="option"
                    value="success"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={() => handleOptionChange("success")}
                  />
                  <label
                    htmlFor="success"
                    className="block w-full h-full py-2 text-center text-white font-semibold"
                  >
                    Success
                  </label>
                </div>
                <div
                  className={`relative w-24 h-10 rounded-full border border-gray-300 text-black overflow-hidden ${
                    selectedOption === "warn" ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    id="warn"
                    name="option"
                    value="warn"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={() => handleOptionChange("warn")}
                  />
                  <label
                    htmlFor="warn"
                    className="block w-full h-full py-2 text-center text-white font-semibold"
                  >
                    Warn
                  </label>
                </div>
                <div
                  className={`relative w-24 h-10 rounded-full border border-gray-300 text-black overflow-hidden ${
                    selectedOption === "fail" ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    id="fail"
                    name="option"
                    value="fail"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={() => handleOptionChange("fail")}
                  />
                  <label
                    htmlFor="fail"
                    className="block w-full h-full py-2 text-center text-white font-semibold"
                  >
                    Fail
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSubmit}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RightDrawer;
