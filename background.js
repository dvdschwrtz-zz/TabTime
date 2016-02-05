window.setInterval(function() {

  //props has three fields
  // 0 time the delay was set
  // 1 delayed time
  // 2 description (time delay clicked)

  //output array has the following data
  // 0 url
  // 1 time delay was set
  // 2 description (time delay clicked)

  function getDates(obj) {
    var result = [];
    for (var props in obj) {
      //console.log(obj[props]);
      if (moment(obj[props][1]) <= moment()) {
        result.push([props, obj[props][0], obj[props][2]]);
      }
    }
    return result;
  }

  chrome.storage.local.get(null, function(obj) {
    getDates(obj).forEach(function(val) {
      chrome.tabs.create({ url: val[0] });
      chrome.storage.local.remove(val[0]);
      genMessage(val[0], val[2], moment().toISOString(), val[1]);
    });
  });

}, 1000);

function genMessage(url, desc, curTime, delTime) {
  var message = url + "\n" + "From " + desc + ' ago';

  var opt = {
  type: "basic",
  title: "Tab Time: We've brought back a tab!",
  message: message,
  iconUrl: "clock-128.png"
  }

  chrome.notifications.create(opt);
}
