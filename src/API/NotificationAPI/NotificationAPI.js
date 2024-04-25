import CustomAPI from "../SmartHomeAPI/CustomAPI";

// const get_all_path = "/get-all-notifications" 
const get_day_path = "/get-all-notifications-by-day"
const get_notifs_num_path = "/get-unread-notifs-amount"

export const GetNotificationsByDay = async (apiInstance, query_day) => {
    const responseNotifs = await apiInstance.get(get_day_path + "?day=" + query_day)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });
    return responseNotifs;
}
export const GetNumberNotifs = async () => {
    
    const responseNotifs = await CustomAPI.get(get_notifs_num_path)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail get number notices!", error);
        return error;
    });
    return responseNotifs;
}

const mark_as_read_path = "/mark-as-read/"

export const MarkNotifasRead = async (n_id) => {
    const response = await CustomAPI.put(mark_as_read_path + n_id)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });
    return response;
}

const mark_all = "/check-all-notifs/"
export const MarkAllNotifasRead = async (query_day) => {
    console.log(mark_all + query_day)
    const response = await CustomAPI.put(mark_all + query_day)
    .then((response) => {
        return response;
    }).catch((error) => {
        console.log("Fail get User infomation!", error);
        return error;
    });
    return response;
}