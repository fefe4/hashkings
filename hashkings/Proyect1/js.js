const ssc = new SSC('https://api.hive-engine.com/rpc');
// ssc.getContractInfo((err, result) => {
// 		console.log(err, result);
// 	});


async function fefe(){
    const data = await  ssc.find('tokens', 'balances', {"symbol":"BUDSX", "account":{"$ne":"null"} }, 1000, 0, [], (err, result) => {
        // console.log(err, result);
        return(result);
    })  
    
    dataSorted = data.sort((a,b)=>b.balance - a.balance)
   
    const budsPool = await ssc.findOne(
        'marketpools',
        'pools',
        {
        tokenPair: "BUDS:SWAP.HIVE"
        }, (err, result) => {
        return result
        })
    
    
    const hkData = await  ssc.find('tokens', 'balances', {"symbol":"SWAP.HIVE","account":"hk-staking"  }, 1000, 0, [], (err, result) => {
        // console.log(err, result);
        return(result);
    }) 


    const budsPoolPrice = budsPool.basePrice
    const totalReward = (hkData[0].balance/budsPoolPrice)*0.01
    let totalBudsX = 0
    for (i=0;  i<data.length; i++) {
        totalBudsX = totalBudsX + parseInt(data[i].balance)
    }
    
    console.log(totalBudsX)
    console.log(totalReward)
    console.log()
    const tableBody = document.getElementById("tablebody")
    for (i=0;  i<data.length; i++) {
        
        const row = document.createElement("tr");
        const user = document.createElement("td");
        const staking = document.createElement("td");
        const reward = document.createElement("td");
        user.textContent = data[i].account;
        staking.textContent = data[i].balance;
        reward.textContent = data[i].balance*totalReward/totalBudsX
        row.append(user)
        row.append(staking)
        row.append(reward)
        tableBody.append(row)
    }
    
    

}

fefe()