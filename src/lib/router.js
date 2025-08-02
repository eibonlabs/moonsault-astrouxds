const setPage = (page, route) => {
    const pageElement = document.querySelector('#page');

    // initial page load
    if (pageElement.getAttribute('data-current-route') !== route) {
        moonsault.pageComponents = {};

        // store params from the URL if first page load
        setParamsFromUrl();

        if (pageElement.getAttribute('data-transition') === 'in' && pageElement.getAttribute('data-current-route') !== null) {
            // set the previous route
            moonsault.previousRoute = pageElement.getAttribute('data-current-route');

            // set transition out
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
                window.scrollTo(0, 0);
                document.querySelector('#page').scrollTo(0, 0);
                pageElement.innerHTML = `<${page}></${page}>`;
                pageElement.setAttribute('data-transition', 'in');
                pageElement.setAttribute('data-current-route', route);
            }
        }
        // page is already loaded
    } else {
        for (const component in moonsault.pageComponents) {
            if (moonsault.pageComponents[component].getAttribute('data-on-hash-change') !== null) {
                const updateMethod = moonsault.pageComponents[component].getAttribute('data-on-hash-change');
                moonsault.pageComponents[component][updateMethod]();
            }
        }
    }
};

const buildRoute = (route) => {
    const currentURL = `${window.location.origin}${window.location.pathname}${route}`;

    let paramsArray = [];

    for (const param in moonsault.urlParams.params) {
        paramsArray.push({
            param: param,
            value: moonsault.urlParams.params[param]
        });
    }

    let params = '';

    if (paramsArray.length > 0) {
        params = '?';
    }

    for (let i = 0; i < paramsArray.length; i += 1) {
        if (i === 0) {
            params += `${paramsArray[i].param}=${paramsArray[i].value}`;
        } else {
            params += `&${paramsArray[i].param}=${paramsArray[i].value}`;
        }
    }

    window.location.href = `${currentURL}${params}`;
}

const setParamsFromUrl = () => {
    // get params from url
    const urlParamString = window.location.href.split('?')[1];

    // if params available, parse them and store them in moonsault.urlParams.params
    if (urlParamString !== undefined) {
        const urlParams = urlParamString.split('&');
        for (const urlParam in urlParams) {
            const currentParam = urlParams[urlParam].split('=');
            moonsault.urlParams.params[currentParam[0]] = currentParam[1];
        }
        // no params available. reset moonsault.urlParams.params
    } else {
        moonsault.urlParams.params = {};
    }
};

const setURLParam = (param, value) => {
    moonsault.urlParams.params[param] = value;
};

const deleteURLParam = (param, value) => {
    if (param !== undefined) {
        delete moonsault.urlParams.params[param];
    } else {
        for (const param in moonsault.urlParams.params) {
            delete moonsault.urlParams.params[param];
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
    // set the current route
    moonsault.currentRoute = getRouteFromURL();

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

export { startRouter, getRouteFromURL, buildRoute, setURLParam, deleteURLParam };