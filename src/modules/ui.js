import { format } from 'date-fns';

const ui = (() => {
    const createHeader = () => {
        const header = document.createElement('header');

        const headerTitle = document.createElement('h1');
        headerTitle.textContent = 'Weather App';

        const headerTime = document.createElement('p');
        headerTime.textContent = format(new Date(), 'dd LLLL, iiii');
        header.append(headerTitle, headerTime);

        return header;
    };

    const createSearchInput = () => {
        const input = document.createElement('input');
        input.classList.add('input');
        input.id = 'search-input';
        input.type = 'text';
        input.placeholder = 'City name';

        return input;
    };

    const createSearchButton = () => {
        const addButton = document.createElement('button');
        addButton.id = 'btn-search';
        addButton.textContent = 'Search';

        return addButton;
    };

    const createCurrentWeatherContentLeft = (
        cityName,
        cityID,
        weatherImg,
        temp,
        weatherDescription
    ) => {
        const contentFieldLeft = document.createElement('div');

        const cityTitle = document.createElement('h1');
        cityTitle.textContent = `${cityName}, ${cityID}`;

        const weatherIcon = document.createElement('img');

        weatherIcon.src = `../src/assets/images/${weatherImg}.png`;

        const temperature = document.createElement('p');
        temperature.textContent = `${temp} °C`;

        const weatherDetails = document.createElement('p');
        weatherDetails.textContent = `${weatherDescription}`;

        contentFieldLeft.append(cityTitle, weatherIcon, temperature, weatherDetails);

        return contentFieldLeft;
    };

    const createCurrentWeatherContentRight = (humidity, clouds, pressure, wind) => {
        const contentFieldRight = document.createElement('div');

        const humidityContent = document.createElement('p');
        humidityContent.textContent = `Humidity: ${humidity} %`;

        const cloudContent = document.createElement('p');
        cloudContent.textContent = `Clouds: ${clouds} %`;

        const pressureContent = document.createElement('p');
        pressureContent.textContent = `Pressure: ${pressure} hPa`;

        const winContent = document.createElement('p');
        const calcWind = Math.round((Number(wind) / 1000 / (1 / 3600)) * 100) / 100;
        winContent.textContent = `Wind: ${calcWind} km/h`;

        contentFieldRight.append(humidityContent, cloudContent, pressureContent, winContent);

        return contentFieldRight;
    };

    const createMain = () => {
        const main = document.createElement('main');

        const searchContainer = document.createElement('div');
        searchContainer.append(createSearchInput(), createSearchButton());

        const currentWeatherContainer = document.createElement('div');
        currentWeatherContainer.id = 'current-weather-container';

        main.append(searchContainer, currentWeatherContainer);

        return main;
    };

    const createFooterText = () => {
        const paragraph = document.createElement('p');
        const currentDate = new Date().getFullYear();
        paragraph.textContent = `Copyright © Laszlo Kis ${currentDate}`;

        return paragraph;
    };

    const createFooterRefLink = () => {
        const link = document.createElement('a');
        link.classList.add('reflink');
        link.href = 'https://github.com/ev0clu';
        link.target = '_blank';

        const image = document.createElement('img');
        image.classList.add('github-img');
        image.src = '../src/assets/images/github-logo.png';
        image.alt = 'Github logo';

        link.appendChild(image);

        return link;
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.append(createFooterText(), createFooterRefLink());

        return footer;
    };
    const showError = (error) => {
        const currentWeatherContainer = document.getElementById('current-weather-container');
        currentWeatherContainer.textContent = '';

        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-msg');
        errorMsg.textContent = error;
        currentWeatherContainer.append(errorMsg);

        return currentWeatherContainer;
    };

    const updateWeatherContent = (
        cityName,
        cityID,
        weatherGroup,
        temp,
        weatherDescription,
        humidity,
        clouds,
        pressure,
        wind
    ) => {
        const currentWeatherContainer = document.getElementById('current-weather-container');
        currentWeatherContainer.textContent = '';

        currentWeatherContainer.append(
            createCurrentWeatherContentLeft(
                cityName,
                cityID,
                weatherGroup,
                temp,
                weatherDescription
            ),
            createCurrentWeatherContentRight(humidity, clouds, pressure, wind)
        );
    };

    const createHTML = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());
    };

    return { createHTML, updateWeatherContent, showError };
})();

export default ui;
