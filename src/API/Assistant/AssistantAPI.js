import CustomAPI from "../SmartHomeAPI/CustomAPI";

const voice_path = '/voice'
export const VoiceProcessing = async (data) => {
    const response = await CustomAPI.post(voice_path, data)
    .then((response) => {
        // console.log(response)
        return response;
    }).catch((error) => {
        console.log("Fail creat new state infomation!", error);
        return error;
    });

    return response;
}
