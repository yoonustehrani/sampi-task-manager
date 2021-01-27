window.persianDate = require('persian-date');
window.persianDatepicker = require('persian-datepicker/dist/js/persian-datepicker');

const due_to_input = $("input[name='due_to']");

$('#example').persianDatepicker({
    format: 'dddd D MMMM YYYY، HH:mm',
    viewMode: 'day',
    onSelect: unix => {
        due_to_input.val(unix / 1000);
    },
    toolbox:{
        calendarSwitch:{
            enabled: true,
            format: 'YYYY'
        }
    },
    calendar:{
        gregorian: {
            locale: 'en'
        },
        persian: {
            locale: 'fa'
        }
    },
    minDate: new persianDate().valueOf(),
    timePicker: {
        enabled: true,
        second: {
            enabled: false
        },
        meridiem: {
            enabled: true
        }
    }
});