//onData received function to make the query and store the results.
function onDataReceived (response){
    console.log("done")
    console.log(response);

    //creating an array to store the response
    var stocksData = {
    };

    stocksData.Name = response.query.results.quote.Name;
    stocksData.symbol = (response.query.results.quote.symbol).toUpperCase();
    stocksData.currentPrice = '$' + (response.query.results.quote.LastTradePriceOnly * 1).toLocaleString();
    stocksData.change = response.query.results.quote.Change;
    stocksData.changePercent = (response.query.results.quote.ChangeinPercent);
    stocksData.time = response.query.results.quote.LastTradeTime;
    stocksData.marketCap = response.query.results.quote.MarketCapitalization;
    stocksData.previousClose = '$' + (response.query.results.quote.PreviousClose * 1).toLocaleString();
    stocksData.openPrice = '$' + (response.query.results.quote.Open * 1).toLocaleString();
    stocksData.daysLow = '$' + (response.query.results.quote.DaysLow * 1).toLocaleString();
    stocksData.daysHigh = '$' + (response.query.results.quote.DaysHigh * 1).toLocaleString();
    stocksData.yearsLow = '$' + (response.query.results.quote.YearLow * 1).toLocaleString();
    stocksData.yearsHigh = '$' + (response.query.results.quote.YearHigh * 1).toLocaleString();
    stocksData.todayVolume = (response.query.results.quote.Volume * 1).toLocaleString();
    stocksData.threeMoAvg = (response.query.results.quote.AverageDailyVolume * 1).toLocaleString();
    stocksData.oneYearTarget = '$' + (response.query.results.quote.OneyrTargetPrice * 1).toLocaleString();
    stocksData.dividendYield = (response.query.results.quote.DividendYield * 1) + '%';
    stocksData.shortRatio = response.query.results.quote.ShortRatio;
    stocksData.isStockUp = Number(stocksData.change) > 0

    console.log(stocksData)

    //Compiling Handlebars

    // source is a string representation of the HTML template
    var source = document.getElementById("stocks-template").innerHTML;

    // HBS compiles `source` & returns a fxn, which we store in the `template` variable
    var template = Handlebars.compile(source);

    // We pass the obj `stocksData` to this fxn, which we store in the `compliedHtml` variable
    // the function returns computed HTML to us
    var compliedHtml = template(stocksData);

    // we set the computed HTML as the innerHTML of the stocksInfo
    var stocksInfo = document.getElementById("stocks-info");
    stocksInfo.innerHTML = compliedHtml;
}

//defining global variables again
var userInput = document.getElementById("stock-ticker");
var stocksInfo = document.getElementById("stocks-info");
var stringQuery = "select * from yahoo.finance.quotes where symbol IN "
var queryToMake = stringQuery + "(%22" + userInput + "%22)";
var ending = "&format=json&env=http://datatables.org/alltables.env"
var query = "http://query.yahooapis.com/v1/public/yql?q=" + queryToMake + ending;

function searchStock() {
    var userInput = document.getElementById("stock-ticker").value;

    // pre-check
    if (!userInput) {
        return
    }

    // post-check
    var stringQuery = "select * from yahoo.finance.quotes where symbol IN "
    // var stringQuery = 'select * from yahoo.finance.historicaldata where symbol = "'+ userInput+ '"'+ 'and startDate = "2015-03-22" and endDate = "2016-03-21"';
    var queryToMake = stringQuery + "(%22" + userInput + "%22)";
    var ending = "&format=json&env=http://datatables.org/alltables.env"
    var query = "http://query.yahooapis.com/v1/public/yql?q=" + queryToMake + ending;
    var chartLink = "https://www.google.com/finance/getchart?q=" + userInput + "&p=1Y&i=86400";

    $.ajax({
        url: query,
    }).done(function (response) {
        onDataReceived(response);

        //for embedding TradingView chart
        new TradingView.widget({
          "container_id":"chart",
          "width": 1150,
          "height": 520,
          "symbol": userInput,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "White",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "allow_symbol_change": true,
          "hideideas": true
        });
    })
}

// listen for click
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchStock)

    function check() {
        if(userInput.value.length === 0) {
            stocksInfo.innerHTML = "";
        };
    }


// update every 5 seconds
setInterval(function() {
    console.log('Refreshing...')
    searchStock();
}, 8000);

var interval = setInterval(function() {
    check();
}, 6000);
