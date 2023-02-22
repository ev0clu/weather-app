import { format } from 'date-fns';
import github from '../assets/images/github-logo.png';
import clearImg from '../assets/images/01d.png';
import cloudsImg from '../assets/images/03d.png';
import fogImg from '../assets/images/50d.png';
import snowImg from '../assets/images/13d.png';
import rainImg from '../assets/images/09d.png';
import thunderstormImg from '../assets/images/11d.png';

const ui = (() => {
    const getWeatherCode = (weatherGroup) => {
        switch (weatherGroup) {
            case 'Thunderstorm':
                return thunderstormImg;
            case 'Drizzle':
            case 'Rain':
                return rainImg;
            case 'Snow':
                return snowImg;
            case 'Clear':
                return clearImg;
            case 'Clouds':
                return cloudsImg;
            default:
                return fogImg;
        }
    };

    const getWeatherColor = (weatherGroup) => {
        switch (weatherGroup) {
            case 'Thunderstorm':
            case 'Drizzle':
            case 'Rain':
            case 'Clouds':
                return 'clouds';
            case 'Snow':
            case 'Atmosphere':
                return 'snow';
            case 'Clear':
                return 'clear';
            default:
                return '';
        }
    };

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
        const searchButton = document.createElement('button');
        searchButton.id = 'btn-search';

        const searchButtonSpan = document.createElement('span');
        searchButtonSpan.classList.add('material-symbols-outlined');
        searchButtonSpan.textContent = 'search';

        searchButton.appendChild(searchButtonSpan);

        return searchButton;
    };

    const createCurrentWeatherContentLeft = (
        cityName,
        cityID,
        weatherGroup,
        temp,
        weatherDescription
    ) => {
        const contentFieldLeft = document.createElement('div');
        contentFieldLeft.classList.add('current-weather-container-left');

        const cityTitle = document.createElement('h1');
        cityTitle.textContent = `${cityName}, ${cityID}`;

        const weatherIcon = document.createElement('img');

        weatherIcon.src = getWeatherCode(weatherGroup);

        const temperature = document.createElement('p');
        temperature.classList.add('temperature');
        temperature.textContent = `${temp} °C`;

        const weatherDetails = document.createElement('p');
        weatherDetails.textContent = `${weatherDescription}`;

        contentFieldLeft.append(cityTitle, weatherIcon, temperature, weatherDetails);

        return contentFieldLeft;
    };

    const createCurrentWeatherContentRight = (humidity, clouds, pressure, wind) => {
        const contentFieldRight = document.createElement('div');
        contentFieldRight.classList.add('current-weather-container-right');

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

    const createFiveDaysWeatherContent = (date, weatherGroup, weatherDescription, temp) => {
        const contentField = document.createElement('div');
        contentField.classList.add('five-days-content');

        const dateContent = document.createElement('p');
        dateContent.textContent = `${format(new Date(date), 'dd/MM Kaaa')}`;

        const weatherIconDiv = document.createElement('div');
        weatherIconDiv.classList.add('five-days-img-container');
        const weatherIcon = document.createElement('img');
        weatherIconDiv.appendChild(weatherIcon);

        weatherIcon.src = getWeatherCode(weatherGroup);

        const temperature = document.createElement('p');
        temperature.textContent = `${Math.round(temp)} °C`;

        const weatherDetails = document.createElement('p');
        weatherDetails.textContent = `${weatherDescription}`;

        contentField.append(dateContent, weatherIconDiv, temperature, weatherDetails);

        return contentField;
    };

    const createMain = () => {
        const main = document.createElement('main');

        const content = document.createElement('div');
        content.id = 'content';

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');
        searchContainer.append(createSearchInput(), createSearchButton());

        const currentWeatherContainer = document.createElement('div');
        currentWeatherContainer.id = 'current-weather-container';

        const fiveDaysWeatherContainer = document.createElement('div');
        fiveDaysWeatherContainer.id = 'five-days-weather-container';

        content.append(searchContainer, currentWeatherContainer, fiveDaysWeatherContainer);
        main.appendChild(content);

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
        image.src = github;
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
        const content = document.getElementById('content');
        content.textContent = '';
        content.classList.add('error');

        const errorMsg = document.createElement('div');
        errorMsg.id = 'error-msg';
        errorMsg.textContent = error;
        content.append(errorMsg);

        return content;
    };

    const updateWeatherContentCurrendData = (
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
        const fiveDaysWeatherContainer = document.getElementById('five-days-weather-container');

        const content = document.getElementById('content');
        currentWeatherContainer.textContent = '';
        fiveDaysWeatherContainer.textContent = '';

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

        content.className = '';
        content.classList.add(`${getWeatherColor(weatherGroup)}`);

        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
    };

    const updateWeatherContentFiveDaysData = (date, weatherGroup, weatherDescription, temp) => {
        const fiveDaysWeatherContainer = document.getElementById('five-days-weather-container');

        fiveDaysWeatherContainer.append(
            createFiveDaysWeatherContent(date, weatherGroup, weatherDescription, temp)
        );

        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
    };

    const createHTML = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());
    };

    return {
        createHTML,
        updateWeatherContentCurrendData,
        updateWeatherContentFiveDaysData,
        showError
    };
})();

export default ui;
