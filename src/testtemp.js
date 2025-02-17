
let array=[73,74,75,71,69,72,76,73];

var maxProfit = function(array) {

for (let i=0;i<array.length;i++)
{
    let j=i+1;
    while(j<array.length)
    {
        if(array[i]<array[j])
        {
            console.log(array[j]);
            break;
        }
        else if(j==array.length-1)
        {
            console.log(0);
        }
        j++;
    }
}
}