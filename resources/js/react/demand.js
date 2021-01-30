import React from 'react';
import ReactDom from 'react-dom';
import DemandMessages from "./components/DemandMessages";
const target = 'react-demand-show';

if (document.getElementById(target)) {
    let elem = $(`#${target}`);
    let getMessages = elem.attr('data-messages'),
    newMessage = elem.attr('data-message'),
    apiKey = elem.attr('data-apiKey');
    ReactDom.render(
        <DemandMessages apiKey={apiKey} newMessage={newMessage} getMessages={getMessages}/>,
        document.getElementById(target)
    )
}