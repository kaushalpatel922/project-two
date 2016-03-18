window.onload = function () {

  console.log("loaded!");
  var searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function () {

    var userInput = document.getElementById("stock-ticker").value;
    var stringQuery = "select * from yahoo.finance.quotes where symbol IN "
    var queryToMake = stringQuery + "(%22" + userInput + "%22)";
    var ending = "&format=json&env=http://datatables.org/alltables.env"
    var query = "http://query.yahooapis.com/v1/public/yql?q=" + queryToMake + ending;

    $.ajax({
        url: query,
    }).done(function alpha(response){
        console.log("done")
        console.log(response);

    var stocksData = {
    };

    // $(".search-button").click(function(){
    //   $("#stocks-info").fadeIn(10000);
    // });



    stocksData.Name = response.query.results.quote.Name;
    stocksData.symbol = (response.query.results.quote.symbol).toUpperCase();
    stocksData.currentPrice = response.query.results.quote.LastTradePriceOnly;
    stocksData.change = response.query.results.quote.Change;
    stocksData.changePercent = response.query.results.quote.ChangeinPercent;
    if(stocksData.changePercent > 0) {

    }
    stocksData.time = response.query.results.quote.LastTradeTime;
    stocksData.marketCap = response.query.results.quote.MarketCapitalization;
    stocksData.previousClose = response.query.results.quote.PreviousClose;
    stocksData.openPrice = response.query.results.quote.Open;
    stocksData.daysLow = response.query.results.quote.DaysLow;
    stocksData.daysHigh = response.query.results.quote.DaysHigh;
    stocksData.yearsLow = response.query.results.quote.YearLow;
    stocksData.yearsHigh = response.query.results.quote.YearHigh;
    stocksData.todayVolume = response.query.results.quote.Volume;
    stocksData.threeMoAvg = response.query.results.quote.AverageDailyVolume;
    stocksData.oneYearTarget = response.query.results.quote.OneyrTargetPrice;
    stocksData.dividendYield = response.query.results.quote.DividendYield;

    console.log(stocksData.Name);
    console.log(stocksData.symbol);
    console.log(stocksData.currentPrice);
    console.log(stocksData.change);
    console.log(stocksData.changePercent);
    console.log(stocksData.time);
    console.log(stocksData.marketCap);
    console.log(stocksData.previousClose);
    console.log(stocksData.openPrice);
    console.log(stocksData.daysLow);
    console.log(stocksData.daysHigh);
    console.log(stocksData.yearsLow);
    console.log(stocksData.yearsHigh);
    console.log(stocksData.todayVolume);
    console.log(stocksData.threeMoAvg);
    console.log(stocksData.oneYearTarget);
    console.log(stocksData.dividendYield);

    var source = document.getElementById("stocks-template").innerHTML;
    var template = Handlebars.compile(source);
    var compliedHtml = template(stocksData);
    var stocksInfo = document.getElementById("stocks-info");
    stocksInfo.innerHTML = compliedHtml;

    //setTimeout(alpha,3000); - can't rerun
    }) //end of done function


  }) //end of searchButton eventlistener fx
} //end of window.onload function
