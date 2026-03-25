// game.js - Quantum Cups Atomic Edition
// Replace firebaseConfig with your real Firebase project config.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const OPERATORS_COLLECTION = "operators";

// Admin password: "GreenOrange"
// Simple hash so the raw string isn't sitting in one obvious place.
const ADMIN_PASSWORD_HASH = 1101; // sum of char codes of "GreenOrange"

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h += str.charCodeAt(i);
  return h;
}

/* Firebase init */
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* Periodic table (118) + ultra */
const periodicElements = [
  { symbol: "H",  name: "Hydrogen" },{ symbol: "He", name: "Helium" },
  { symbol: "Li", name: "Lithium" },{ symbol: "Be", name: "Beryllium" },
  { symbol: "B",  name: "Boron" },{ symbol: "C",  name: "Carbon" },
  { symbol: "N",  name: "Nitrogen" },{ symbol: "O",  name: "Oxygen" },
  { symbol: "F",  name: "Fluorine" },{ symbol: "Ne", name: "Neon" },
  { symbol: "Na", name: "Sodium" },{ symbol: "Mg", name: "Magnesium" },
  { symbol: "Al", name: "Aluminium" },{ symbol: "Si", name: "Silicon" },
  { symbol: "P",  name: "Phosphorus" },{ symbol: "S",  name: "Sulfur" },
  { symbol: "Cl", name: "Chlorine" },{ symbol: "Ar", name: "Argon" },
  { symbol: "K",  name: "Potassium" },{ symbol: "Ca", name: "Calcium" },
  { symbol: "Sc", name: "Scandium" },{ symbol: "Ti", name: "Titanium" },
  { symbol: "V",  name: "Vanadium" },{ symbol: "Cr", name: "Chromium" },
  { symbol: "Mn", name: "Manganese" },{ symbol: "Fe", name: "Iron" },
  { symbol: "Co", name: "Cobalt" },{ symbol: "Ni", name: "Nickel" },
  { symbol: "Cu", name: "Copper" },{ symbol: "Zn", name: "Zinc" },
  { symbol: "Ga", name: "Gallium" },{ symbol: "Ge", name: "Germanium" },
  { symbol: "As", name: "Arsenic" },{ symbol: "Se", name: "Selenium" },
  { symbol: "Br", name: "Bromine" },{ symbol: "Kr", name: "Krypton" },
  { symbol: "Rb", name: "Rubidium" },{ symbol: "Sr", name: "Strontium" },
  { symbol: "Y",  name: "Yttrium" },{ symbol: "Zr", name: "Zirconium" },
  { symbol: "Nb", name: "Niobium" },{ symbol: "Mo", name: "Molybdenum" },
  { symbol: "Tc", name: "Technetium" },{ symbol: "Ru", name: "Ruthenium" },
  { symbol: "Rh", name: "Rhodium" },{ symbol: "Pd", name: "Palladium" },
  { symbol: "Ag", name: "Silver" },{ symbol: "Cd", name: "Cadmium" },
  { symbol: "In", name: "Indium" },{ symbol: "Sn", name: "Tin" },
  { symbol: "Sb", name: "Antimony" },{ symbol: "Te", name: "Tellurium" },
  { symbol: "I",  name: "Iodine" },{ symbol: "Xe", name: "Xenon" },
  { symbol: "Cs", name: "Cesium" },{ symbol: "Ba", name: "Barium" },
  { symbol: "La", name: "Lanthanum" },{ symbol: "Ce", name: "Cerium" },
  { symbol: "Pr", name: "Praseodymium" },{ symbol: "Nd", name: "Neodymium" },
  { symbol: "Pm", name: "Promethium" },{ symbol: "Sm", name: "Samarium" },
  { symbol: "Eu", name: "Europium" },{ symbol: "Gd", name: "Gadolinium" },
  { symbol: "Tb", name: "Terbium" },{ symbol: "Dy", name: "Dysprosium" },
  { symbol: "Ho", name: "Holmium" },{ symbol: "Er", name: "Erbium" },
  { symbol: "Tm", name: "Thulium" },{ symbol: "Yb", name: "Ytterbium" },
  { symbol: "Lu", name: "Lutetium" },{ symbol: "Hf", name: "Hafnium" },
  { symbol: "Ta", name: "Tantalum" },{ symbol: "W",  name: "Tungsten" },
  { symbol: "Re", name: "Rhenium" },{ symbol: "Os", name: "Osmium" },
  { symbol: "Ir", name: "Iridium" },{ symbol: "Pt", name: "Platinum" },
  { symbol: "Au", name: "Gold" },{ symbol: "Hg", name: "Mercury" },
  { symbol: "Tl", name: "Thallium" },{ symbol: "Pb", name: "Lead" },
  { symbol: "Bi", name: "Bismuth" },{ symbol: "Po", name: "Polonium" },
  { symbol: "At", name: "Astatine" },{ symbol: "Rn", name: "Radon" },
  { symbol: "Fr", name: "Francium" },{ symbol: "Ra", name: "Radium" },
  { symbol: "Ac", name: "Actinium" },{ symbol: "Th", name: "Thorium" },
  { symbol: "Pa", name: "Protactinium" },{ symbol: "U",  name: "Uranium" },
  { symbol: "Np", name: "Neptunium" },{ symbol: "Pu", name: "Plutonium" },
  { symbol: "Am", name: "Americium" },{ symbol: "Cm", name: "Curium" },
  { symbol: "Bk", name: "Berkelium" },{ symbol: "Cf", name: "Californium" },
  { symbol: "Es", name: "Einsteinium" },{ symbol: "Fm", name: "Fermium" },
  { symbol: "Md", name: "Mendelevium" },{ symbol: "No", name: "Nobelium" },
  { symbol: "Lr", name: "Lawrencium" },{ symbol: "Rf", name: "Rutherfordium" },
  { symbol: "Db", name: "Dubnium" },{ symbol: "Sg", name: "Seaborgium" },
  { symbol: "Bh", name: "Bohrium" },{ symbol: "Hs", name: "Hassium" },
  { symbol: "Mt", name: "Meitnerium" },{ symbol: "Ds", name: "Darmstadtium" },
  { symbol: "Rg", name: "Roentgenium" },{ symbol: "Cn", name: "Copernicium" },
  { symbol: "Nh", name: "Nihonium" },{ symbol: "Fl", name: "Flerovium" },
  { symbol: "Mc", name: "Moscovium" },{ symbol: "Lv", name: "Livermorium" },
  { symbol: "Ts", name: "Tennessine" },{ symbol: "Og", name: "Oganesson" }
];

const ultraElements = [
  { symbol: "Vb", name: "Vibrainium" },
  { symbol: "Nv", name: "Neurovium" },
  { symbol: "Sg*", name: "Singulite" }
];

/* Player model */
let player = {
  email: null,
  credits: 100,
  elementIndex: 0,
  upgrades: { payoutBoost: 0, hintChance: 0, maxBet: 0, cupSpeed: 0 },
  rebirths: 0,
  totalScore: 0,
  powerupResearch: 0,
  powerups: { burst: 0, shield: 0, peek: 0 }
};

/* Upgrades */
const upgradeDefs = [
  { id: "payoutBoost", name: "Payout Boost", maxLevel: 6, baseCost: 50000 },
  { id: "hintChance",  name: "Quantum Hint", maxLevel: 4, baseCost: 100000 },
  { id: "maxBet",      name: "Bet Capacity", maxLevel: 5, baseCost: 75000 },
  { id: "cupSpeed",    name: "Field Stabilizer", maxLevel: 4, baseCost: 120000 }
];

function getUpgradeCost(def, level) {
  return Math.floor(def.baseCost * Math.pow(2.2, level));
}

/* Element math */
function isUltra(index) {
  return index >= periodicElements.length;
}

function getElementData(index) {
  if (index < periodicElements.length) {
    const base = periodicElements[index];
    const mult = 1 + index * 0.05;
    const cost = Math.floor(5000 * Math.pow(1.12, index));
    return { symbol: base.symbol, name: base.name, multiplier: mult, cost };
  } else {
    const ultraIndex = index - periodicElements.length;
    const base = ultraElements[ultraIndex] || ultraElements[ultraElements.length - 1];
    const mult = 1 + periodicElements.length * 0.05 + (ultraIndex + 1) * 2.5;
    const cost = Math.floor(5000 * Math.pow(1.12, periodicElements.length) * Math.pow(3, ultraIndex + 1));
    return { symbol: base.symbol, name: base.name, multiplier: mult, cost };
  }
}

function getGlobalMultiplier() {
  const elem = getElementData(player.elementIndex);
  const rebirthMult = 1 + player.rebirths * 0.75;
  const payoutBoost = 1 + (player.upgrades.payoutBoost || 0) * 0.35;
  return elem.multiplier * rebirthMult * payoutBoost;
}

function getWinPayout(base) {
  let payout = Math.round(base * getGlobalMultiplier());
  if (player._burstActive) {
    payout *= 2;
    player._burstActive = false;
  }
  return payout;
}

/* Auth */
function signup() {
  const email = document.getElementById("emailInput").value.trim();
  const pass = document.getElementById("passwordInput").value;
  const msg = document.getElementById("authMessage");
  if (!email || !pass) { msg.textContent = "Enter email and password."; return; }
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => msg.textContent = "Account created. Logging in...")
    .catch(err => msg.textContent = err.message);
}
function login() {
  const email = document.getElementById("emailInput").value.trim();
  const pass = document.getElementById("passwordInput").value;
  const msg = document.getElementById("authMessage");
  if (!email || !pass) { msg.textContent = "Enter email and password."; return; }
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => msg.textContent = "Logged in.")
    .catch(err => msg.textContent = err.message);
}
window.signup = signup;
window.login = login;

let leaderboardUnsub = null;

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("welcomeText").textContent = "Operator: " + user.email;
    loadPlayerFromFirestore(user).then(() => {
      initAtoms();
      renderElements();
      renderUpgrades();
      updateUI();
      subscribeLeaderboard();
    });
  } else {
    document.getElementById("authBox").style.display = "inline-block";
    document.getElementById("gameContainer").style.display = "none";
    if (leaderboardUnsub) { leaderboardUnsub(); leaderboardUnsub = null; }
  }
});

/* Firestore persistence */
function savePlayerToFirestore() {
  const user = auth.currentUser;
  if (!user) return Promise.resolve();
  const docRef = db.collection(OPERATORS_COLLECTION).doc(user.uid);
  return docRef.set({
    email: user.email,
    credits: player.credits,
    elementIndex: player.elementIndex,
    upgrades: player.upgrades,
    rebirths: player.rebirths,
    totalScore: player.totalScore,
    powerupResearch: player.powerupResearch,
    powerups: player.powerups,
    updatedAt: Date.now()
  }, { merge: true });
}

function loadPlayerFromFirestore(user) {
  const docRef = db.collection(OPERATORS_COLLECTION).doc(user.uid);
  return docRef.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      player.email = user.email;
      player.credits = data.credits || 100;
      player.elementIndex = data.elementIndex || 0;
      player.upgrades = data.upgrades || { payoutBoost: 0, hintChance: 0, maxBet: 0, cupSpeed: 0 };
      player.rebirths = data.rebirths || 0;
      player.totalScore = data.totalScore || 0;
      player.powerupResearch = data.powerupResearch || 0;
      player.powerups = data.powerups || { burst: 0, shield: 0, peek: 0 };
    } else {
      player.email = user.email;
      player.credits = 100;
      player.elementIndex = 0;
      player.upgrades = { payoutBoost: 0, hintChance: 0, maxBet: 0, cupSpeed: 0 };
      player.rebirths = 0;
      player.totalScore = 0;
      player.powerupResearch = 0;
      player.powerups = { burst: 0, shield: 0, peek: 0 };
      return docRef.set({
        email: user.email,
        credits: player.credits,
        elementIndex: player.elementIndex,
        upgrades: player.upgrades,
        rebirths: player.rebirths,
        totalScore: player.totalScore,
        powerupResearch: player.powerupResearch,
        powerups: player.powerups,
        updatedAt: Date.now()
      });
    }
  });
}

/* UI helpers */
function updateUI() {
  document.getElementById("moneyValue").textContent = player.credits;
  const elem = getElementData(player.elementIndex);
  document.getElementById("elementDisplay").textContent =
    `Element: ${elem.symbol} (${elem.name}) (x${elem.multiplier.toFixed(1)})`;
  const rebMult = 1 + player.rebirths * 0.75;
  document.getElementById("rebirthDisplay").textContent =
    `Rebirths: ${player.rebirths} (x${rebMult.toFixed(1)})`;

  // Set per-element visuals
  document.body.setAttribute("data-element", elem.symbol);

  renderElements();
  renderUpgrades();
  updatePowerupUI();
}

function setMessage(text, type) {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = type === "win" ? "message winText" :
                 type === "lose" ? "message loseText" : "message";
}

/* Atoms core loop */
let photonIndex = 0;
let electronIndex = 1;
let roundActive = false;
let peekActive = false;

function initAtoms() {
  const container = document.getElementById("atoms");
  container.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const atom = document.createElement("div");
    atom.className = "atom";
    atom.dataset.index = i;

    const e1 = document.createElement("div"); e1.className = "electron e1";
    const e2 = document.createElement("div"); e2.className = "electron e2";
    const e3 = document.createElement("div"); e3.className = "electron e3";

    const label = document.createElement("div"); label.className = "atomLabel";
    label.textContent = "Atom " + (i + 1);

    atom.appendChild(e1); atom.appendChild(e2); atom.appendChild(e3); atom.appendChild(label);
    atom.onclick = () => chooseAtom(i);
    container.appendChild(atom);
  }
}

function startRound() {
  if (roundActive) return;

  photonIndex = Math.floor(Math.random() * 3);
  do { electronIndex = Math.floor(Math.random() * 3); } while (electronIndex === photonIndex);

  const atoms = document.querySelectorAll(".atom");
  atoms.forEach(a => {
    a.classList.remove("win", "lose", "shuffle");
    a.style.boxShadow = "0 20px 40px rgba(0,0,0,0.9)";
  });

  roundActive = true;
  setMessage("Shuffling orbitals...", null);

  const speed = Math.max(80, 300 - (player.upgrades.cupSpeed || 0) * 60);
  let swaps = 10;
  let count = 0;
  const interval = setInterval(() => {
    shuffleAtoms();
    count++;
    if (count >= swaps) {
      clearInterval(interval);
      setMessage("Choose an atom.", null);
      if (peekActive) {
        highlightPhoton();
        peekActive = false;
      } else {
        maybeShowHint();
      }
    }
  }, speed);
}
window.startRound = startRound;

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

  if (electronIndex === a) electronIndex = b;
  else if (electronIndex === b) electronIndex = a;
}

function chooseAtom(index) {
  if (!roundActive) return;
  const atoms = document.querySelectorAll(".atom");
  atoms.forEach(a => a.classList.remove("win", "lose"));

  const base = 10;
  const amount = getWinPayout(base);

  if (index === photonIndex) {
    player.credits += amount;
    player.totalScore += amount;
    atoms[index].classList.add("win");
    setMessage(`Photon captured! +${amount} credits.`, "win");
  } else if (index === electronIndex) {
    if ((player.powerups.shield || 0) > 0) {
      player.powerups.shield--;
      setMessage("Electron blocked by shield. No loss.", "win");
    } else {
      player.credits = Math.max(0, player.credits - amount);
      atoms[index].classList.add("lose");
      setMessage(`Electron strike. -${amount} credits.`, "lose");
    }
  } else {
    setMessage("Empty atom. No change.", null);
  }

  roundActive = false;
  savePlayerToFirestore().then(updateUI);
}

/* Hints & powerups */
function maybeShowHint() {
  const level = player.upgrades.hintChance || 0;
  const chance = [0, 0.03, 0.06, 0.10, 0.15][level] || 0;
  if (Math.random() < chance) highlightPhoton();
}

function highlightPhoton() {
  const atoms = document.querySelectorAll(".atom");
  const atom = atoms[photonIndex];
  atom.style.boxShadow = "0 0 25px #ffea00";
  setTimeout(() => {
    atom.style.boxShadow = "0 20px 40px rgba(0,0,0,0.9)";
  }, 800);
}

function updatePowerupUI() {
  const btnBurst = document.getElementById("btnBurst");
  const btnShield = document.getElementById("btnShield");
  const btnPeek = document.getElementById("btnPeek");
  if (btnBurst) btnBurst.disabled = (player.powerups.burst || 0) <= 0;
  if (btnShield) btnShield.disabled = (player.powerups.shield || 0) <= 0;
  if (btnPeek) btnPeek.disabled = (player.powerups.peek || 0) <= 0;
  const el = document.getElementById("powerupCounts");
  if (el) el.textContent =
    `Burst: ${player.powerups.burst || 0} | Shield: ${player.powerups.shield || 0} | Peek: ${player.powerups.peek || 0}`;
}

function useBurst() {
  if ((player.powerups.burst || 0) <= 0) return;
  player.powerups.burst--;
  player._burstActive = true;
  setMessage("Photon Burst armed: next photon gives double payout.", "win");
  savePlayerToFirestore().then(updatePowerupUI);
}
window.useBurst = useBurst;

function useShield() {
  if ((player.powerups.shield || 0) <= 0) return;
  setMessage("Electron Shield armed: next electron will be ignored.", "win");
}
window.useShield = useShield;

function usePeek() {
  if ((player.powerups.peek || 0) <= 0) return;
  player.powerups.peek--;
  peekActive = true;
  setMessage("Quantum Peek armed: photon will be revealed after shuffle.", "win");
  savePlayerToFirestore().then(updatePowerupUI);
}
window.usePeek = usePeek;

/* Upgrades & elements UI */
function renderUpgrades() {
  const list = document.getElementById("upgradeList");
  if (!list) return;
  list.innerHTML = "";
  upgradeDefs.forEach(def => {
    const level = player.upgrades[def.id] || 0;
    const maxed = level >= def.maxLevel;
    const cost = getUpgradeCost(def, level);
    const btn = document.createElement("button");
    let label = `${def.name} (Lv ${level}/${def.maxLevel})`;
    if (!maxed) label += ` — Next: ${cost} credits`;
    else label += " — MAXED";
    btn.textContent = label;
    btn.onclick = () => buyUpgrade(def.id);
    list.appendChild(btn);
  });
}

function buyUpgrade(id) {
  const def = upgradeDefs.find(u => u.id === id);
  const level = player.upgrades[id] || 0;
  if (level >= def.maxLevel) { alert("Max level reached."); return; }
  const cost = getUpgradeCost(def, level);
  if (player.credits < cost) { alert("Not enough credits."); return; }
  player.credits -= cost;
  player.upgrades[id] = level + 1;
  savePlayerToFirestore().then(updateUI);
}

/* Elements */
function renderElements() {
  const list = document.getElementById("elementList");
  if (!list) return;
  list.innerHTML = "";
  const current = player.elementIndex;

  for (let i = current; i < Math.min(current + 6, periodicElements.length); i++) {
    const data = getElementData(i);
    const btn = document.createElement("button");
    let label = `${data.symbol} — ${data.name} — cost ${data.cost} — x${data.multiplier.toFixed(1)}`;
    if (i === current) label += " [Current]";
    btn.textContent = label;
    btn.onclick = () => upgradeElement(i);
    list.appendChild(btn);
  }

  if (current >= periodicElements.length - 1) {
    const ultraStart = periodicElements.length;
    for (let j = 0; j < ultraElements.length; j++) {
      const idx = ultraStart + j;
      const data = getElementData(idx);
      const btn = document.createElement("button");
      let label = `${data.symbol} — ${data.name} — cost ${data.cost} — x${data.multiplier.toFixed(1)}`;
      if (idx === current) label += " [Current]";
      btn.textContent = label;
      btn.onclick = () => upgradeElement(idx);
      list.appendChild(btn);
    }
  }
}

function upgradeElement(targetIndex) {
  if (targetIndex <= player.elementIndex) return;
  if (targetIndex !== player.elementIndex + 1) {
    alert("Elements must be unlocked sequentially. Buy the next element in order.");
    return;
  }
  if (isUltra(targetIndex)) {
    const ultraIndex = targetIndex - periodicElements.length;
    if (player.rebirths < ultraIndex + 1) {
      alert("This ultra element requires more rebirths to unlock.");
      return;
    }
  }
  const data = getElementData(targetIndex);
  if (player.credits < data.cost) { alert("Not enough credits."); return; }
  player.credits -= data.cost;
  player.elementIndex = targetIndex;
  savePlayerToFirestore().then(updateUI);
}

/* Rebirth */
function attemptRebirth() {
  if (player.elementIndex < periodicElements.length - 1) {
    alert("You must unlock all 118 elements before rebirthing.");
    return;
  }
  if (!confirm("Rebirth resets credits, element, and upgrades but grants a permanent multiplier and unlocks ultra elements. Continue?")) return;
  player.rebirths += 1;
  player.credits = 100;
  player.elementIndex = 0;
  player.upgrades = { payoutBoost: 0, hintChance: 0, maxBet: 0, cupSpeed: 0 };
  player.powerupResearch = 0;
  player.powerups = { burst: 0, shield: 0, peek: 0 };
  savePlayerToFirestore().then(updateUI);
}
window.attemptRebirth = attemptRebirth;

/* Chemistry questions */
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
  { q: "What is the chemical formula for ammonia?", a: "NH3" },
  { q: "What is the common name for sodium chloride?", a: "Salt" },
  { q: "What gas do plants produce during photosynthesis?", a: "Oxygen" },
  { q: "What is the chemical symbol for Gold?", a: "Au" },
  { q: "What is the chemical symbol for Silver?", a: "Ag" },
  { q: "What is the main component of natural gas?", a: "Methane" },
  { q: "What is the chemical formula for carbon dioxide?", a: "CO2" },
  { q: "What is the name for HCl in water?", a: "Hydrochloric acid" },
  { q: "What is the atomic number of Hydrogen?", a: "1" },
  { q: "What is the atomic number of Carbon?", a: "6" },
  { q: "What is the chemical symbol for Iron?", a: "Fe" },
  { q: "What is the chemical symbol for Lead?", a: "Pb" },
  { q: "What is the chemical symbol for Mercury?", a: "Hg" },
  { q: "What is the chemical formula for table sugar (sucrose)?", a: "C12H22O11" },
  { q: "What is the name of the process where liquid becomes gas?", a: "Evaporation" },
  { q: "What is the pH range of acids?", a: "0-6" },
  { q: "What is the pH range of bases?", a: "8-14" },
  { q: "What is the chemical symbol for Potassium?", a: "K" },
  { q: "What is the chemical symbol for Calcium?", a: "Ca" },
  { q: "What is the chemical symbol for Chlorine?", a: "Cl" }
];

let currentChemIndex = null;

function newChemQuestion() {
  currentChemIndex = Math.floor(Math.random() * chemQuestions.length);
  document.getElementById("quizQuestion").textContent = chemQuestions[currentChemIndex].q;
  document.getElementById("quizAnswer").value = "";
  document.getElementById("quizFeedback").textContent = "";
}
window.newChemQuestion = newChemQuestion;

function submitChemAnswer() {
  if (currentChemIndex === null) {
    document.getElementById("quizFeedback").textContent = "Press New Question first.";
    return;
  }
  const userAns = document.getElementById("quizAnswer").value.trim();
  const correct = chemQuestions[currentChemIndex].a.trim();
  const baseReward = 2000;
  const reward = Math.round(baseReward * getGlobalMultiplier());

  if (userAns.toLowerCase() === correct.toLowerCase()) {
    player.credits += reward;
    player.totalScore += reward;
    player.powerupResearch = (player.powerupResearch || 0) + 1;
    let msg = `Correct. +${reward} credits. Research level: ${player.powerupResearch}.`;
    if (player.powerupResearch % 3 === 0) {
      const which = (player.powerupResearch / 3) % 3;
      if (which === 0) { player.powerups.burst = (player.powerups.burst || 0) + 1; msg += " | Photon Burst +1"; }
      else if (which === 1) { player.powerups.shield = (player.powerups.shield || 0) + 1; msg += " | Electron Shield +1"; }
      else { player.powerups.peek = (player.powerups.peek || 0) + 1; msg += " | Quantum Peek +1"; }
    }
    document.getElementById("quizFeedback").textContent = msg;
  } else {
    const penalty = Math.round(reward * 0.4);
    player.credits = Math.max(0, player.credits - penalty);
    document.getElementById("quizFeedback").textContent =
      `Incorrect. Correct: ${correct}. Penalty: -${penalty} credits.`;
  }

  currentChemIndex = null;
  savePlayerToFirestore().then(updateUI);
}
window.submitChemAnswer = submitChemAnswer;

/* Leaderboard with snapshot listener */
function subscribeLeaderboard() {
  if (leaderboardUnsub) leaderboardUnsub();
  leaderboardUnsub = db.collection(OPERATORS_COLLECTION)
    .orderBy("totalScore", "desc")
    .limit(10)
    .onSnapshot(snap => {
      const list = document.getElementById("leaderboardList");
      list.innerHTML = "";
      let rank = 1;
      snap.forEach(doc => {
        const d = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<span>${rank}. ${d.email || "Operator"}</span><span>${d.totalScore || 0}</span>`;
        list.appendChild(li);
        rank++;
      });
    });
}

/* Admin (password: GreenOrange) */
function openAdmin() {
  const pwd = prompt("Enter admin password:");
  if (!pwd) return;
  if (simpleHash(pwd) !== ADMIN_PASSWORD_HASH) {
    alert("Incorrect admin password.");
    return;
  }
  document.getElementById("adminMenu").style.display = "block";
}
window.openAdmin = openAdmin;

function adminSetPlayerData() {
  const email = document.getElementById("adminTargetEmail").value.trim();
  const newCredits = parseInt(document.getElementById("adminTargetCredits").value, 10);
  const newElementIndex = parseInt(document.getElementById("adminTargetElement").value, 10);
  const newRebirths = parseInt(document.getElementById("adminTargetRebirths").value, 10);
  const upgradesJson = document.getElementById("adminTargetUpgrades").value.trim();

  if (!email) { alert("Enter an email."); return; }

  db.collection(OPERATORS_COLLECTION).where("email", "==", email).get()
    .then(snap => {
      if (snap.empty) { alert("No operator found with that email."); return; }
      const batch = db.batch();
      snap.forEach(docSnap => {
        const ref = docSnap.ref;
        const data = docSnap.data();
        let newUpgrades = data.upgrades || player.upgrades;
        if (upgradesJson) {
          try { newUpgrades = JSON.parse(upgradesJson); } catch (e) { alert("Invalid upgrades JSON. Ignoring upgrades change."); }
        }
        batch.set(ref, Object.assign({}, data, {
          credits: isFinite(newCredits) ? newCredits : data.credits,
          elementIndex: isFinite(newElementIndex) ? newElementIndex : (data.elementIndex || 0),
          rebirths: isFinite(newRebirths) ? newRebirths : (data.rebirths || 0),
          upgrades: newUpgrades,
          updatedAt: Date.now()
        }));
      });
      return batch.commit();
    })
    .then(() => { alert("Player updated."); })
    .catch(err => { console.error(err); alert("Error updating player."); });
}
window.adminSetPlayerData = adminSetPlayerData;

/* Expose some helpers if needed */
window.renderElements = renderElements;
window.renderUpgrades = renderUpgrades;
window.updateUI = updateUI;
