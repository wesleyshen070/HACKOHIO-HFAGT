const xlabels = [];
const yTRxVals = [];
const yNRxVals = [];

var myChart;
var defaultDisplay = 50;
var currentIndex = defaultDisplay;

var defaultDrug = 'Cholecap';
var defaultFile = 'Cholecap_drug.csv';

getInputDrugTop();

chartIt(defaultDisplay);

displayDoctors(numTopDoctors)

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
    const response = await fetch('Nasalclear_drug.csv');
    const data = await response.text();
    
    const table = data.split('\r\n').slice(1);

    var iterations = 0;
    
    table.forEach (row =>{  
        currentIndex++;

        if(iterations >= numDisplay)
            return;
        iterations++;

        const columns = row.split(',');
        const doctor = columns[1] + " " + columns[2];
        xlabels.push(doctor);

        if(columns[1]=='undefined')
            return;
        
        NRxTotal = 0;
        TRxTotal = 0;
        for(let i = 5; i < 11; i++){
            NRxTotal += parseInt(columns[i]);
<<<<<<< HEAD
        }
        for(let i = 11; i < 17; i++){
            TRxTotal += parseInt(columns[i]);
=======
>>>>>>> 71fcbe1053190e6f9ae0b0563cf3036b995dcb16
        }
        TRxTotal = parseInt(columns[17]);
        
        yNRxVals.push(NRxTotal);
        yTRxVals.push(TRxTotal);
<<<<<<< HEAD
        console.log(doctor, TRxTotal, NRxTotal);
=======
>>>>>>> 71fcbe1053190e6f9ae0b0563cf3036b995dcb16
    });
}

function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myInput").value;
    
    // Displaying the value
    destroyChart();
    xlabels.length = 0;
    yTRxVals.length = 0;
    yNRxVals.length = 0;
    chartIt(inputVal);
    myChart.update();
}


function destroyChart() {
    myChart.destroy();
}

async function getInputDrugTop() {

}