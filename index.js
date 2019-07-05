
const CURRENCY_NOTES = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];

// function to calculate number of currency
function calculateNumberOfCurrency(withdrawAmount) {
    let numberOfCurrencies = [];
    for (let i = 9; i >= 0; i--) {
        if (withdrawAmount >= CURRENCY_NOTES[i]) {
            numberOfCurrencies[i] = Math.floor(withdrawAmount / CURRENCY_NOTES[i]);
            withdrawAmount = withdrawAmount - numberOfCurrencies[i] * CURRENCY_NOTES[i];
        } else {
            numberOfCurrencies[i] = 0;
        }
    }
    renderCurrencyTable(numberOfCurrencies);
}

function renderCurrencyTable(numberOfCurrencies) {
    if (numberOfCurrencies.length > 0) {
        let tbody = "";
        let totalNotes = 0;
        if (numberOfCurrencies.length > 0) {
            totalNotes = numberOfCurrencies.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            });
        }
       
        let theader = '<div class="table-responsive"><table class="table">\n';
        
        for (let i = 0; i < numberOfCurrencies.length - 1; i++) {
            tbody += "<tr>";
            tbody += `<td>${numberOfCurrencies[i] + " Note of Rs " + CURRENCY_NOTES[i]}</td>`;
            tbody += `<td>${i !== numberOfCurrencies.length
                ? numberOfCurrencies[i + 1] + " Note of Rs " + CURRENCY_NOTES[i + 1]
                : numberOfCurrencies[i] + " Note of Rs " + CURRENCY_NOTES[i]}</td>`;
            if (i !== numberOfCurrencies.length - 2) {
                i = i + 1;
            }
            tbody += "</tr>\n";
        }
        tbody +=
            '<tr class="bold-w"> <td>Total notes dispensed: ' +
            totalNotes +
            "</td><td></td></tr>";
        let tfooter = "</table></div>";
        document.getElementById("tblSummary").innerHTML =
            theader + tbody + tfooter;
    }
}

function dispenseMoney(event) {
    const withdrawAmount = parseInt(document.dispenseForm[0].value, 0);
    let errorNode = document.getElementById("error");
    if (withdrawAmount && withdrawAmount > 0) {
        document.getElementById("error").innerHTML = null;        
        calculateNumberOfCurrency(withdrawAmount);
    } else {        
        if (withdrawAmount <= 0) {
            errorNode.innerHTML =
                "Please enter the amount greater than 0";
        } else { 
            errorNode.innerHTML =
                "Please enter some amount.";
        }        
        document.getElementById("tblSummary").innerHTML = null;
    }
    event.preventDefault();
    return false;
}