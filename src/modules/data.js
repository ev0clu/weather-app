const data = (() => {
    const processCurrentData = (object) => {
        const weather = {
            city: object.name,
            cityID: object.sys.country,
            weatherGroup: object.weather[0].main,
            weatherDescription: object.weather[0].description,
            tempAverage: object.main.temp,
            pressure: object.main.pressure,
            humidity: object.main.humidity,
            wind: object.wind.speed,
            clouds: object.clouds.all
        };

        return weather;
    };

    const processFiveDaysData = (object) => {
        const weather = [];

        for (let i = 0; i < object.list.length; i++) {
            const day = {
                date: object.list[i].dt_txt,
                weatherGroup: object.list[i].weather[0].main,
                weatherDescription: object.list[i].weather[0].description,
                tempAverage: object.list[i].main.temp
            };
            weather.push(day);
        }

        return weather;
    };

    const fetchCurrentData = async (city) => {
        const apiID = '293612f25c6a4c7d2bdf1d11601479e4';
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`,
                { mode: 'cors' }
            );
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const weatherData = await response.json();

            return { successCurrentData: true, resultCurrentData: weatherData };
        } catch (errorCurrentData) {
            return { successCurrentData: false, errorCurrentData };
        }
    };

    const fetchFiveDaysData = async (city) => {
        const apiID = '293612f25c6a4c7d2bdf1d11601479e4';
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiID}`,
                { mode: 'cors' }
            );
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const weatherData = await response.json();

            return { successFiveDaysData: true, resultFiveDaysData: weatherData };
        } catch (errorFiveDaysData) {
            return { successFiveDaysData: false, errorFiveDaysData };
        }
    };

    return { processCurrentData, processFiveDaysData, fetchCurrentData, fetchFiveDaysData };
})();

export default data;
