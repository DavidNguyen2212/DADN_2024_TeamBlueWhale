import BackendAPI from "./BackendAPI";

const path_notice = "/generate-notifications";

export const getNotice = async (params) => {
  const res = await BackendAPI.get(path_notice, {
    params: params,
  })
    .then((response) => {
      //console.log("Response from api User infomation ", response);
      //console.log(response);
      return response;
    })
    .catch((error) => {
      //console.log("Fail get User infomation ", error);
      return error;
    });

  return res;
};

export const confirmCheckNotice = async () => {
  const res = await BackendAPI.put(path_notice)
    .then((response) => {
      //console.log("Response from api User infomation ", response);
      //console.log(response);
      return response;
    })
    .catch((error) => {
      //console.log("Fail get User infomation ", error);
      return error;
    });

  return res;
};
