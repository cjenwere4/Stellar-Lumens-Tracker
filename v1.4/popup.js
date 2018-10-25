var test = 0;
var notifFired = false;
test = chrome.storage.sync.get('priceAlert', function(data) {
    test = data.priceAlert;
    console.log("User Price Alert " + test);
    userPriceNotif = chrome.storage.sync.get('priceAlert', function(data) {
    userPriceNotif = data.priceAlert;
    if (userPriceNotif < 0 || isNaN(userPriceNotif)) { // ensures that the price inputed is an positive value and a number.
      userPriceNotif = 0;
      console.log("Either negative number or not a number.");
    }
    if (userPriceNotif == 80) {
      var options = {
        type: "basic",
        title: "XLM Price Alert",
        message: "XLM has reached $" + userPriceNotif + "HODL!",
        iconUrl: "moon.gif"
      };
      chrome.notifications.create(options, callback);
      function callback() {
        console.log('Done.');
      }
    }
});

});
