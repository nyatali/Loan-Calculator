document.getElementById('loan-form').addEventListener('submit', function(e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate results
function calculateResults() {
    // UI vars
    const UIAmount = document.getElementById('amount');
    const UIInterest = document.getElementById('interest');
    const UIYears = document.getElementById('years');
    const UIMonthlyPayment = document.getElementById('monthly-payment');
    const UITotalPayment = document.getElementById('total-payment');
    const UITotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIAmount.value);
    const calculatedInterest = parseFloat(UIInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIYears.value) * 12;

    // Compute mounthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const mounthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(mounthly)) {
        UIMonthlyPayment.value = mounthly.toFixed(2);
        UITotalPayment.value = (mounthly * calculatedPayments).toFixed(2);
        UITotalInterest.value = ((mounthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please, check your numbers!');
    }
}

function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}