symplyCountdown('#cuenta', {
    year: 2023,
    month: 01,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    words: {
        days: 'Día',
        hours: 'Hora',
        minutes: 'Minuto',
        seconds: 'Segundo',
        pluralLetter: 's'
    },
    plural: true,
    inline: false,
    inlineClass: 'symply-countdown-inline',
    enableUtc: true,

    onEnd: function() {
        document.getElementById('portada').classList.add('oculta');ç
        return;
    },
    refresh: 1000,
    sectionClass: 'simply-section',
    amountClass: 'simply-amount',
    wordClass: 'simply-word',
    zeroPad: false,
    countUp: false
});