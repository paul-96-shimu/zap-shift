import axios from "axios";

const axiosInstance =axios.create({
      baseURL: `http://localhost:5000`
})

const UseAxiosAuth = () => {
    return axiosInstance
};

export default UseAxiosAuth;