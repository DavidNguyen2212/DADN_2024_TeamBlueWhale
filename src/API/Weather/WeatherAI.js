import CustomAPI from "../SmartHomeAPI/CustomAPI";

const weather_path = '/weather_predict'
export const WeatherPredictor = async (temp, humi) => {
    const response = await CustomAPI.get(weather_path, {params: {'temp': temp, 'humi': humi}})
    .then((response) => {
        // console.log(response)
        return response;
    }).catch((error) => {
        console.log("Fail to predict weather!", error);
        return error;
    });

    return response;
}
