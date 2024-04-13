import React, { useEffect, useRef, useState } from "react";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import APIRequests from "../../api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { setShouldShowSideBar } from "../../reducers/SiteCustom";

const Trust = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mInputRef = useRef();
  const [isRisky, setIsRisky] = useState(null); // Initialize isRisky as null
  const [combinedRiskValue, setCombinedRiskValue] = useState(null);

  useEffect(() => {
    dispatch(setShouldShowSideBar(true));
  }, []);
  const handleInputChange = async (add) => {
    const address = add; // Get the entered address from the input
    try {
      const res = await APIRequests.getRisk(address);
      console.log("res: ", res);
      const combinedRiskStr = res.data.mdata.riskScores.combinedRisk;
      const combinedRisk = Number.parseInt(combinedRiskStr);
      console.log("Risk value:", combinedRisk);

      if (combinedRisk >= 85) {
        setIsRisky("high risk");
      } else if (combinedRisk >= 35 && combinedRisk < 85) {
        setIsRisky("moderate risk");
      } else {
        setIsRisky("low risk");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="bg-white shadow-md flex rounded-lg mx-36 my-20">
      <div style={{ flex: 1, padding: "16px" }}>
        <h4 style={{ fontSize: "20px", marginBottom: "8px" }}>Can I trust?</h4>
        <InputGroup>
          <Input
            ref={mInputRef}
            placeholder="Enter the value"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <InputRightAddon
            children="Check Risk"
            onClick={() => handleInputChange(mInputRef.current.value)}
            cursor="pointer"
            bgColor="blue.500"
            color="white"
            _hover={{ bgColor: "blue.600" }}
          />
        </InputGroup>
      </div>

      {/* <div
        className= "mt-[60px] underline cursor-pointer"
        onClick={() => {
          navigate("/complaint");
        }}
      >
        Launch Complaint
      </div> */}
      <div style={{ flex: 1, padding: "16px" }} className="mt-[50px]">
        {isRisky && (
          <div>
            <p
              style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 0 }}
            >
              Risk: {isRisky}
            </p>
            {/* {combinedRiskValue !== null && (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: 0,
                }}
              >
                Value: {combinedRiskValue + " %"}
              </p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trust;
