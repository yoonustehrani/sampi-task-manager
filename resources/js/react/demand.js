import React from 'react';
import ReactDom from 'react-dom';
import DemandMessages from "./components/DemandMessages";
const target = 'react-demand-show';

if (document.getElementById(target)) {
    let elem = $(`#${target}`);
    let getMessages = elem.attr('data-messages'),
    newMessage = elem.attr('data-message'),
    updateDemand = elem.attr('data-update'),
    apiKey = elem.attr('data-apiKey');
    ReactDom.render(
        <DemandMessages apiKey={apiKey} updateDemand={updateDemand} newMessage={newMessage} getMessages={getMessages}/>,
        document.getElementById(target)
    )
}