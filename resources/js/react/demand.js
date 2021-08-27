import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import { sweetSuccess } from '../helpers';
import DemandMessages from "./components/DemandMessages";
const target = 'react-demand-show';

if (document.getElementById(target)) {
    let elem = $(`#${target}`);
    let getMessages = elem.attr('data-messages'),
    newMessage = elem.attr('data-message'),
    getDemand = elem.attr('data-show'),
    updateDemand = elem.attr('data-update'),
    toggleDemand = elem.attr('data-toggle'),
    apiKey = elem.attr('data-apiKey');
    ReactDom.render(
        <DemandMessages apiKey={apiKey} getDemand={getDemand} updateDemand={updateDemand} toggleDemand={toggleDemand} newMessage={newMessage} getMessages={getMessages}/>,
        document.getElementById(target)
    )
}

if (document.getElementById('reminder-button')) {
    $('#reminder-button').on('click', function() {
        let link = $(this).attr('data-remind');
        axios.post(link).then(res => {
            if (res.data.okay) {
                sweetSuccess("انجام شد")
            }
        })
    })
}