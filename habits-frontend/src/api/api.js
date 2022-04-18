import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

// API Class  that contains helper methods with AJAX calls
////////////////////////////////////////////////////////////////

class GoodHabitsApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // token is passed in the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GoodHabitsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  ///////////////////////////////////////////////////////////////////
  
  // Get user details by username
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

// for debugging purposes, token is put ("testuser" / "password" on class)
GoodHabitsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwia" + 
    "XNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0OTk4MTM4OH0.Q-_tKzwP2dW1O0-wFJ3Az6CqdW_zUPax38jp-T2m5fw"