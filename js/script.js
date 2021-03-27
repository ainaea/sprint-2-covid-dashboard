
$( "button#btn" ).on( "click", GetData);


//Fetch data and update UI content
function GetData() {
    // alert('hello3');

    fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            //Global data is modified here
            UpdateUI(data.Global);
            //Nigeria data is modified here
            UpdateUI(data.Countries[125], 'nigeria');
            $(`div.data` ).html( TableFromArray(data.Countries) );

        })
    
}

//Data for testing isolated functions
const dummyData = {
NewConfirmed: 376001,
NewDeaths: 8480,
NewRecovered: 195273,
TotalConfirmed: 125970004,
TotalDeaths: 2765411,
TotalRecovered: 71446704
}

//UpdateUI modifies the values based on the data and container choice
function UpdateUI(inData, x='global') {
    $(`.${x} p span.newC` ).html( inData.NewConfirmed );
    $(`.${x} p span.newD` ).html( inData.NewDeaths );
    $(`.${x} p span.newR` ).html( inData.NewRecovered );
    $(`.${x} p span.totalC` ).html( inData.TotalConfirmed );
    $(`.${x} p span.totalD` ).html( inData.TotalDeaths );
    $(`.${x} p span.totalR` ).html( inData.TotalRecovered );
    
}

//This function generates the entire table based on the array of data passed.
function TableFromArray(arr) {
    var str = `
    <table>
        <tr>
            <th>S/N</th>
            <th>Country</th>
            <th>New Confirmed</th>
            <th>New Death</th>
            <th>New Recovered</th>
            <th>Total Confirmed</th>
            <th>Total Death</th>
            <th>Total Recovered</th>
        </tr>  
        `;
//The loop below generate the table rows
    for (const [i,elt] of arr.entries() ) {
        str += `
        <tr>
            <td>${i+1}</td>
            <td>${elt.Country}</td>
            <td>${elt.NewConfirmed}</td>
            <td>${elt.NewDeaths}</td>
            <td>${elt.NewRecovered}</td>
            <td>${elt.TotalConfirmed}</td>
            <td>${elt.TotalDeaths}</td>
            <td>${elt.TotalRecovered}</td>
        </tr> 
        `;
    }
    str += `
    </table>
    `;
    // console.log(str);
    return str;
}

// TableFromArray([2,3,4,5]);

// $("button.continue" ).html( "Next Step..." );