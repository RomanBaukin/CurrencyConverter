'use strict';

const convertInRubles = document.getElementById('converted-in-rubles'),
  convertFromRubles = document.getElementById('converted-from-rubles'),
  inputUsdOrEuro = document.getElementById('input-usd-or-euro'),
  inputRubles = document.getElementById('input-rubles'),
  outputRubles = document.getElementById('output-rubles'),
  outputUsdOrEuro = document.getElementById('output-usd-or-euro'),
  selectUsdOrEuro = document.querySelectorAll('[type="radio"]'),
  labelForUsdOrEuro = document.querySelector('[for="usd-or-euro"]'),
  labelOutputUsdOrEuro = document.querySelector('[for="output-usd-or-euro"]');

let currency = `USD`;

inputRubles.addEventListener('input', () => {
  inputRubles.value = inputRubles.value.replace(/\D/g, '');
});
inputUsdOrEuro.addEventListener('input', () => {
  inputUsdOrEuro.value = inputUsdOrEuro.value.replace(/\D/g, '');
});

const selectedCurrency = () => {
  const dollarText = 'Доллар США (USD)',
    euroText = 'Евро (EUR)';

  labelForUsdOrEuro.textContent = dollarText;
  labelOutputUsdOrEuro.textContent = dollarText;
  selectUsdOrEuro.forEach((item) => {
    item.addEventListener('change', () => {
      currency = item.value;
      inputUsdOrEuro.value = '';
      inputRubles.value = '';
      outputRubles.value = '';
      outputUsdOrEuro.value = '';

      if (item.value === 'EUR') {
        labelForUsdOrEuro.textContent = euroText;
        labelOutputUsdOrEuro.textContent = euroText;
      } else {
        labelForUsdOrEuro.textContent = dollarText;
        labelOutputUsdOrEuro.textContent = dollarText;
      }
    });
  });
};

selectedCurrency();

convertInRubles.addEventListener('click', () => {
  fetch(`https://api.exchangeratesapi.io/latest?base=${currency}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      return response.json();
    })
    .then((data) => {
      outputRubles.value = inputUsdOrEuro.value * data.rates.RUB;
    })
    .catch((error) => {
      console.error(error);
    });
});

convertFromRubles.addEventListener('click', () => {
  fetch('https://api.exchangeratesapi.io/latest?base=RUB')
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      return response.json();
    })
    .then((data) => {
      outputUsdOrEuro.value = inputRubles.value * data.rates[currency];
    })
    .catch((error) => {
      console.error(error);
    });
});
