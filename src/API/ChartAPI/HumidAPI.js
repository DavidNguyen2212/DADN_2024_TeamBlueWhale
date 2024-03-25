import SmartHomeAPI from "../SmartHomeAPI/SmartHomeAPI"

const get_path = "/humidity/data/chart";
const queryString = "?start_time=2024-03-19T00:00:00Z"

export const HumidChartGet = async () => {
    const responseInfo = await SmartHomeAPI.get(get_path + queryString)
    .then((response) => {
        // console.log(JSON.parse(response?.data.value))
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });

    return responseInfo;
}