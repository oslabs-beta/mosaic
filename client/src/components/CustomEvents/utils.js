const axios = require('axios');

function trackCustomEvent(customEventName, customEventDate, customEventPayload) {
  console.log('called trackCustomEvent');
  axios
    .post('http://localhost:8080/customEvent/create', {
      customEventName,
      customEventDate,
      customEventPayload,
    })
    .then(function () {
      console.log('successfully posted event');
    })
    .catch((error) => {
      console.log('utils customEvents error: ', error);
    });
}

export default trackCustomEvent;
