import SmartHomeAPI from "../SmartHomeAPI/SmartHomeAPI"

const get_path = "/livingroom/data/last";
const post_path = "/livingroom/data";

export const LivingroomGet = async () => {
    const responseInfo = await SmartHomeAPI.get(get_path)
    .then((response) => {
        // console.log(JSON.parse(response?.data.value))
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });

    return responseInfo;
}

export const LivingroomPost = async (data) => {
    const responseUserInfo = await SmartHomeAPI.post(post_path, data)
    .then((response) => {
        // console.log(response)
        return response;
    }).catch((error) => {
        console.log("Fail creat new state infomation!", error);
        return error;
    });

    return responseUserInfo;
}