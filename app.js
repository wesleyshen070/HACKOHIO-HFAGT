const xlabels = [];
const yTRxVals = [];
const yNRxVals = [];
var myChart;
var drugName = [];
var numPrescribers = 0;
var defaultDisplay = 50;
var currentIndex = defaultDisplay;

chartIt(defaultDisplay);

async function chartIt(numDisplay) {
    await getData(numDisplay);
    
    const ctx = document.getElementById('chart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [
                {
                    label: 'Prescriber\'s Aggregated TRx',
                    data: yTRxVals,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)' ,
                    borderWidth: 1
                },
                {
                    label: 'Prescriber\'s Aggregated NRx',
                    data: yNRxVals,
                    backgroundColor: 'rgba(0, 99, 132, 0.2)',
                    borderColor: 'rgba(0, 99, 132, 1)' ,
                    borderWidth: 1
                }
            ]
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

async function getData(numDisplay) {
    const response = await fetch('Prescriber_Data.csv');
    const data = await response.text();
    
    const table = data.split('\r\n').slice(1);

    // # of different drugs at the moment
    var iterations = 0;
    
    table.forEach (row =>{  
        currentIndex++;
        iterations++;

        if(iterations >= numDisplay)
            return;

        const columns = row.split(',');
        const doctor = columns[1] + " " + columns[2];
        xlabels.push(doctor);

        if(columns[1]=='undefined')
            return;
        
        NRxTotal = 0;
        TRxTotal = 0;
        for(let i = 5; i < 11; i++){
            NRxTotal += parseInt(columns[i]);
        }
        for(let i = 11; i < 17; i++){
            TRxTotal += parseInt(columns[i]);
        }
        
        //for the creation of 4 different charts
        drugName.push(columns[4]);
        var uniqueDrugs = new Set(drugName);
        drugName = Array.from(uniqueDrugs);
        
        yNRxVals.push(NRxTotal);
        yTRxVals.push(TRxTotal);
    });
}

function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myInput").value;
    
    // Displaying the value
    resetGraph();
    chartIt(inputVal);
    myChart.update();
    console.log(inputVal);
}

function resetGraph(){
    myChart.destroy();
    xlabels.length = 0;
    yTRxVals.length = 0;
    yNRxVals.length = 0;
}