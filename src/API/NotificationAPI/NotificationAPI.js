import CustomAPI from "../SmartHomeAPI/CustomAPI";

const get_all_path = "/get-all-notifications"
const get_day_path = "/get-all-notifications-by-day"

// export const GetAllNotifications = async () => {
//     const responseNotifs = await AssistantAPI.get(get_all_path)
//     .then((response) => {
//         return response;
//     }).catch((error) => {
//         console.log("Fail get User infomation!", error);
//         return error;
//     });
//     return responseNotifs;
// }

export const GetNotificationsByDay = async (query_day) => {
    const responseNotifs = await CustomAPI.get(get_day_path + "?day=" + query_day)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });
    return responseNotifs;
}