const xlabels = [];
const yVals = [];

chartIt();

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Prescriber\'s Aggregated TRx',
                data: yVals,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)' ,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
async function getData() {
    const response = await fetch('Prescriber_Data.csv');
    const data = await response.text();
    
    const table = data.split('\r\n').slice(1);
    
    // shorten is to make sure it doesnt run too many times
    // the # of y-values is limited by shorten
    var shorten = 0;
    
    table.forEach (row =>{  
        shorten++;
        if(shorten >= 49)
        return;
        
        const columns = row.split(',');
        const doctor = columns[1] + " " + columns[2];
        xlabels.push(doctor);
        
        RTxTotal = 0;
        for(let i = 11; i < 17; i++){
            RTxTotal += parseInt(columns[i]);
        }
        
        yVals.push(RTxTotal);
        console.log(doctor, RTxTotal);
    });
}