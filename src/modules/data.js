const data = (() => {
    const processData = (object) => {
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
            return { success: true, result: weatherData };
        } catch (error) {
            return { success: false, error };
        }
    };

    return { processData, fetchCurrentData };
})();

export default data;
