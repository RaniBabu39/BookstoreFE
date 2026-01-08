import axios from "axios";

const commonApi = async(method, url, reqbody, reqHeader) => {

    let configObj = {
        method: method,
        url: url,
        data: reqbody,
        //axios automatically provides / json header , but if there is any change we ned o provide it ,also token  passed ia heder
        headers:reqHeader
    };

    return await axios(configObj)
        .then((res) => res)
        .catch((err) => err);
};

export default commonApi;