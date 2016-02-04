document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('15sec').addEventListener('click', function() { handler(15) });
  document.getElementById('30sec').addEventListener('click', function() { handler(30) });
  document.getElementById('1min').addEventListener('click', function() { handler(60) });
  document.getElementById('2min').addEventListener('click', function() { handler(120) });
});

function handler(timeDelay) {
  chrome.tabs.query({currentWindow: true, active: true},
    function(tabs) {
      // save the url and correct timestamp
      var tmpObj = {};
      tmpObj[tabs[0].url] = moment().add(timeDelay, 's').toString();

      chrome.tabs.remove(tabs[0].id, function(){})

      chrome.storage.local.set(tmpObj, function() {
        console.log(tmpObj);
      });
    });
}
