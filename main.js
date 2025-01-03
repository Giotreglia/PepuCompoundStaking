const imponible = document.getElementById('amount');
const calcBtn = document.getElementById('calcBtn');
const reward = document.getElementById('reward');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const result = document.getElementById('result');
const dailyResult = document.getElementById('dailyResult');
const monthlyResult = document.getElementById('monthlyResult');
const monthlyCompound = document.getElementById('monthlyCompound');
const hourCompound = document.getElementById('hourCompound');
const monthlyWithoutCompound = document.getElementById('monthlyWithoutCompound');
const daysResult = document.getElementById('daysResult');
const daysResult2 = document.getElementById('daysResult2');
const daysResult3 = document.getElementById('daysResult3');
const hoursResult = document.getElementById('hoursResult');
const hoursResult2 = document.getElementById('hoursResult2');
const gain = document.getElementById('gain');
const gainHour = document.getElementById('gainHour');
const percDay = document.getElementById('percDay');
const percHour = document.getElementById('percHour');
const reset = document.getElementById('reset');

// Funzione per calcolare l'interesse composto
function calcolaInteresseComposto(capitale, tassoAnnuo, giorni) {
    return capitale * Math.pow((1 + tassoAnnuo / 365), giorni);
}

function calcolaInteresseCompostoConReinvestimento(capitale, tassoAnnuo, giorni, oreReinvestimento) {
    const n = 8760 / oreReinvestimento; // Frequenza di reinvestimento annuale
    const t = giorni / 365; // Tempo in anni
    return capitale * Math.pow(1 + tassoAnnuo / n, n * t);
}

// Funzione per sincronizzare i valori degli input
function getInputValues() {
    return {
        imponibileValue: parseFloat(imponible.value) || 0,
        rewardValue: parseFloat(reward.value) / 100 || 0,
        daysValue: parseInt(days.value) || 0,
        hoursValue: parseInt(hours.value) || 0,
    };
}

// Evento sul pulsante per eseguire i calcoli
calcBtn.addEventListener('click', function () {
    const { imponibileValue, rewardValue, daysValue, hoursValue } = getInputValues();

    // Calcoli principali
    const interesseTotale = imponibileValue * rewardValue;
    const interesseGiornaliero = interesseTotale / 365;
    const interesseMensile = interesseGiornaliero * 30;

    const montanteMensileNoCompound = imponibileValue + interesseGiornaliero * (daysValue);
    const montanteCompound = calcolaInteresseComposto(imponibileValue, rewardValue, daysValue);
    const montanteCompoundHours = calcolaInteresseCompostoConReinvestimento(imponibileValue, rewardValue, daysValue, hoursValue);

    // Funzione helper per aggiungere il suffisso $pepu
    function formatResult(value) {
        return `${value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 0.8em;">$pepu</span>`;
    }

    // Aggiornamento risultati
    result.innerHTML = formatResult(interesseTotale);
    dailyResult.innerHTML = formatResult(interesseGiornaliero);
    monthlyResult.innerHTML = formatResult(interesseMensile);
    monthlyWithoutCompound.innerHTML = formatResult(montanteMensileNoCompound);
    /* monthlyCompound.innerHTML = formatResult(montanteCompound); */
    hourCompound.innerHTML = formatResult(montanteCompoundHours);
    /* gain.innerHTML = formatResult(montanteCompound - montanteMensileNoCompound); */
    gainHour.innerHTML = formatResult(montanteCompoundHours - montanteMensileNoCompound);
    /* percDay.innerHTML = `${(((montanteCompound - montanteMensileNoCompound) / montanteMensileNoCompound) * 100).toFixed(2)}%`; */
    percHour.innerHTML = `${(((montanteCompoundHours - montanteMensileNoCompound) / montanteMensileNoCompound) * 100).toFixed(2)}%`;
    daysResult.innerHTML = daysValue;
    /* daysResult2.innerHTML = daysValue; */
    daysResult3.innerHTML = daysValue;
    hoursResult.innerHTML = hoursValue;
    hoursResult2.innerHTML = hoursValue;
});

// Reset
reset.addEventListener('click', function () {
    // Reset dei campi di input
    imponible.value = '';
    reward.value = '';
    days.value = '';
    hours.value = '';

    // Reset dei risultati
    result.innerHTML = '';
    dailyResult.innerHTML = '';
    monthlyResult.innerHTML = '';
    monthlyWithoutCompound.innerHTML = '';
    /* monthlyCompound.innerHTML = ''; */
    hourCompound.innerHTML = '';
    /* gain.innerHTML = ''; */
    gainHour.innerHTML = '';
    /* percDay.innerHTML = ''; */
    percHour.innerHTML = '';
    daysResult.innerHTML = '';
    /* daysResult2.innerHTML = ''; */
    daysResult3.innerHTML = '';
    hoursResult.innerHTML = '';
    hoursResult2.innerHTML = '';
})
