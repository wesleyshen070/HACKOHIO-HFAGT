
let xlabels = [];
const yTRxVals = [];
const yNRxVals = [];

chartIt();

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Total Prescriptions',
                data: [{
                    x: xlabels,
                    y: yTRxVals
                }],
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'New Prescriptions',
                data: [{
                    x: xlabels,
                    y: yNRxVals
                }],
                backgroundColor: [
                    'rgba(0, 0, 255, 1)',
                ],
                borderWidth: 1
            }  
        ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}
async function getData() {
    const response = await fetch('Prescriber_Data.csv');
    const data = await response.text();
    
    const table = data.split('\n').slice(1);
    
    // shorten is to make sure it doesnt run too many times
    // the # of y-values is limited by shorten
    var shorten = 0;
    
    table.forEach (row =>{  
        shorten++;
        if(shorten >= 49)
        return;
        
        month = 0;
        month++
        const columns = row.split(',');
        NRxTotal = 0;
        TRxTotal = 0;
        for(let i = 5; i < 11; i++){
            NRxTotal += parseInt(columns[i]);
        }
        for(let i = 11; i < 17; i++){
            TRxTotal += parseInt(columns[i]);
        }
        
        yNRxVals.push(NRxTotal);
        yTRxVals.push(TRxTotal);
        console.log(month, TRxTotal, NRxTotal)
    });
}