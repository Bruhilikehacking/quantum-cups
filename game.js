// =====================
// Firebase init
// =====================
var firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// =====================
// Periodic table (118)
// =====================
const periodicElements = [
  { symbol: "H",  name: "Hydrogen" },
  { symbol: "He", name: "Helium" },
  { symbol: "Li", name: "Lithium" },
  { symbol: "Be", name: "Beryllium" },
  { symbol: "B",  name: "Boron" },
  { symbol: "C",  name: "Carbon" },
  { symbol: "N",  name: "Nitrogen" },
  { symbol: "O",  name: "Oxygen" },
  { symbol: "F",  name: "Fluorine" },
  { symbol: "Ne", name: "Neon" },
  { symbol: "Na", name: "Sodium" },
  { symbol: "Mg", name: "Magnesium" },
  { symbol: "Al", name: "Aluminium" },
  { symbol: "Si", name: "Silicon" },
  { symbol: "P",  name: "Phosphorus" },
  { symbol: "S",  name: "Sulfur" },
  { symbol: "Cl", name: "Chlorine" },
  { symbol: "Ar", name: "Argon" },
  { symbol: "K",  name: "Potassium" },
  { symbol: "Ca", name: "Calcium" },
  { symbol: "Sc", name: "Scandium" },
  { symbol: "Ti", name: "Titanium" },
  { symbol: "V",  name: "Vanadium" },
  { symbol: "Cr", name: "Chromium" },
  { symbol: "Mn", name: "Manganese" },
  { symbol: "Fe", name: "Iron" },
  { symbol: "Co", name: "Cobalt" },
  { symbol: "Ni", name: "Nickel" },
  { symbol: "Cu", name: "Copper" },
  { symbol: "Zn", name: "Zinc" },
  { symbol: "Ga", name: "Gallium" },
  { symbol: "Ge", name: "Germanium" },
  { symbol: "As", name: "Arsenic" },
  { symbol: "Se", name: "Selenium" },
  { symbol: "Br", name: "Bromine" },
  { symbol: "Kr", name: "Krypton" },
  { symbol: "Rb", name: "Rubidium" },
  { symbol: "Sr", name: "Strontium" },
  { symbol: "Y",  name: "Yttrium" },
  { symbol: "Zr", name: "Zirconium" },
  { symbol: "Nb", name: "Niobium" },
  { symbol: "Mo", name: "Molybdenum" },
  { symbol: "Tc", name: "Technetium" },
  { symbol: "Ru", name: "Ruthenium" },
  { symbol: "Rh", name: "Rhodium" },
  { symbol: "Pd", name: "Palladium" },
  { symbol: "Ag", name: "Silver" },
  { symbol: "Cd", name: "Cadmium" },
  { symbol: "In", name: "Indium" },
  { symbol: "Sn", name: "Tin" },
  { symbol: "Sb", name: "Antimony" },
  { symbol: "Te", name: "Tellurium" },
  { symbol: "I",  name: "Iodine" },
  { symbol: "Xe", name: "Xenon" },
  { symbol: "Cs", name: "Cesium" },
  { symbol: "Ba", name: "Barium" },
  { symbol: "La", name: "Lanthanum" },
  { symbol: "Ce", name: "Cerium" },
  { symbol: "Pr", name: "Praseodymium" },
  { symbol: "Nd", name: "Neodymium" },
  { symbol: "Pm", name: "Promethium" },
  { symbol: "Sm", name: "Samarium" },
  { symbol: "Eu", name: "Europium" },
  { symbol: "Gd", name: "Gadolinium" },
  { symbol: "Tb", name: "Terbium" },
  { symbol: "Dy", name: "Dysprosium" },
  { symbol: "Ho", name: "Holmium" },
  { symbol: "Er", name: "Erbium" },
  { symbol: "Tm", name: "Thulium" },
  { symbol: "Yb", name: "Ytterbium" },
  { symbol: "Lu", name: "Lutetium" },
  { symbol: "Hf", name: "Hafnium" },
  { symbol: "Ta", name: "Tantalum" },
  { symbol: "W",  name: "Tungsten" },
  { symbol: "Re", name: "Rhenium" },
  { symbol: "Os", name: "Osmium" },
  { symbol: "Ir", name: "Iridium" },
  { symbol: "Pt", name: "Platinum" },
  { symbol: "Au", name: "Gold" },
  { symbol: "Hg", name: "Mercury" },
  { symbol: "Tl", name: "Thallium" },
  { symbol: "Pb", name: "Lead" },
  { symbol: "Bi", name: "Bismuth" },
  { symbol: "Po", name: "Polonium" },
  { symbol: "At", name: "Astatine" },
  { symbol: "Rn", name: "Radon" },
  { symbol: "Fr", name: "Francium" },
  { symbol: "Ra", name: "Radium" },
  { symbol: "Ac", name: "Actinium" },
  { symbol: "Th", name: "Thorium" },
  { symbol: "Pa", name: "Protactinium" },
  { symbol: "U",  name: "Uranium" },
  { symbol: "Np", name: "Neptunium" },
  { symbol: "Pu", name: "Plutonium" },
  { symbol: "Am", name: "Americium" },
  { symbol: "Cm", name: "Curium" },
  { symbol: "Bk", name: "Berkelium" },
  { symbol: "Cf", name: "Californium" },
  { symbol: "Es", name: "Einsteinium" },
  { symbol: "Fm", name: "Fermium" },
  { symbol: "Md", name: "Mendelevium" },
  { symbol: "No", name: "Nobelium" },
  { symbol: "Lr", name: "Lawrencium" },
  { symbol: "Rf", name: "Rutherfordium" },
  { symbol: "Db", name: "Dubnium" },
  { symbol: "Sg", name: "Seaborgium" },
  { symbol: "Bh", name: "Bohrium" },
  { symbol: "Hs", name: "Hassium" },
  { symbol: "Mt", name: "Meitnerium" },
  { symbol: "Ds", name: "Darmstadtium" },
  { symbol: "Rg", name: "Roentgenium" },
  { symbol: "Cn", name: "Copernicium" },
  { symbol: "Nh", name: "Nihonium" },
  { symbol: "Fl", name: "Flerovium" },
  { symbol: "Mc", name: "Moscovium" },
  { symbol: "Lv", name: "Livermorium" },
  { symbol: "Ts", name: "Tennessine" },
  { symbol: "Og", name: "Oganesson" }
];

const ultraElements = [
  { symbol: "Vb", name: "Vibrainium" },
  { symbol: "Nv", name: "Neurovium" },
  { symbol: "Sg*", name: "Singulite" }
];

// =====================
// Player model
// =====================
let player = {
  credits: 0,
  elementIndex: 0,
  upgrades: {
    payoutBoost: 0,
    hintChance: 0,
    maxBet: 0,
    cupSpeed: 0
  },
  rebirths: 0,
  totalScore: 0,
  powerupResearch: 0
};

const upgradeDefs = [
  { id: "payoutBoost", name: "Payout Boost", maxLevel: 6, baseCost: 50_000 },
  { id: "hintChance",  name: "Quantum Hint", maxLevel: 4, baseCost: 100_000 },
  { id: "maxBet",      name: "Bet Capacity", maxLevel: 5, baseCost: 75_000 },
  { id: "cupSpeed",    name: "Field Stabilizer", maxLevel: 4, baseCost: 120_000 }
];

function isUltra(index) {
  return index >= periodicElements.length;
}

function getElementData(index) {
  if (index < periodicElements.length) {
    const base = periodicElements[index];
    const mult = 1 + index * 0.05;
    const cost = Math.floor(5_000 * Math.pow(1.12, index));
    return { symbol: base.symbol, name: base.name, multiplier: mult, cost: cost };
  } else {
    const ultraIndex = index - periodicElements.length;
    const base = ultraElements[ultraIndex] || ultraElements[ultraElements.length - 1];
    const mult = 1 + periodicElements.length * 0.05 + (ultraIndex + 1) * 2.5;
    const cost = Math.floor(5_000 * Math.pow(1.12, periodicElements.length) * Math.pow(3, ultraIndex + 1));
    return { symbol: base.symbol, name: base.name, multiplier: mult, cost: cost };
  }
}

function getGlobalMultiplier() {
  const elem = getElementData(player.elementIndex);
  const rebirthMult = 1 + player.rebirths * 0.75;
  return elem.multiplier * rebirthMult;
}

function getWinPayout(base) {
  const payoutLevel = player.upgrades.payoutBoost;
  const payoutMult = 1 + payoutLevel * 0.35;
  return Math.round(base * payoutMult * getGlobalMultiplier());
}

function getMaxBet() {
  const level = player.upgrades.maxBet;
  return [100, 250, 500, 1000, 2500, 5000][level] || 100;
}

function getShuffleSpeed() {
  const level = player.upgrades.cupSpeed;
  return 220 + level * 90;
}

// =====================
// Auth
// =====================
function login() {
  const email = document.getElementById("emailInput").value;
  const pass = document.getElementById("passwordInput").value;
  const msg = document.getElementById("authMessage");
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => msg.textContent = "Logged in.")
    .catch(err => msg.textContent = err.message);
}
function signup() {
  const email = document.getElementById("emailInput").value;
  const pass = document.getElementById("passwordInput").value;
  const msg = document.getElementById("authMessage");
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => msg.textContent = "Account created. You are now logged in.")
    .catch(err => msg.textContent = err.message);
}
window.login = login;
window.signup = signup;

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("welcomeText").textContent = "Operator: " + user.email;
    loadPlayer().then(() => {
      initAtoms();
      renderElements();
      renderUpgrades();
      updateUI();
      loadLeaderboard();
    });
  } else {
    document.getElementById("authBox").style.display = "inline-block";
    document.getElementById("gameContainer").style.display = "none";
  }
});

// =====================
// Save / Load
// =====================
function savePlayer() {
  const user = auth.currentUser;
  if (!user) return;
  db.collection("operators").doc(user.uid).set({
    email: user.email,
    credits: player.credits,
    elementIndex: player.elementIndex,
    upgrades: player.upgrades,
    rebirths: player.rebirths,
    totalScore: player.totalScore,
    powerupResearch: player.powerupResearch,
    updatedAt: Date.now()
  }).then(loadLeaderboard);
}

function loadPlayer() {
  const user = auth.currentUser;
  if (!user) return Promise.resolve();
  return db.collection("operators").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      player.credits = data.credits || 0;
      player.elementIndex = data.elementIndex || 0;
      player.upgrades = data.upgrades || {
        payoutBoost: 0,
        hintChance: 0,
        maxBet: 0,
        cupSpeed: 0
      };
      player.rebirths = data.rebirths || 0;
      player.totalScore = data.totalScore || 0;
      player.powerupResearch = data.powerupResearch || 0;
    } else {
      player.credits = 100;
      player.elementIndex = 0;
      player.upgrades = {
        payoutBoost: 0,
        hintChance: 0,
        maxBet: 0,
        cupSpeed: 0
      };
      player.rebirths = 0;
      player.totalScore = 0;
      player.powerupResearch = 0;
      savePlayer();
    }
  });
}

// =====================
// UI
// =====================
function updateUI() {
  document.getElementById("moneyValue").textContent = player.credits;
  const elem = getElementData(player.elementIndex);
  document.getElementById("elementDisplay").textContent =
    "Element: " + elem.symbol + " (" + elem.name + ") (x" + elem.multiplier.toFixed(1) + ")";
  const rebMult = 1 + player.rebirths * 0.75;
  document.getElementById("rebirthDisplay").textContent =
    "Rebirths: " + player.rebirths + " (x" + rebMult.toFixed(1) + ")";
}

function setMessage(text, isWin) {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = isWin ? "winText" : "loseText";
}

// =====================
// Atoms game
// =====================
let photonIndex = 0;
let roundActive = false;
let betAmount = 10;

function initAtoms() {
  const container = document.getElementById("atoms");
  container.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const atom = document.createElement("div");
    atom.className = "atom";
    atom.dataset.index = i;

    const e1 = document.createElement("div");
    e1.className = "electron e1";
    const e2 = document.createElement("div");
    e2.className = "electron e2";
    const e3 = document.createElement("div");
    e3.className = "electron e3";

    const label = document.createElement("div");
    label.className = "atomLabel";
    label.textContent = "Atom " + (i + 1);

    atom.appendChild(e1);
    atom.appendChild(e2);
    atom.appendChild(e3);
    atom.appendChild(label);

    atom.onclick = () => chooseAtom(i);
    container.appendChild(atom);
  }
}

function startRound() {
  if (!auth.currentUser) return;
  if (roundActive) return;

  betAmount = parseInt(document.getElementById("betInput").value, 10) || 0;
  if (betAmount <= 0) {
    setMessage("Enter a valid bet.", false);
    return;
  }
  const maxBet = getMaxBet();
  if (betAmount > maxBet) {
    setMessage("Max bet at your upgrade level is " + maxBet + ".", false);
    return;
  }
  if (betAmount > player.credits) {
    setMessage("Not enough credits.", false);
    return;
  }

  player.credits -= betAmount;
  updateUI();
  savePlayer();

  photonIndex = Math.floor(Math.random() * 3);
  maybeShowHint(photonIndex);

  const atoms = document.querySelectorAll(".atom");
  atoms.forEach(a => {
    a.classList.remove("win", "lose");
  });

  roundActive = true;
  setMessage("Shuffling orbitals...", false);

  const speed = getShuffleSpeed();
  let swaps = 10;
  let count = 0;

  const interval = setInterval(() => {
    shuffleAtoms();
    count++;
    if (count >= swaps) {
      clearInterval(interval);
      setMessage("Choose an atom.", false);
    }
  }, speed);
}

function shuffleAtoms() {
  const atoms = document.querySelectorAll(".atom");
  atoms.forEach(a => {
    a.classList.add("shuffle");
    setTimeout(() => a.classList.remove("shuffle"), 300);
  });
  const a = Math.floor(Math.random() * 3);
  let b = Math.floor(Math.random() * 3);
  while (b === a) b = Math.floor(Math.random() * 3);
  if (photonIndex === a) photonIndex = b;
  else if (photonIndex === b) photonIndex = a;
}

function chooseAtom(index) {
  if (!roundActive) return;

  const atoms = document.querySelectorAll(".atom");
  atoms.forEach(a => a.classList.remove("win", "lose"));

  if (index === photonIndex) {
    const payout = getWinPayout(betAmount);
    player.credits += payout;
    player.totalScore += payout;
    updateUI();
    savePlayer();
    atoms[index].classList.add("win");
    setMessage("Photon captured! +" + payout + " credits.", true);
  } else {
    atoms[index].classList.add("lose");
    setMessage("Electron strike. Bet lost.", false);
  }

  roundActive = false;
}

// =====================
// Hint
// =====================
function maybeShowHint(correctIndex) {
  const level = player.upgrades.hintChance;
  const chance = [0, 0.03, 0.06, 0.10, 0.15][level] || 0;
  if (Math.random() < chance) {
    const atoms = document.querySelectorAll(".atom");
    const atom = atoms[correctIndex];
    atom.style.boxShadow = "0 0 25px #ffea00";
    setTimeout(() => {
      atom.style.boxShadow = "0 20px 40px rgba(0,0,0,0.8)";
    }, 700);
  }
}

// =====================
// Upgrades
// =====================
function renderUpgrades() {
  const list = document.getElementById("upgradeList");
  list.innerHTML = "";
  upgradeDefs.forEach(def => {
    const level = player.upgrades[def.id] || 0;
    const maxed = level >= def.maxLevel;
    const cost = getUpgradeCost(def, level);
    const btn = document.createElement("button");
    let label = def.name + " (Lv " + level + "/" + def.maxLevel + ")";
    if (!maxed) label += " — Next: " + cost + " credits";
    else label += " — MAXED";
    btn.textContent = label;
    btn.onclick = () => buyUpgrade(def.id);
    list.appendChild(btn);
  });
}

function getUpgradeCost(def, level) {
  return Math.floor(def.baseCost * Math.pow(2.2, level));
}

function buyUpgrade(id) {
  const def = upgradeDefs.find(u => u.id === id);
  const level = player.upgrades[id];
  if (level >= def.maxLevel) {
    alert("Max level reached.");
    return;
  }
  const cost = getUpgradeCost(def, level);
  if (player.credits < cost) {
    alert("Not enough credits.");
    return;
  }
  player.credits -= cost;
  player.upgrades[id] += 1;
  savePlayer();
  updateUI();
  renderUpgrades();
}

// =====================
// Elements + Rebirth
// =====================
function renderElements() {
  const list = document.getElementById("elementList");
  list.innerHTML = "";

  const maxIndex = periodicElements.length - 1;
  const current = player.elementIndex;

  for (let i = current; i < Math.min(current + 5, periodicElements.length); i++) {
    const data = getElementData(i);
    const btn = document.createElement("button");
    let label = data.symbol + " — " + data.name +
      " — cost " + data.cost + " — x" + data.multiplier.toFixed(1);
    if (i === current) label += " [Current]";
    btn.textContent = label;
    btn.onclick = () => upgradeElement(i);
    list.appendChild(btn);
  }

  if (current >= maxIndex) {
    const ultraStart = periodicElements.length;
    for (let j = 0; j < ultraElements.length; j++) {
      const idx = ultraStart + j;
      const data = getElementData(idx);
      const btn = document.createElement("button");
      let label = data.symbol + " — " + data.name +
        " — cost " + data.cost + " — x" + data.multiplier.toFixed(1);
      if (idx === current) label += " [Current]";
      btn.textContent = label;
      btn.onclick = () => upgradeElement(idx);
      list.appendChild(btn);
    }
  }
}

function upgradeElement(targetIndex) {
  if (targetIndex <= player.elementIndex) return;

  if (isUltra(targetIndex) && player.rebirths < 1) {
    alert("Ultra elements require at least 1 rebirth.");
    return;
  }

  const data = getElementData(targetIndex);
  if (player.credits < data.cost) {
    alert("Not enough credits.");
    return;
  }
  player.credits -= data.cost;
  player.elementIndex = targetIndex;
  savePlayer();
  updateUI();
  renderElements();
}

function canRebirth() {
  return player.elementIndex >= periodicElements.length - 1;
}

function rebirth() {
  if (!canRebirth()) {
    alert("You must unlock all 118 elements before rebirthing.");
    return;
  }
  if (!confirm("Rebirth resets credits, element, and upgrades but gives a permanent multiplier and unlocks ultra elements. Continue?")) return;

  player.rebirths += 1;
  player.credits = 0;
  player.elementIndex = 0;
  player.upgrades = {
    payoutBoost: 0,
    hintChance: 0,
    maxBet: 0,
    cupSpeed: 0
  };
  player.powerupResearch = 0;
  savePlayer();
  updateUI();
  renderUpgrades();
  renderElements();
}
window.rebirth = rebirth;

// =====================
// Chemistry questions
// =====================
const chemQuestions = [
  { q: "What is the chemical symbol for Helium?", a: "He" },
  { q: "How many protons does Oxygen have?", a: "8" },
  { q: "What is the chemical formula for water?", a: "H2O" },
  { q: "What is the pH of pure water?", a: "7" },
  { q: "What type of bond shares electrons?", a: "Covalent" },
  { q: "What is the SI unit for amount of substance?", a: "Mole" },
  { q: "What is the chemical symbol for Sodium?", a: "Na" },
  { q: "What is the term for a negatively charged ion?", a: "Anion" },
  { q: "What is the term for a positively charged ion?", a: "Cation" },
  { q: "What is the chemical formula for methane?", a: "CH4" },
  { q: "What is the chemical formula for ammonia?", a: "NH3" }
];

let currentChemIndex = null;

function newChemQuestion() {
  currentChemIndex = Math.floor(Math.random() * chemQuestions.length);
  document.getElementById("quizQuestion").textContent =
    chemQuestions[currentChemIndex].q;
  document.getElementById("quizAnswer").value = "";
  document.getElementById("quizFeedback").textContent = "";
}
window.newChemQuestion = newChemQuestion;

function submitChemAnswer() {
  if (currentChemIndex === null) {
    document.getElementById("quizFeedback").textContent =
      "Press New Question first.";
    return;
  }
  const userAns = document.getElementById("quizAnswer").value.trim();
  const correct = chemQuestions[currentChemIndex].a.trim();
  const baseReward = 2000;
  const reward = Math.round(baseReward * getGlobalMultiplier());

  if (userAns.toLowerCase() === correct.toLowerCase()) {
    player.credits += reward;
    player.totalScore += reward;
    player.powerupResearch += 1;
    let msg = "Correct. +" + reward + " credits. Research level: " + player.powerupResearch;
    if (player.powerupResearch % 3 === 0) {
      player.upgrades.hintChance = Math.min(
        player.upgrades.hintChance + 1,
        upgradeDefs.find(u => u.id === "hintChance").maxLevel
      );
      msg += " | Quantum Hint improved!";
      renderUpgrades();
    }
    document.getElementById("quizFeedback").textContent = msg;
    savePlayer();
    updateUI();
  } else {
    const penalty = Math.round(reward * 0.4);
    player.credits = Math.max(0, player.credits - penalty);
    document.getElementById("quizFeedback").textContent =
      "Incorrect. Correct answer: " + correct + ". Penalty: -" + penalty + " credits.";
    savePlayer();
    updateUI();
  }
  currentChemIndex = null;
}
window.submitChemAnswer = submitChemAnswer;

// =====================
// Leaderboard
// =====================
function loadLeaderboard() {
  db.collection("operators")
    .orderBy("totalScore", "desc")
    .limit(10)
    .get()
    .then(snap => {
      const list = document.getElementById("leaderboardList");
      list.innerHTML = "";
      let rank = 1;
      snap.forEach(doc => {
        const d = doc.data();
        const li = document.createElement("li");
        li.innerHTML =
          `<span>${rank}. ${d.email || "Operator"}</span>` +
          `<span>${d.totalScore || 0}</span>`;
        list.appendChild(li);
        rank++;
      });
    });
}

// =====================
// Admin
// =====================
function adminLogin() {
  const parts = ["UXVhbnR1bQ==", "QWRtaW4="];
  const real = atob(parts.join(""));
  const attempt = prompt("Admin password:");
  if (attempt === real) {
    document.getElementById("adminMenu").style.display = "block";
  } else if (attempt !== null) {
    alert("Access denied.");
  }
}
window.adminLogin = adminLogin;

function adminSetPlayerData() {
  const email = document.getElementById("adminTargetEmail").value.trim();
  const newCredits = parseInt(document.getElementById("adminTargetCredits").value, 10);
  const newElementIndex = parseInt(document.getElementById("adminTargetElement").value, 10);
  const newRebirths = parseInt(document.getElementById("adminTargetRebirths").value, 10);
  const upgradesJson = document.getElementById("adminTargetUpgrades").value.trim();

  if (!email) {
    alert("Enter an email.");
    return;
  }

  db.collection("operators").where("email", "==", email).get()
    .then(snap => {
      if (snap.empty) {
        alert("No operator found with that email.");
        return;
      }
      const batch = db.batch();
      snap.forEach(docSnap => {
        const ref = docSnap.ref;
        const data = docSnap.data();
        let newUpgrades = data.upgrades || player.upgrades;
        if (upgradesJson) {
          try {
            const parsed = JSON.parse(upgradesJson);
            newUpgrades = parsed;
          } catch (e) {
            alert("Invalid upgrades JSON. Ignoring upgrades change.");
          }
        }
        batch.set(ref, Object.assign({}, data, {
          credits: isFinite(newCredits) ? newCredits : data.credits,
          elementIndex: isFinite(newElementIndex) ? newElementIndex : data.elementIndex || 0,
          rebirths: isFinite(newRebirths) ? newRebirths : data.rebirths || 0,
          upgrades: newUpgrades,
          updatedAt: Date.now()
        }));
      });
      return batch.commit();
    })
    .then(() => {
      alert("Player updated.");
      loadLeaderboard();
    })
    .catch(err => {
      console.error(err);
      alert("Error updating player.");
    });
}
window.adminSetPlayerData = adminSetPlayerData;
