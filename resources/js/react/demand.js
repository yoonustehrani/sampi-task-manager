import React from 'react';
import ReactDom from 'react-dom';
import DemandMessages from "./components/DemandMessages";
const target = 'react-demand-show';

if (document.getElementById(target)) {
    let elem = $(`#${target}`);
    let getMessages = elem.attr('data-messages'),
    apiKey = elem.attr('data-apiKey');
    ReactDom.render(
        <DemandMessages apiKey={apiKey} getMessages={getMessages}/>,
        document.getElementById(target)
    )
}