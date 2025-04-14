let soalMatematika = [
    { soal: "125 + 237 = ?", jawaban: "362" },
    { soal: "584 - 269 = ?", jawaban: "315" },
    { soal: "48 × 7 = ?", jawaban: "336" },
    { soal: "936 ÷ 12 = ?", jawaban: "78" },
    { soal: "Barang Rp150.000 didiskon 20%, berapa harga akhirnya?", jawaban: "120000" },
    { soal: "Siswa menabung Rp2.500/hari selama 30 hari. Total tabungan?", jawaban: "75000" },
    { soal: "Urutkan dari kecil ke besar: 345, 123, 567, 234, 456", jawaban: "123, 234, 345, 456, 567" },
    { soal: "Mobil 360 km dalam 6 jam. Kecepatan rata-rata?", jawaban: "60" },
    { soal: "Jumlah bilangan ganjil dari 1 sampai 9.", jawaban: "25" },
    { soal: "Jika 3x + 5 = 20, berapa x?", jawaban: "5" },
    { soal: "Akar dari 144 adalah?", jawaban: "12" },
    { soal: "25% dari 200 adalah?", jawaban: "50" },
    { soal: "Jika x = 4, berapa nilai dari x^2 + 3x?", jawaban: "28" },
    { soal: "10! (faktorial dari 10) = ?", jawaban: "3628800" },
    { soal: "Luas persegi panjang 8x5?", jawaban: "40" },
    { soal: "Volume kubus dengan sisi 3?", jawaban: "27" },
    { soal: "Berapa 2^5?", jawaban: "32" },
    { soal: "Konversi 0.75 ke pecahan?", jawaban: "3/4" },
    { soal: "Sudut segitiga total?", jawaban: "180" },
    { soal: "Bilangan prima sebelum 10?", jawaban: "2, 3, 5, 7" }
  ];
  
  let soalSaatIni = 0;
  let jawabanBenar = 0;
  let timer;
  let waktuPerSoal = 10;
  let jumlahSoalDipilih = 10;
  let soalDipilih = [];
  let modeBahasa = "id";
  
  function mulaiQuiz() {
    const jumlah = document.getElementById("jumlahSoal").value;
    jumlahSoalDipilih = parseInt(jumlah);
  
    if (isNaN(jumlahSoalDipilih)) return alert("Pilih jumlah soal.");
  
    soalSaatIni = 0;
    jawabanBenar = 0;
    document.getElementById("feedback").innerText = "";
    document.getElementById("setup").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
  
    // Acak soal sesuai jumlah
    soalDipilih = [...soalMatematika].sort(() => Math.random() - 0.5).slice(0, jumlahSoalDipilih);
  
    tampilkanSoal();
  }
  
  function tampilkanSoal() {
    if (soalSaatIni >= soalDipilih.length) return selesai();
  
    clearTimeout(timer);
    let s = soalDipilih[soalSaatIni];
    document.getElementById("soal").innerText = s.soal;
  
    let opsi = document.getElementById("opsi-container");
    opsi.innerHTML = `
      <input type="text" id="jawaban" placeholder="Ketik jawaban...">
      <button onclick="cekJawaban()">Submit</button>
    `;
  
    document.getElementById("feedback").innerText = "";
    updateProgressBar();
  
    waktuPerSoal = parseInt(document.getElementById("timer").value);
    mulaiTimer();
  }
  
  function cekJawaban() {
    clearTimeout(timer);
    let input = document.getElementById("jawaban").value.trim();
  
    if (!input) {
      document.getElementById("feedback").innerText = "⚠️ Jawaban tidak boleh kosong!";
      return;
    }
  
    if (input.toLowerCase() === soalDipilih[soalSaatIni].jawaban.toLowerCase()) {
      jawabanBenar++;
      document.getElementById("feedback").innerText = "✅ Benar!";
    } else {
      document.getElementById("feedback").innerText = `❌ Salah! Jawaban: ${soalDipilih[soalSaatIni].jawaban}`;
    }
  
    soalSaatIni++;
    setTimeout(tampilkanSoal, 1500);
  }
  
  function mulaiTimer() {
    let sisa = waktuPerSoal;
    document.getElementById("timerDisplay").innerText = `⏰ ${sisa}s`;
  
    timer = setInterval(() => {
      sisa--;
      document.getElementById("timerDisplay").innerText = `⏰ ${sisa}s`;
  
      if (sisa <= 0) {
        clearInterval(timer);
        soalSaatIni++;
        document.getElementById("feedback").innerText = `⏱️ Waktu habis! Jawaban: ${soalDipilih[soalSaatIni - 1].jawaban}`;
        setTimeout(tampilkanSoal, 1500);
      }
    }, 1000);
  }
  
  function updateProgressBar() {
    const progress = (soalSaatIni / jumlahSoalDipilih) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
  }
  
  function selesai() {
    document.getElementById("quiz-container").innerHTML = `
      <h2>🎉 Selesai!</h2>
      <p>Skor: ${jawabanBenar} / ${jumlahSoalDipilih}</p>
      <button onclick="resetQuiz()">🔁 Main Lagi</button>
    `;
  }
  
  function resetQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("quiz-container").innerHTML = `
      <h2 id="soal"></h2>
      <div id="opsi-container"></div>
      <div id="timerDisplay"></div>
      <div id="progressBar"><div id="progress"></div></div>
      <p id="feedback"></p>
    `;
    document.getElementById("setup").style.display = "block";
  }
  