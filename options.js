//props has three fields
// prop = url
// 0) time the delay was set
// 1) delayed time
// 2) description (time delay clicked)

function getNappedTabs(){
  var container = document.getElementById('ulList');
  console.log(container);
  chrome.storage.local.get(null, function(obj) {
    for (var prop in obj) {
      var text = prop + ' ' + moment(obj[prop][1]).format("M/D/YY HH:mm:ss");
      var li = document.createElement("li")
      li.innerHTML = text;
      container.appendChild(li);
    }
  });
}

document.addEventListener('DOMContentLoaded', getNappedTabs);
// document.getElementById('save').addEventListener('click',
//     getNappedTabs);
