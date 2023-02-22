import data from './data';
import ui from './ui';

const controller = (() => {
    const getCurrentData = async (city) => {
        const { successCurrentData, resultCurrentData, errorCurrentData } =
            await data.fetchCurrentData(city);
        let fetchCurrentDataResult = '';
        let isCurrendDataError = false;

        if (successCurrentData) {
            const weatherData = data.processCurrentData(resultCurrentData);
            fetchCurrentDataResult = weatherData;
        } else {
            isCurrendDataError = true;
            fetchCurrentDataResult = errorCurrentData;
        }

        return { fetchCurrentDataResult, isCurrendDataError };
    };

    const getFiveDaysData = async (city) => {
        const { successFiveDaysData, resultFiveDaysData, errorFiveDaysData } =
            await data.fetchFiveDaysData(city);
        let fetchFiveDaysDataResult = '';
        let isFiveDaysDataError = false;

        if (successFiveDaysData) {
            const weatherData = data.processFiveDaysData(resultFiveDaysData);
            fetchFiveDaysDataResult = weatherData;
        } else {
            isFiveDaysDataError = true;
            fetchFiveDaysDataResult = errorFiveDaysData;
        }

        return { fetchFiveDaysDataResult, isFiveDaysDataError };
    };

    const renderPage = async () => {
        // Create HTML with default location informations
        ui.createHTML();
        const { fetchCurrentDataResult, isCurrendDataError } = await getCurrentData('Budapest');
        const { fetchFiveDaysDataResult, isFiveDaysDataError } = await getFiveDaysData('Budapest');

        if (!isCurrendDataError && !isFiveDaysDataError) {
            ui.updateWeatherContentCurrendData(
                fetchCurrentDataResult.city,
                fetchCurrentDataResult.cityID,
                fetchCurrentDataResult.weatherGroup,
                fetchCurrentDataResult.tempAverage,
                fetchCurrentDataResult.weatherDescription,
                fetchCurrentDataResult.humidity,
                fetchCurrentDataResult.clouds,
                fetchCurrentDataResult.pressure,
                fetchCurrentDataResult.wind
            );

            for (let i = 0; i < fetchFiveDaysDataResult.length; i++) {
                ui.updateWeatherContentFiveDaysData(
                    fetchFiveDaysDataResult[i].date,
                    fetchFiveDaysDataResult[i].weatherGroup,
                    fetchFiveDaysDataResult[i].weatherDescription,
                    fetchFiveDaysDataResult[i].tempAverage
                );
            }
        } else {
            ui.showError(fetchCurrentDataResult);
        }
    };

    const searchEventListener = () => {
        const searchButton = document.getElementById('btn-search');
        const searchInput = document.getElementById('search-input');

        searchButton.addEventListener('click', async () => {
            const { fetchCurrentDataResult, isCurrendDataError } = await getCurrentData(
                searchInput.value
            );
            const { fetchFiveDaysDataResult, isFiveDaysDataError } = await getFiveDaysData(
                searchInput.value
            );

            if (!isCurrendDataError && !isFiveDaysDataError) {
                ui.updateWeatherContentCurrendData(
                    fetchCurrentDataResult.city,
                    fetchCurrentDataResult.cityID,
                    fetchCurrentDataResult.weatherGroup,
                    fetchCurrentDataResult.tempAverage,
                    fetchCurrentDataResult.weatherDescription,
                    fetchCurrentDataResult.humidity,
                    fetchCurrentDataResult.clouds,
                    fetchCurrentDataResult.pressure,
                    fetchCurrentDataResult.wind
                );

                for (let i = 0; i < fetchFiveDaysDataResult.length; i++) {
                    ui.updateWeatherContentFiveDaysData(
                        fetchFiveDaysDataResult[i].date,
                        fetchFiveDaysDataResult[i].weatherGroup,
                        fetchFiveDaysDataResult[i].weatherDescription,
                        fetchFiveDaysDataResult[i].tempAverage
                    );
                }
            } else {
                ui.showError(fetchCurrentDataResult);
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
