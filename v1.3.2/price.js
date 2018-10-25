//To display the begining price of the extension,
// fixes hanging extension price
var userPriceNotif = 0;
var firstrequest = new XMLHttpRequest();
var firstprice = 0;
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

// getPrice() and myVar will refresh the extension
var myVar = setInterval(getPrice, 10000); // refresh every 10 secs for most accurate price
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
        var priceString = price + ""; // we need to convert the price to a string, in order for the extension to display text.
        chrome.browserAction.setBadgeBackgroundColor({ color: [92, 92, 92, 92] });
        chrome.browserAction.setBadgeText({text: priceString});
        userPriceNotif = chrome.storage.sync.get('priceAlert', function(data) { // price notification alert.
          userPriceNotif = data.priceAlert;
          if (userPriceNotif < 0 || isNaN(userPriceNotif)) { // ensures that the price inputed is an positive value and a number.
            userPriceNotif = 0;
            console.log("Either negative number or not a number.");
          }
          if (userPriceNotif == price) {
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
    } else {
      console.log('Bummer.');
    }
  }
  request.send();
}
