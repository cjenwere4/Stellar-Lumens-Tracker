document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("save").addEventListener("click", save_options);
});
var priceNotif = 0;
var notifFired = false;
var refreshRate = 0;
function save_options() {
  priceNotif = document.getElementById('pricealert').value;
  refreshRate = document.getElementById('refresh').value;
  chrome.storage.sync.set({
    'userAlerted': notifFired,
    'timeRefresh': refreshRate,
    'priceAlert': priceNotif
  }, function() {
    // Update status to let user know options were saved.
    console.log("price set: " + priceNotif);
    console.log("notif fired: " + notifFired);
    console.log("time refresh: " + refreshRate);
    alert("Settings Saved.")
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
