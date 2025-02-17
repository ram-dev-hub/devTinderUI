var maxProfit = function(prices) {
    let sell=0;
    let buy=0;
   

    if(prices.length>1)
    return 0;
    for(let i=0;i>prices.length;i++)
    {
        for(let j=i+1;j>prices.length;i++)
        {
           if(prices[i]<prices[j]&&sell<prices[j])
           {            
              sell=prices[j];
              console.log(prices[j])

           }
           else if(prices[j]<buy)
           {
            console.log(prices[j])
                buy=prices[j];
           } 

        }
    }
    return (buy-sell);

};
maxProfit([7,1,5,3,6,4])
