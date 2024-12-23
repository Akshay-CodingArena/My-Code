import Axios from "axios";
import { encryptData, decryptData } from "./crypto";
import Swal from "sweetalert2";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 180000,
});

// axios.interceptors.request.use(
//   (config) => {
//     if(config.data){
//       config.headers= {
//         "x-encryption":'true',
//       }
//       config.headers["Content-Type"]="text/plain"
//         try{
//         console.log("payload",config.data)
//         let data = encryptData(JSON.stringify(config.data))
//         console.log("encrypted data", data)
//        // console.log("decrypted data", decryptData(data))
//         config.data = data
//         }catch(e){
//             console.log("Error",e)
//         }
//         return config;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     console.log("this response", response)
//     let data = typeof response.data == 'string'?decryptData(response.data):response.data
//     let decryptedResponse =  {...response, data:typeof data=="string"?JSON.parse(data):data};
//     console.log("Decrypted Res",decryptedResponse)
//     return decryptedResponse
//   },
//   (error) => {
//     console.log(error)
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized, logging out...');
//     }
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  (response) => {
    // console.log("this response", response);
    // let data =
    //   typeof response.data == "string"
    //     ? decryptData(response.data)
    //     : response.data;
    // let decryptedResponse = {
    //   ...response,
    //   data: typeof data == "string" ? JSON.parse(data) : data,
    // };
    // console.log("Decrypted Res", decryptedResponse);
    return response;
  },
  (error) => {
    console.log(error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Something went wrong",
    //   showConfirmButton: false,

    //   imageHeight: 30,
    //   imageWidth: 30,
    //   timer: 2500,
    //   customClass: {
    //     container: "swal-custom",
    //   },
    // });
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, logging out...");
    }
    return error;
  },
);

export { axios };
