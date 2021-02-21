const loanForm = document.querySelector('.loan-form');
const loanAmount = document.querySelector('.loan-amount');
const interestRate = document.querySelector('.interest-rate');
const period = document.querySelector('.period');
const monthlyPayment = document.querySelector('.monthly-payment');
const totalPayment = document.querySelector('.total-payment');
const totalInterest = document.querySelector('.total-interest');
const timeEl = document.querySelector('#time');
const spinner = document.querySelector('#spinner-container');
const results = document.querySelector('#results');
const currency = document.querySelector('#currency');

// Show result
const showResult = () => {
  spinner.style.display = 'none';
  results.style.display = 'block';
};

// Show message
const showMessage = (message) => {
  const loan = document.querySelector('.loan');
  spinner.style.display = 'none';
  const loanHeading = document.querySelector('.loan-heading');
  const div = document.createElement('div');
  div.className = 'error';
  div.textContent = message;

  loan.insertBefore(div, loanHeading);
  // Remove message
  removeMesssage();
};

// Remove message
const removeMesssage = () => {
  setTimeout(() => {
    document.querySelector('.error').remove();
  }, 3000);
};

// Calculate loan
const calculateLoan = () => {
  // Input values
  const time = parseFloat(timeEl.value);
  const principal = parseFloat(loanAmount.value);
  const interest = parseFloat(interestRate.value) / 100 / 12;
  const duration = parseFloat(period.value * time);

  // Compute payment
  const x = 1 / (1 + interest) ** duration;
  const monthly = (interest * principal) / (1 - x);
  const total = monthly * duration;
  const loanInterest = total - principal;

  if (isFinite(monthly)) {
    totalPayment.textContent = `${currency.value}${total
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

    monthlyPayment.textContent = `${currency.value}${monthly
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

    totalInterest.textContent = `${currency.value}${loanInterest
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    // Show result
    showResult();
  } else {
    if (!document.querySelector('.error')) {
      // Show error message
      showMessage('Please check your inputs');
    } else {
      //  DO NOTHING
    }
  }
};

// Submit
loanForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Hide result
  results.style.display = 'none';
  // Show spinner
  spinner.style.display = 'flex';
  // Remove spinner & calculate loan
  setTimeout(() => {
    calculateLoan();
  }, 2000);
});
