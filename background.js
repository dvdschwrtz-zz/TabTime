window.setInterval(function() {

  function getDates(obj) {
    var result = [];
    for (props in obj) {
      console.log(obj[props]);
      if (moment(obj[props]) <= moment()) {
        result.push(props);
      }
    }
    return result;
  }

  chrome.storage.local.get(null, function(obj) {
    getDates(obj).forEach(function(val) {
      chrome.tabs.create({ url: val });
      chrome.storage.local.remove(val);
    });
  });

}, 1000);
