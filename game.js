let money = 10;
let photonIndex = 0;
let electronIndex = 1;
let hintActive = false;

let shield = false;
let doublePhoton = false;
let electronVoid = false;
let swapAvailable = false;
let swapFirst = null;

let pendingPowerup = null;

const elementData = [
    ["H","Hydrogen",1],["He","Helium",2],["Li","Lithium",3],["Be","Beryllium",4],
    ["B","Boron",5],["C","Carbon",6],["N","Nitrogen",7],["O","Oxygen",8],
    ["F","Fluorine",9],["Ne","Neon",10],["Na","Sodium",11],["Mg","Magnesium",12],
    ["Al","Aluminum",13],["Si","Silicon",14],["P","Phosphorus",15],["S","Sulfur",16],
    ["Cl","Chlorine",17],["Ar","Argon",18],["K","Potassium",19],["Ca","Calcium",20],
    ["Sc","Scandium",21],["Ti","Titanium",22],["V","Vanadium",23],["Cr","Chromium",24],
    ["Mn","Manganese",25],["Fe","Iron",26],["Co","Cobalt",27],["Ni","Nickel",28],
    ["Cu","Copper",29],["Zn","Zinc",30],["Ga","Gallium",31],["Ge","Germanium",32],
    ["As","Arsenic",33],["Se","Selenium",34],["Br","Bromine",35],["Kr","Krypton",36],
    ["Rb","Rubidium",37],["Sr","Strontium",38],["Y","Yttrium",39],["Zr","Zirconium",40],
    ["Nb","Niobium",41],["Mo","Molybdenum",42],["Tc","Technetium",43],["Ru","Ruthenium",44],
    ["Rh","Rhodium",45],["Pd","Palladium",46],["Ag","Silver",47],["Cd","Cadmium",48],
    ["In","Indium",49],["Sn","Tin",50],["Sb","Antimony",51],["Te","Tellurium",52],
    ["I","Iodine",53],["Xe","Xenon",54],["Cs","Cesium",55],["Ba","Barium",56],
    ["La","Lanthanum",57],["Ce","Cerium",58],["Pr","Praseodymium",59],["Nd","Neodymium",60],
    ["Pm","Promethium",61],["Sm","Samarium",62],["Eu","Europium",63],["Gd","Gadolinium",64],
    ["Tb","Terbium",65],["Dy","Dysprosium",66],["Ho","Holmium",67],["Er","Erbium",68],
    ["Tm","Thulium",69],["Yb","Ytterbium",70],["Lu","Lutetium",71],["Hf","Hafnium",72],
    ["Ta","Tantalum",73],["W","Tungsten",74],["Re","Rhenium",75],["Os","Osmium",76],
    ["Ir","Iridium",77],["Pt","Platinum",78],["Au","Gold",79],["Hg","Mercury",80],
    ["Tl","Thallium",81],["Pb","Lead",82],["Bi","Bismuth",83],["Po","Polonium",84],
    ["At","Astatine",85],["Rn","Radon",86],["Fr","Francium",87],["Ra","Radium",88],
    ["Ac","Actinium",89],["Th","Thorium",90],["Pa","Protactinium",91],["U","Uranium",92],
    ["Np","Neptunium",93],["Pu","Plutonium",94],["Am","Americium",95],["Cm","Curium",96],
    ["Bk","Berkelium",97],["Cf","Californium",98],["Es","Einsteinium",99],["Fm","Fermium",100],
    ["Md","Mendelevium",101],["No","Nobelium",102],["Lr","Lawrencium",103],["Rf","Rutherfordium",104],
    ["Db","Dubnium",105],["Sg","Seaborgium",106],["Bh","Bohrium",107],["Hs","Hassium",108],
    ["Mt","Meitnerium",109],["Ds","Darmstadtium",110],["Rg","Roentgenium",111],["Cn","Copernicium",112],
    ["Nh","Nihonium",113],["Fl","Flerovium",114],["Mc","Moscovium",115],["Lv","Livermorium",116],
    ["Ts","Tennessine",117],["Og","Oganesson",118]
];

const elementSkins = elementData.map(([id, name, Z]) => {
    const cost = 10 + Z * 3;
    const mult = 1 + Z * 0.005;
    const avoid = Math.min(0.3, Z * 0.0025);
    const hue = (Z * 7) % 360;
    const color = `hsl(${hue}, 80%, 50%)`;
    return { id, name, Z, cost, mult, avoid, color };
});

let currentSkin = null;

let questions = [
    { q: "What type of bond involves sharing electrons?", a: "covalent" },
    { q: "What bond forms from transferring electrons?", a: "ionic" },
    { q: "What weak bond holds water molecules together?", a: "hydrogen" },
    { q: "Metal atoms form what type of bond?", a: "metallic" },
    { q: "A bond with unequal sharing of electrons is called what?", a: "polar" },
    { q: "A bond with equal sharing of electrons is called what?", a: "nonpolar" },
    { q: "What term describes an atom's ability to attract electrons?", a: "electronegativity" },
    { q: "What is the strongest covalent bond: single, double, or triple?", a: "triple" },
    { q: "What do we call a molecule with a positive and negative end?", a: "dipole" },
    { q: "What is the smallest unit of an element?", a: "atom" },
    { q: "What is the center of an atom called?", a: "nucleus" },
    { q: "What particles have a negative charge?", a: "electrons" },
    { q: "What particles have a positive charge?", a: "protons" },
    { q: "What neutral particles are in the nucleus?", a: "neutrons" },
    { q: "What bond is between metal and nonmetal?", a: "ionic" },
    { q: "What bond is between two nonmetals?", a: "covalent" },
    { q: "What is the most electronegative element?", a: "fluorine" },
    { q: "What is the least electronegative element?", a: "francium" },
    { q: "What is the horizontal row in the periodic table called?", a: "period" },
    { q: "What is the vertical column in the periodic table called?", a: "group" },
    { q: "What group are the noble gases?", a: "18" },
    { q: "What group are the alkali metals?", a: "1" },
    { q: "What group are the alkaline earth metals?", a: "2" },
    { q: "What group are the halogens?", a: "17" },
    { q: "What is the chemical symbol for hydrogen?", a: "h" },
    { q: "What is the chemical symbol for oxygen?", a: "o" },
    { q: "What is the chemical symbol for carbon?", a: "c" },
    { q: "What is the chemical symbol for nitrogen?", a: "n" },
    { q: "What is the chemical symbol for sodium?", a: "na" },
    { q: "What is the chemical symbol for potassium?", a: "k" },
    { q: "What is the chemical symbol for calcium?", a: "ca" },
    { q: "What is the chemical symbol for chlorine?", a: "cl" },
    { q: "What is the chemical symbol for iron?", a: "fe" },
    { q: "What is the chemical symbol for copper?", a: "cu" },
    { q: "What is the chemical symbol for gold?", a: "au" },
    { q: "What is the chemical symbol for silver?", a: "ag" },
    { q: "What is the chemical symbol for helium?", a: "he" },
    { q: "What is the chemical symbol for neon?", a: "ne" },
    { q: "What is the chemical symbol for sulfur?", a: "s" },
    { q: "What is the chemical symbol for phosphorus?", a: "p" },
    { q: "What is the chemical symbol for magnesium?", a: "mg" },
    { q: "What is the chemical symbol for aluminum?", a: "al" },
    { q: "What is the chemical symbol for silicon?", a: "si" },
    { q: "What is the chemical symbol for argon?", a: "ar" },
    { q: "What is the chemical symbol for lithium?", a: "li" },
    { q: "What is the chemical symbol for beryllium?", a: "be" },
    { q: "What is the chemical symbol for boron?", a: "b" },
    { q: "What is the chemical symbol for fluorine?", a: "f" },
    { q: "What is the chemical symbol for zinc?", a: "zn" },
    { q: "What is the chemical symbol for lead?", a: "pb" },
    { q: "What is the chemical symbol for tin?", a: "sn" },
    { q: "What is the chemical symbol for mercury?", a: "hg" },
    { q: "What is the chemical symbol for nickel?", a: "ni" },
    { q: "What is the chemical symbol for cobalt?", a: "co" },
    { q: "What is the chemical symbol for chromium?", a: "cr" },
    { q: "What is the chemical symbol for manganese?", a: "mn" },
    { q: "What is the chemical symbol for bromine?", a: "br" },
    { q: "What is the chemical symbol for iodine?", a: "i" },
    { q: "What is H2O commonly called?", a: "water" },
    { q: "What is NaCl commonly called?", a: "salt" },
    { q: "What is CO2 commonly called?", a: "carbon dioxide" },
    { q: "What is CH4 commonly called?", a: "methane" },
    { q: "What is NH3 commonly called?", a: "ammonia" },
    { q: "What is the pH of a neutral solution?", a: "7" },
    { q: "pH less than 7 is called what?", a: "acidic" },
    { q: "pH greater than 7 is called what?", a: "basic" },
    { q: "What ion is present in acids?", a: "h+" },
    { q: "What ion is present in bases?", a: "oh-" },
    { q: "What type of bond holds Na+ and Cl- together?", a: "ionic" },
    { q: "What type of bond holds H and O in water?", a: "covalent" },
    { q: "What is the charge on an electron?", a: "negative" },
    { q: "What is the charge on a proton?", a: "positive" },
    { q: "What is the charge on a neutron?", a: "neutral" },
    { q: "What is the number of protons in an atom called?", a: "atomic number" },
    { q: "What is the sum of protons and neutrons called?", a: "mass number" },
    { q: "Atoms of the same element with different neutrons are called what?", a: "isotopes" },
    { q: "What is the most abundant gas in Earth's atmosphere?", a: "nitrogen" },
    { q: "What is the lightest element?", a: "hydrogen" },
    { q: "What is the most abundant element in the universe?", a: "hydrogen" },
    { q: "What is the most abundant element in Earth's crust?", a: "oxygen" },
    { q: "What is the most abundant metal in Earth's crust?", a: "aluminum" },
    { q: "What is the main metal in steel?", a: "iron" },
    { q: "What gas do plants produce in photosynthesis?", a: "oxygen" },
    { q: "What gas do humans exhale?", a: "carbon dioxide" },
    { q: "What is the main component of natural gas?", a: "methane" },
    { q: "What is the main component of limestone?", a: "calcium carbonate" },
    { q: "What is the main component of rust?", a: "iron oxide" },
    { q: "What is the main component of diamond?", a: "carbon" },
    { q: "What is the main component of graphite?", a: "carbon" },
    { q: "What is the name for a reaction that releases heat?", a: "exothermic" },
    { q: "What is the name for a reaction that absorbs heat?", a: "endothermic" },
    { q: "What law says mass is conserved in a reaction?", a: "law of conservation of mass" },
    { q: "What do we call a substance that speeds up a reaction?", a: "catalyst" },
    { q: "What do we call a substance that slows a reaction?", a: "inhibitor" },
    { q: "What is the term for a solid forming in a solution?", a: "precipitate" },
    { q: "What is the term for a liquid turning to gas?", a: "evaporation" },
    { q: "What is the term for gas turning to liquid?", a: "condensation" },
    { q: "What is the term for solid turning directly to gas?", a: "sublimation" },
    { q: "What is the term for gas turning directly to solid?", a: "deposition" }
];

function showIndicator(text) {
    const ind = document.getElementById("indicator");
    ind.textContent = text;
    ind.style.display = "block";
    setTimeout(() => ind.style.display = "none", 2000);
}

function updateMoney() {
    document.getElementById("money").textContent = money;
}

function shuffleAtoms() {
    const atoms = document.querySelectorAll(".atom");
    atoms.forEach(a => a.classList.add("shuffle"));

    setTimeout(() => {
        atoms.forEach(a => a.classList.remove("shuffle"));

        let positions = [0, 1, 2];
        positions.sort(() => Math.random() - 0.5);

        photonIndex = positions[0];
        electronIndex = electronVoid ? -1 : positions[1];
        electronVoid = false;

        drawAtoms();
    }, 800);
}

function drawAtoms() {
    const container = document.getElementById("atoms");
    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const atom = document.createElement("div");
        atom.className = "atom";

        const color = currentSkin ? currentSkin.color : "#00e5ff";
        atom.style.background = `radial-gradient(circle at center, #ffffff33, ${color}33)`;
        atom.style.boxShadow = `0 0 20px ${color}66`;

        if (hintActive && i === photonIndex) {
            atom.style.boxShadow = `0 0 30px gold, 0 0 50px gold`;
        }

        const label = document.createElement("div");
        label.textContent = currentSkin ? currentSkin.id : "?";
        atom.appendChild(label);

        ["e1","e2","e3"].forEach(cls => {
            const e = document.createElement("div");
            e.className = "electron " + cls;
            atom.appendChild(e);
        });

        atom.onclick = () => handleAtomClick(i, atom);
        container.appendChild(atom);
    }
}

function handleAtomClick(index, atomEl) {
    if (swapAvailable) {
        handleAtomSwap(index);
    } else {
        pickAtom(index, atomEl);
    }
}

function handleAtomSwap(index) {
    if (swapFirst === null) {
        swapFirst = index;
        alert("Select another atom to swap.");
    } else {
        let swapSecond = index;

        if (swapFirst === photonIndex) photonIndex = swapSecond;
        else if (swapSecond === photonIndex) photonIndex = swapFirst;

        if (swapFirst === electronIndex) electronIndex = swapSecond;
        else if (swapSecond === electronIndex) electronIndex = swapFirst;

        alert("Atoms swapped!");
        swapAvailable = false;
        swapFirst = null;
        drawAtoms();
    }
}

function pickAtom(index, atomEl) {
    let message = "";

    if (index === photonIndex) {
        let baseReward = doublePhoton ? 10 : 5;
        let mult = currentSkin ? currentSkin.mult : 1.0;
        let reward = Math.round(baseReward * mult);
        message = `Photon captured! +$${reward}`;
        money += reward;
        doublePhoton = false;
        atomEl.classList.add("photon-flash");
        setTimeout(() => atomEl.classList.remove("photon-flash"), 500);
    } else if (index === electronIndex) {
        let avoidChance = currentSkin ? currentSkin.avoid : 0;
        if (Math.random() < avoidChance) {
            message = "Your element skin deflected the electron!";
        } else if (shield) {
            message = "Shield absorbed the electron!";
            shield = false;
        } else {
            message = "Electron hit! -$5";
            money -= 5;
        }
        atomEl.classList.add("electron-zap");
        document.body.classList.add("shake");
        setTimeout(() => {
            atomEl.classList.remove("electron-zap");
            document.body.classList.remove("shake");
        }, 400);
    } else {
        message = "Empty quantum state.";
    }

    alert(message);
    hintActive = false;
    updateMoney();
    shuffleAtoms();
}

function attemptBuy(type) {
    pendingPowerup = type;

    const q = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById("quizQuestion").textContent = q.q;
    document.getElementById("quizBox").dataset.answer = q.a;
    document.getElementById("quizBox").style.display = "block";
}

function submitAnswer() {
    const user = document.getElementById("quizAnswer").value.toLowerCase().trim();
    const correct = document.getElementById("quizBox").dataset.answer;

    if (user === correct) {
        alert("Correct!");
        grantPowerup(pendingPowerup);
    } else {
        alert("Incorrect.");
    }

    document.getElementById("quizBox").style.display = "none";
    document.getElementById("quizAnswer").value = "";
}

function grantPowerup(type) {
    switch(type) {
        case "hint":   hintActive = true; showIndicator("Photon Hint Active!"); break;
        case "shield": shield = true; showIndicator("Electron Shield Active!"); break;
        case "double": doublePhoton = true; showIndicator("Photon Burst Ready!"); break;
        case "lucky":  electronVoid = true; showIndicator("Electron Void This Round!"); break;
        case "peek":   alert("Photon is currently at atom #" + (photonIndex + 1)); showIndicator("Quantum Peek Used!"); break;
        case "swap":   swapAvailable = true; showIndicator("Atom Swap Active!"); break;
    }
    drawAtoms();
}

function renderSkinShop() {
    const list = document.getElementById("skinList");
    list.innerHTML = "";
    elementSkins.forEach(skin => {
        const btn = document.createElement("button");
        btn.textContent = `${skin.Z}. ${skin.name} (${skin.id}) - $${skin.cost} | x${skin.mult.toFixed(2)} | ${Math.round(skin.avoid*100)}% electron avoid`;
        btn.style.background = `linear-gradient(90deg, ${skin.color}, #111)`;
        btn.onclick = () => buySkin(skin.id);
        list.appendChild(btn);
    });
}

function buySkin(id) {
    const skin = elementSkins.find(s => s.id === id);
    if (!skin) return;

    if (money < skin.cost) {
        alert("Not enough money.");
        return;
    }
    money -= skin.cost;
    currentSkin = skin;
    updateMoney();
    drawAtoms();
    showIndicator(`Skin equipped: ${skin.name} (${skin.id})`);
}

// SIMPLE, WORKING OBFUSCATED PASSWORD: "GreenOrange"
function adminLogin() {
    // "GreenOrange" in base64, split
    const parts = ["R3Jl", "ZW5P", "cmFu", "Z2U="];
    const encoded = parts.join("");          // "R3JlZW5PcmFuZ2U="
    const realPassword = atob(encoded);      // "GreenOrange"

    const user = prompt("Enter admin password:");
    if (user === realPassword) {
        document.getElementById("adminMenu").style.display = "block";
    } else {
        alert("Incorrect password.");
    }
}

function setMoney() {
    const val = Number(document.getElementById("adminMoney").value);
    if (!isNaN(val)) {
        money = val;
        updateMoney();
    }
}

function addQuestion() {
    const q = document.getElementById("newQ").value;
    const a = document.getElementById("newA").value.toLowerCase().trim();

    if (q && a) {
        questions.push({ q, a });
        alert("Question added!");
        document.getElementById("newQ").value = "";
        document.getElementById("newA").value = "";
    }
}

renderSkinShop();
shuffleAtoms();
updateMoney();
