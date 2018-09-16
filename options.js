document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("save").addEventListener("click", save_options);
});
var priceNotif = 0;
function save_options() {
  priceNotif = document.getElementById('pricealert').value;
  chrome.storage.sync.set({
    'priceAlert': priceNotif
  }, function() {
    // Update status to let user know options were saved.
    console.log("price set: " + priceNotif);
    alert("Settings Saved.")
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
var test = 0;
test = chrome.storage.sync.get('priceAlert', function(data) { // price notification alert.
    test = data.priceAlert;
    if (test < 0 || isNaN(test)) { // ensures that the price inputed is an positive value and a number.
      test = 0;
      console.log("Either negative number or not a number.");
    }
    console.log("User Price Alert: " + test);
});
