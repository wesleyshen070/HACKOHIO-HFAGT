const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

var monthChart;
var numPrescribers = 0;
var currentDrug = 'cholecap';
var indexArray = 0;
var allMonths = [0,0,0,0,0,0];

monthChartIt(currentDrug);

async function monthChartIt(fileNameVar) {
    await getDrugData(fileNameVar);
    
    const ctx1 = document.getElementById('chartMonth').getContext('2d');
    monthChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: currentDrug + '\'s Total TRx',
                    data: allMonths,
                    backgroundColor: 'rgba(0, 99, 132, 0.2)',
                    borderColor: 'rgba(0, 99, 132, 1)' ,
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            }
            
        }
    });
}

async function getDrugData(drugType) {
    currentDrug = "/" + drugType + ".csv";
    const response = await fetch(currentDrug);
    const data = await response.text();
    
    const table = data.split('\r\n').slice(1);
    
    // # of different drugs at the moment
    
    table.forEach (row =>{  
        
        const columns = row.split(',');
        
        if(columns[1]=='undefined')
            return;
        
        for(let i = 11; i < 17; i++){
            allMonths[i-11] += parseInt(columns[i]);
        }
    });
}

function getInputDrugValue(){
    // Selecting the input element and get its value 
    var drugType = document.getElementById("drugInput").value;
    console.log(drugType);
    
    // Displaying the value 
    destroyMonthChart();
    resetDrugGraph(drugType);
    monthChart.update();
}

function resetDrugGraph(newDrug){
    allMonths = [0,0,0,0,0,0];
    monthChartIt(newDrug);
}

function destroyMonthChart() {
    monthChart.destroy();
}