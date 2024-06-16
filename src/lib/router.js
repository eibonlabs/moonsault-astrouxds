const setPage = (page, route) => {
    const pageElement = document.querySelector('#page');
    moonsault.pageComponents = {};

    if (pageElement.getAttribute('data-transition') === 'in' && pageElement.getAttribute('data-current-route') !== null) {
        pageElement.setAttribute('data-transition', 'out');
    } else {
        // first view of site
        pageElement.innerHTML = `<${page}></${page}>`;
        pageElement.setAttribute('data-transition', 'in');
        pageElement.setAttribute('data-current-route', route);
    }

    // transition out animation has ended.
    pageElement.onanimationend = () => {
        if (pageElement.getAttribute('data-transition') !== 'in') {
            pageElement.innerHTML = `<${page}></${page}>`;
            pageElement.setAttribute('data-transition', 'in');
            pageElement.setAttribute('data-current-route', route);
        }
    }
};

const getRouteFromURL = () => {
    const url = new URL(window.location.href);

    if (url.hash.indexOf('#/') > -1) {
        return url.hash.split('?')[0];
    } else {
        return '';
    }
};

const resolveRoute = () => {
    let page = moonsault.routes[getRouteFromURL()];

    if (getRouteFromURL() !== '') {
        if (!page) {
            page = moonsault.routes['#/error'];
        }

        setPage(page, getRouteFromURL());
    }
};

const startRouter = () => {
    window.onhashchange = () => {
        resolveRoute();
    };

    if (getRouteFromURL() !== '') {
        resolveRoute();
    } else {
        window.location.hash = document.querySelector('#page').getAttribute('data-defaultPage');
    }
}

export { startRouter, getRouteFromURL };