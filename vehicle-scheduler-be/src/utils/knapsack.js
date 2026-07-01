function knapsack(vehicles, capacity){

    const n = vehicles.length;

    const dp = Array.from(
        {length:n+1},
        ()=>Array(capacity+1).fill(0)
    );

    for(let i=1;i<=n;i++){

        const weight = vehicles[i-1].Duration;
        const value = vehicles[i-1].Impact;

        for(let w=0;w<=capacity;w++){

            if(weight<=w){

                dp[i][w]=Math.max(

                    value+dp[i-1][w-weight],

                    dp[i-1][w]

                );

            }

            else{

                dp[i][w]=dp[i-1][w];

            }

        }

    }

    const selected=[];

    let w=capacity;

    for(let i=n;i>0;i--){

        if(dp[i][w]!=dp[i-1][w]){

            selected.push(vehicles[i-1]);

            w-=vehicles[i-1].Duration;

        }

    }

    return{

        totalImpact:dp[n][capacity],

        selectedVehicles:selected.reverse()

    };

}

module.exports=knapsack;