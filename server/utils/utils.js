// import { exec } from "child_process";
const { exec } = require("child_process");

const getAuthorityFromComplaint = async (complaintDescription) => {
  try {
    return await new Promise((resolve, reject) => {
      try {
        exec(
          `py scripts/prompt.py "${complaintDescription}"`,
          async (error, stdout, stderr) => {
            if (error || stderr) {
              console.error(`Error: ${error || stderr}`);
              resolve(null);
              return;
            }

            const authorityName = stdout.trim();
            console.log("complaintDescription: ", complaintDescription);
            console.log("Authority Name: ", authorityName);

            resolve(authorityName);
          }
        );
      } catch (error) {
        console.error("Error getting authority", error);
        resolve(null);
      }
    });
  } catch (error) {
    console.log("Error getting authority", error);
    return null;
  }
};
const getPriorityFromComplaint = async (complaintDescription) => {
  try {
    return await new Promise((resolve, reject) => {
      try {
        exec(
          `py scripts/prompt.py "get_priority" "${complaintDescription}"`,
          async (error, stdout, stderr) => {
            if (error || stderr) {
              console.error(`Error: ${error || stderr}`);
              resolve(null);
              return;
            }

            const priority = stdout.trim();
            console.log("complaintDescription: ", complaintDescription);
            console.log("Priority", priority);

            resolve(priority);
          }
        );
      } catch (error) {
        console.error("err priority", error);
        resolve(null);
      }
    });
  } catch (error) {
    console.log("err priority", error);
    return null;
  }
};

exports.getAuthorityFromComplaint = getAuthorityFromComplaint;
exports.getPriorityFromComplaint = getPriorityFromComplaint;
