//To display the begining price of the extension,
// fixes hanging extension price
var userPriceNotif = 0;
var once = true;
var firstrequest = new XMLHttpRequest();
var firstprice = 0;
var alerted; // boolean to check to see if the price alert has fired
alerted = chrome.storage.sync.get('userAlerted', function(data) {
          alerted = data.userAlerted;
        });
var refresh = chrome.storage.sync.get('timeRefresh', function(data) {
          refresh = data.timeRefresh;
        }); // get user refresh rate
if (refresh < 0 || isNaN(refresh)) { // ensures that the time inputed is an positive value and a number.
          refresh = 10;
          console.log("Either negative number or not a number.");
} else {
  refresh = refresh * 1000; // for milliseconds
}
firstrequest.open('GET', 'https://api.coinmarketcap.com/v2/ticker/512/', true);
firstrequest.onload = function () {
  // Begin accessing JSON data here
  var firstcoindata = JSON.parse(this.response);
  if (firstrequest.status >= 200 && firstrequest.status < 400) { // check to see if website is running
      firstprice = firstcoindata.data.quotes["USD"].price; // get price
      firstprice = Math.round(1000*firstprice)/1000; // round price to thousandths (for badge)
      var firstPriceString = firstprice + ""; // we need to convert the price to a string, in order for the extension to display text.
      chrome.browserAction.setBadgeBackgroundColor({ color: [92, 92, 92, 92] });
      chrome.browserAction.setBadgeText({text: firstPriceString});
  } else {
    console.log('Bummer.');
  }
}
firstrequest.send();

var myVar = setInterval(getPrice, refresh); // refresh every 10 secs for most accurate price
function getPrice() {
  var request = new XMLHttpRequest();
  var price = 0;
  request.open('GET', 'https://api.coinmarketcap.com/v2/ticker/512/', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var coindata = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) { // check to see if website is running
        price = coindata.data.quotes["USD"].price; // get price
        price = Math.round(1000*price)/1000; // round price to thousandths (for badge)
          // console.log("price: " + price);
        var priceString = price + ""; // we need to convert the price to a string, in order for the extension to display text.
        chrome.browserAction.setBadgeBackgroundColor({ color: [92, 92, 92, 92] });
        chrome.browserAction.setBadgeText({text: priceString});
        userPriceNotif = chrome.storage.sync.get('priceAlert', function(data) { // price notification alert.
          userPriceNotif = data.priceAlert;
          if (userPriceNotif < 0 || isNaN(userPriceNotif)) { // ensures that the price inputed is an positive value and a number.
            userPriceNotif = 0;
            console.log("Either negative number or not a number.");
          }

          if (userPriceNotif == price && !alerted) {
            alerted = true; // alert to set alerted to true, so we won't have reoccuring notifs
            var options = {
              type: "basic",
              title: "XLM Price Alert",
              message: "XLM has reached $" + userPriceNotif + ". HODL!",
              iconUrl: "moon.gif"
            };
            chrome.notifications.create(options, callback);
            function callback() {
              console.log('Done.');
            }
          }
      });
      if (alerted && once) { // if fired
        once = false; // excute only once
        chrome.storage.sync.set({ 'userAlerted' : alerted }, function() {
          console.log("alert reset"); // reset alert for next input
          console.log("alert: " + alerted);
        });
      }
    } else {
      console.log('Bummer.');
    }
  }
  request.send();
}
