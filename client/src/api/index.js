import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// export const signIn = (data) => API.post("/users/login", data);
// export const testGet = () => API.get("/");

class APIRequests {
  static async snap(formData) {
    return await API.post("/api/explore/snap", formData);
  }

  static async mtest() {
    return await API.get(
      "/api/explore/risk/0xeEE27662c2B8EBa3CD936A23F039F3189633e4C8"
    );
  }
  static async signIn(data) {
    return await API.post("/auth/login", data);
  }
  static async signUp(data) {
    return await API.post("/auth/register", data);
  }

  static async testGet() {
    return await API.get("/users");
  }

  static async getRoomData(gameID, userID) {
    return await API.post("/auth/getRoomDetails", {
      gameID,
      userID,
    });
  }

  static async createRoom(userID) {
    return await API.post("/auth/createGameRoom", {
      uid: userID,
    });
  }

  static async joinRoom(userID, gameID) {
    return await API.post("/auth/joinGameRoom", {
      _id: userID,
      gameID: gameID,
    });
  }

  // static async testGet() {
  //   return await API.get("/users");
  // }

  static async explore(address) {
    return await API.get(`/api/explore/${address}`);
  }

  static async getRisk(address) {
    return await API.get(`/api/explore/risk/${address}`);
  }

  static async changeTitle(address, data) {
    return await API.post(`/api/explore/title/${address}`, data);
  }

  static async getExchangeRate(from_currency, to_currency) {
    return await API.get(
      `/api/explore/exchange/${from_currency}/${to_currency}`
    );
  }

  static async getLabels() {
    return await API.get(
      // `/api/explore/get/list`
      "/api/explore/get/list"
    );
  }

  static async verifyOTP(data) {
    return await API.post("/auth/otp", data);
  }

  static async addMonitorAddress(address) {
    return await API.get(`/api/explore/add/address/${address}`);
  }

  static async setMonitorAddress() {
    return await API.get(`/api/explore/set/webhookUrl`);
  }

  static async removeMonitorAddress(address) {
    return await API.get(`/api/explore/remove/address${address}`);
  }

  static async showMonitorAddress(nw) {
    return await API.get(`/api/explore/show/address/${nw}`);
  }

  static async addRemark(address, data) {
    console.log(`/api/explore/remark/${address}`);
    return await API.post(`/api/explore/remark/${address}`, data);
  }

  static async createComplaint(data) {
    return await API.post(`/api/complaint/create`, data);
  }

  static getAuthorityName = async (complaintDescription) => {
    const body = {
      complaint_description: complaintDescription,
    };
    console.log("body", body);
    return await API.post("/api/complaint/get_authority", body);
  };

  // get_complaints
  static getComplaints = async () => {
    return await API.get("/api/complaint/get_complaints");
  };

  // /get_complaints/:id
  static getComplaint = async (id) => {
    return await API.get(`/api/complaint/get_complaints/${id}`);
  };

  // updateComplaint
  static updateComplaint = async (id, data) => {
    const fdata = {
      userId: data.user_id,
      subject: data.complaint_title,
      description: data.complaint_description,
      complaintType: data.complaint_type,
      ipfs: data.file_url,
      status: data.remark,
      // statusType: data.status_type,
      statusType: data.selectedOption,
      authorityName: data.reporting_agency,
      priority: data.priority,
      // agency_response: data.remark,
    };

    console.log("fdata", fdata);
    // return await API.post(`/api/complaint/update_complaint/${id}`, data);
    return await axios.put(
      `http://localhost:8080/blockchain/updateToAComplaints/${id}`,
      fdata
    );
  };
}

export default APIRequests;
