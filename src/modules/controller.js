import data from './data';

const controller = (() => {
    const getData = async (city) => {
        const { success, result, error } = await data.fetchCurrentData(city);

        if (success) {
            const fetchedData = result;
            const weatherData = data.processData(fetchedData);
            console.log(weatherData);
        } else {
            console.log(error);
        }
    };

    return { getData };
})();

export default controller;
