document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('15sec').addEventListener('click', function() { handler(2, '15 seconds') });
  document.getElementById('30sec').addEventListener('click', function() { handler(30, '30 seconds') });
  document.getElementById('1min').addEventListener('click', function() { handler(60, '1 minute') });
  document.getElementById('2min').addEventListener('click', function() { handler(120, '2 minutes') });
  document.getElementById('btnSettings').addEventListener('click', settingsHandle);
});

function handler(timeDelay, desc) {
  chrome.tabs.query({currentWindow: true, active: true},
    function(tabs) {
      // save the url and correct timestamp
      var tmpObj = {};
      tmpObj[tabs[0].url] = [moment().toISOString(),
        moment().add(timeDelay, 's').toISOString(),
        desc
      ];

      chrome.tabs.remove(tabs[0].id, function(){})

      chrome.storage.local.set(tmpObj, function() {
        console.log(tmpObj);
      });
    });
}

function settingsHandle() {
  chrome.runtime.openOptionsPage();
}
