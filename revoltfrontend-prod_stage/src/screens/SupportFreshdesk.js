import { useEffect } from "react";
import Loader from "../components/Loader";
import { URL_APIX } from "../constants/cartConstants";
import Axios from "axios";

const SupportFreshdesk = () => {
  const URL_APIX = "https://apix.revoltmotors.com";

  const getRedirectUrl = async (params) => {
    const { data } = await Axios.get(
      `${URL_APIX}/api/v1/sso/jwt/login?${params}`,
    );
    if (data?.redirecturl) {
      window.location.href = data.redirecturl;
    }
  };

  useEffect(() => {
    let params = window.location.href.split("?")[1] ?? "";
    if (localStorage.getItem("userInfo")?.length) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // params+= "&email=" + userInfo.email
      params += "&mobile=" + userInfo.mobile;
      // params+= "&token=" + userInfo.token
      // if(userInfo.name){
      //     params+= "&firstname=" + userInfo.name.split(" ")[0]
      //     params+= "&lastname=" + userInfo.name.split(" ")[1]
      // }
    }
    if (params) {
      getRedirectUrl(params);
    }
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      <Loader />
      <p>Redirecting to Revolt Support Page</p>
    </div>
  );
};

export default SupportFreshdesk;
