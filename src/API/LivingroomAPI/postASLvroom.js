import AssistantAPI from "../SmartHomeAPI/assistant";

const post_path = "/modify-livingroom-states"

export const PostASLvroom = async (data) => {
    const responseUserInfo = await AssistantAPI.post(post_path, data)
    .then((response) => {
        // console.log(response)
        return response;
    }).catch((error) => {
        console.log("Fail creat new state infomation!", error);
        return error;
    });

    return responseUserInfo;
}