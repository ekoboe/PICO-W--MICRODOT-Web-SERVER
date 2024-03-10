/* SIDEBAR */
const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function() {
     sidebar.classList.toggle('hide');
})


/* TOGGLE */

let activeSatu = false;
let activeDua = false;
let activeTiga = false;
let activeEmpat = false;

function toggle(toggleClass) {
  let toggle = document.querySelector('.' + toggleClass);

  if (toggleClass === 'toggleSatu') {
    activeSatu = !activeSatu;
    if (activeSatu) {
      toggle.classList.add('active');

      fetch('');
    } else {
      toggle.classList.remove('active');

      fetch('');
    }

  } else if (toggleClass === 'toggleDua') {
    activeDua = !activeDua;
    if (activeDua) {
      toggle.classList.add('active');

      fetch('');
    } else {
      toggle.classList.remove('active');

      fetch('');
    }

  } else if (toggleClass === 'toggleTiga') {
    activeTiga = !activeTiga;
    if (activeTiga) {
      toggle.classList.add('active');

      fetch('');
    } else {
      toggle.classList.remove('active');

      fetch('');
    }

  } else if (toggleClass === 'toggleEmpat') {
    activeEmpat = !activeEmpat;
    if (activeEmpat) {
      toggle.classList.add('active');

      fetch('');
    } else {
      toggle.classList.remove('active');

      fetch('');
        }
    }
}


/* TEMPERATURE GAUGE */

// Fungsi untuk mengambil data aktual temperature dari server
function fetchTemperatureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingTemp; // Mengambil nilai temperatur dari respons server
        })
        .catch(error => {
            console.error("Error fetching temperature data:", error);
            return 0; // Jika terjadi kesalahan, kembalikan nilai default (0)
        });
}
// Fungsi untuk mengubah nilai pada gauge temperature
function updateTemperatureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-1 .gauge");

    // Ambil data aktual temperature dari server menggunakan fungsi fetchTemperatureData()
    fetchTemperatureData()
        .then(temperatureInCelsius => {
            // Normalisasi nilai temperature menjadi range 0 hingga 1 (asumsi maksimal 100 derajat Celsius)
            const normalizedTemperature = temperatureInCelsius / 100;

            // Memperbarui nilai pada gauge temperature
            setTemperatureGaugeValue(gaugeElement, normalizedTemperature);

            // Mengulangi pembaruan setiap 3 detik
            setTimeout(updateTemperatureGauge, 6000);
        });
}

// Fungsi untuk mengatur nilai pada gauge temperature
function setTemperatureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    const angle = value * 180; // Convert normalized value to an angle (0 to 180 degrees)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}°C`; // Menampilkan nilai temperature dalam derajat Celsius
}


// Memulai pembaruan gauge temperature setiap 3 detik
updateTemperatureGauge();


/* HUMIDITY GAUGE */

// Fungsi untuk mengambil data aktual humidity dari server
function fetchHumidityData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingHum; // Mengambil nilai humidity dari respons server
        })
        .catch(error => {
            console.error("Error fetching humidity data:", error);
            return 0; // Jika terjadi kesalahan, kembalikan nilai default (0)
        });
}

// Fungsi untuk mengubah nilai pada gauge humidity
function updateHumidityGauge() {
    const gaugeElement = document.querySelector(".gauge-card-2 .gauge");

    // Ambil data aktual humidity dari server menggunakan fungsi fetchHumidityData()
    fetchHumidityData()
        .then(humidityInPercentage => {
            // Normalisasi nilai humidity menjadi range 0 hingga 1 (asumsi maksimal 100 persen)
            const normalizedHumidity = humidityInPercentage / 100;

            // Memperbarui nilai pada gauge humidity
            setHumidityGaugeValue(gaugeElement, normalizedHumidity);

            // Mengulangi pembaruan setiap 3 detik
            setTimeout(updateHumidityGauge, 6000);
        });
}

// Fungsi untuk mengatur nilai pada gauge humidity
function setHumidityGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    const angle = value * 180; // Convert normalized value to an angle (0 to 180 degrees)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}%`; // Menampilkan nilai humidity
}

// Memulai pembaruan gauge humidity setiap 3 detik
updateHumidityGauge();


/* ALTITUDE GAUGE */

// Fungsi untuk mengambil data aktual altitude dari server
function fetchAltitudeData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingAlt; // Mengambil nilai altitude dari respons server
        })
        .catch(error => {
            console.error("Error fetching altitude data:", error);
            return 0; // Jika terjadi kesalahan, kembalikan nilai default (0)
        });
}
// Fungsi untuk mengubah nilai pada gauge altitude
function updateAltitudeGauge() {
    const gaugeElement = document.querySelector(".gauge-card-3 .gauge");

    // Ambil data aktual altitude dari server menggunakan fungsi fetchAltitudeData()
    fetchAltitudeData()
        .then(altitudeInMetre => {
            // Normalisasi nilai altitude menjadi range 0 hingga 1 (asumsi maksimal 200 meter)
            const normalizedAltitude = altitudeInMetre / 1000;

            // Memperbarui nilai pada gauge humidity
            setAltitudeGaugeValue(gaugeElement, normalizedAltitude);

            // Mengulangi pembaruan setiap 3 detik
            setTimeout(updateAltitudeGauge, 6000);
        });
}

// Fungsi untuk mengatur nilai pada gauge altitude
function setAltitudeGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 1000)} m`; // Menampilkan nilai altitude dalam meter
}

// Memulai pembaruan gauge altitude setiap 3 detik
updateAltitudeGauge();


/* PRESSURE GAUGE */

// Fungsi untuk mengambil data aktual pressure dari server
function fetchPressureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingPress; // Mengambil nilai pressure dari respons server
        })
        .catch(error => {
            console.error("Error fetching pressure data:", error);
            return 0; // Jika terjadi kesalahan, kembalikan nilai default (0)
        });
}
// Fungsi untuk mengubah nilai pada gauge pressure
function updatePressureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-4 .gauge");

    // Ambil data aktual presssure dari server menggunakan fungsi fetchPressureData()
    fetchPressureData()
        .then(PressureInHpa => {
            // Normalisasi nilai pressure menjadi range 0 hingga 1 (asumsi maksimal 1000 Hpa)
            const normalizedPressure = PressureInHpa / 6000;

            // Memperbarui nilai pada gauge pressure
            setPressureGaugeValue(gaugeElement, normalizedPressure);

            // Mengulangi pembaruan setiap 3 detik
            setTimeout(updatePressureGauge, 6000);
        });
}

// Fungsi untuk mengatur nilai pada gauge pressure
function setPressureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value * 180}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${(value * 6000).toFixed(2)} hPa`; // Menampilkan nilai tekanan dalam satuan hektopascal
}

// Memulai pembaruan gauge pressure setiap 3 detik
updatePressureGauge();


/* NOISE LEVEL */

// Fungsi untuk mengambil data aktual noise dari server
function fetchNoiseData() {
    return fetch(`/updateNoise`)
        .then((response) => response.json())
        .then(data => {
            return data.readingNoise; // Mengambil nilai noise dari respons server
        })
        .catch(error => {
            console.error("Error fetching noise data:", error);
            return 0; // Jika terjadi kesalahan, kembalikan nilai default (0)
        });
}
// Fungsi untuk mengubah nilai pada gauge noise
function updateNoiseGauge() {
    const gaugeElement = document.querySelector(".gauge-card-6 .gauge");

    // Ambil data aktual noise dari server menggunakan fungsi fetchNoiseData()
    fetchNoiseData()
        .then(noiseIndB => {
            // Normalisasi nilai noise menjadi range 0 hingga 1 (asumsi maksimal 120dB)
            const normalizedNoise = noiseIndB / 100;

            // Memperbarui nilai pada gauge noise
            setNoiseGaugeValue(gaugeElement, normalizedNoise);

            // Mengulangi pembaruan setiap 3 detik
            setTimeout(updateNoiseGauge, 6000);
        });
}

// Fungsi untuk mengatur nilai pada gauge tingkat kebisingan
function setNoiseGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value * 180}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)} dB`; // Menampilkan nilai tingkat kebisingan dalam dB
}

// Memulai pembaruan gauge tingkat kebisingan
updateNoiseGauge();



/* LINE CHART */

// Fungsi untuk mengupdate data chart dan label
function updateChart(chart, temperatureData, humidityData, label) {
    // Hapus data tertua jika jumlah data melebihi batas tertentu (contoh: 30 data)
    if (chart.data.labels.length >= 30) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }

    chart.data.labels.push(label); // Tambahkan label waktu baru
    chart.data.datasets[0].data.push(temperatureData); // Tambahkan data suhu baru
    chart.data.datasets[1].data.push(humidityData); // Tambahkan data kelembapan baru
    chart.update();
}

// Fungsi untuk membuat line chart
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Masukkan label waktu di sini
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: [], // Data suhu akan diisi secara dinamis
                    borderColor: '#C51605',
                    backgroundColor: 'rgba(255, 133, 81, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Humidity (%)',
                    data: [], // Data kelembapan akan diisi secara dinamis
                    borderColor: '#F86F03',
                    backgroundColor: 'rgba(255, 184, 77, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category', // Jika menggunakan label waktu
                    display: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
            },
        },
    });

    return lineChart;
}

// Memulai pembaruan line chart setiap 1 menit
function startUpdatingChart() {
    const lineChart = createLineChart();

    // Memperbarui data chart dan label setiap 1 menit
    setInterval(async () => {
        // Mendapatkan data aktual suhu dan kelembapan dari simulasi
        const temperatureData = await getActualTemperatureData();
        const humidityData = await getActualHumidityData();
        const currentTime = moment().format('HH:mm'); // Ambil waktu saat ini dan format sebagai 'Jam:Menit'

        updateChart(lineChart, temperatureData, humidityData, currentTime);
    }, 15000); // Set interval menjadi 15000 milidetik (15 detik)
}

// Fungsi untuk mendapatkan data aktual suhu dari server
async function getActualTemperatureData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingTemp;
}

// Fungsi untuk mendapatkan data aktual kelembapan dari server
async function getActualHumidityData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingHum;
}

// Memulai pembaruan line chart
startUpdatingChart();