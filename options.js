//props has three fields
// prop = url
// 0) time the delay was set
// 1) delayed time
// 2) description (time delay clicked)

function getNappedTabs(){
  var container = document.getElementById('ulList');
  console.log(container);
  chrome.storage.local.get(null, function(obj) {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    };

    for (var prop in obj) {
      var text = moment(obj[prop][1]).format("M/D/YY HH:mm:ss");
      var li = document.createElement("li");
      li.innerHTML = '<a>' + prop + '</a>' + '<span>' + text + '</span>';
      li.addEventListener('click', function(){
        tabListRemove(this);
        this.remove();
      });
      container.appendChild(li);
    }
  });

  setTimeout(getNappedTabs, 1000);
}

function tabListRemove(e) {
  chrome.storage.local.remove(e.getElementsByTagName('a')[0].innerHTML);
  getNappedTabs();
}

document.addEventListener('DOMContentLoaded', getNappedTabs);
