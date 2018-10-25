// Hourly price updates for the 1h, 24h and current price.
var myVar = setInterval(getPriceNotification1H, 3600000); // refresh every 1 hour for most accurate price
function getPriceNotification1H() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.coinmarketcap.com/v2/ticker/512/', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var priceNotif = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) { // check to see if website is running
        var pricePercentage1H = priceNotif.data.quotes["USD"].percent_change_1h; // data for the 1 hour
        var pricePercentage24H = priceNotif.data.quotes["USD"].percent_change_24h; // data for the 24 hour
        var price = priceNotif.data.quotes["USD"].price;
        var options = {
          type: "basic",
          title: "Hourly XLM Price Update",
          message: "XLM has moved " + pricePercentage1H + "% in the past hour and " + pricePercentage24H + "% in the last 24 hours. Current Price: $"
          + price,
          iconUrl: "moon.gif"
        };
        chrome.notifications.create(options, callback);
        function callback() {
          console.log('Done.');
        }
    } else {
      console.log('Bummer.');
    }
  }
  request.send();
}
