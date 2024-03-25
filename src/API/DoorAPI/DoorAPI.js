import SmartHomeAPI from "../SmartHomeAPI/SmartHomeAPI"

const get_path = "/door/data/last";
const post_path = "/door/data";

export const DoorGet = async () => {
    const responseInfo = await SmartHomeAPI.get(get_path)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail to get DoorState!", error);
        return error;
    });

    return responseInfo;
}

export const DoorPost = async (data) => {
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
