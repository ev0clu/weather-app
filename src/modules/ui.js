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

    const createMain = () => {
        const main = document.createElement('main');

        return main;
    };

    const createInput = () => {
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

    const loadUI = () => {
        const body = document.querySelector('body');
        body.append(createHeader(), createMain(), createFooter());
    };

    return { loadUI };
})();

export default ui;
