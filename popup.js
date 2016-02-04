document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('checkPage');
    link.addEventListener('click', function() {

      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs) {
          console.log(tabs[0].url);
        }
      );
    });
});
