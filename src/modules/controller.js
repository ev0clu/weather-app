import data from './data';
import ui from './ui';

const controller = (() => {
    const getWeatherStatus = (weatherGroup) => {
        switch (weatherGroup) {
            case 'Thunderstorm':
                return '11d';
            case 'Drizzle':
            case 'Rain':
                return '09d';
            case 'Snow':
                return '13d';
            case 'Clear':
                return '01d';
            case 'Clouds':
                return '03d';
            default:
                return '50d';
        }
    };

    const getData = async (city) => {
        const { success, result, error } = await data.fetchCurrentData(city);
        let fetchResult = '';
        let isError = false;

        if (success) {
            const fetchedData = result;
            const weatherData = data.processData(fetchedData);
            fetchResult = weatherData;
        } else {
            isError = true;
            fetchResult = error;
        }

        return { fetchResult, isError };
    };

    const renderPage = async () => {
        // Create HTML with default location informations
        ui.createHTML();
        const { fetchResult, isError } = await getData('Veszprem');
        if (!isError) {
            const weatherImg = getWeatherStatus(fetchResult.weatherGroup);
            ui.updateWeatherContent(
                fetchResult.city,
                fetchResult.cityID,
                weatherImg,
                fetchResult.tempAverage,
                fetchResult.weatherDescription,
                fetchResult.humidity,
                fetchResult.clouds,
                fetchResult.pressure,
                fetchResult.wind
            );
        } else {
            ui.showError(fetchResult);
        }
    };

    const searchEventListener = () => {
        const searchButton = document.getElementById('btn-search');
        const searchInput = document.getElementById('search-input');

        searchButton.addEventListener('click', async () => {
            const { fetchResult, isError } = await getData(searchInput.value);
            if (!isError) {
                const weatherImg = getWeatherStatus(fetchResult.weatherGroup);
                ui.updateWeatherContent(
                    fetchResult.city,
                    fetchResult.cityID,
                    weatherImg,
                    fetchResult.tempAverage,
                    fetchResult.weatherDescription,
                    fetchResult.humidity,
                    fetchResult.clouds,
                    fetchResult.pressure,
                    fetchResult.wind
                );
            } else {
                ui.showError(fetchResult);
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    };

    return { renderPage, searchEventListener };
})();

export default controller;
