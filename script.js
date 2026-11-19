// 1. Odpočet do MS ve fotbale 2030 (8. června 2030, 18:00)
const ciloveDatum = new Date("2030-06-08T18:00:00").getTime();

const elDny = document.querySelector("#dny");
const elHodiny = document.querySelector("#hodiny");
const elMinuty = document.querySelector("#minuty");
const elSekundy = document.querySelector("#sekundy");

function aktualizujOdpocet() {
    // Spustí se jen na stránce, kde prvky odpočtu existují
    if (!elDny || !elHodiny || !elMinuty || !elSekundy) {
        return;
    }

    const ted = Date.now();
    const rozdil = ciloveDatum - ted;

    if (rozdil <= 0) {
        elDny.textContent = "0";
        elHodiny.textContent = "0";
        elMinuty.textContent = "0";
        elSekundy.textContent = "0";
        return;
    }

    const dny = Math.floor(rozdil / (1000 * 60 * 60 * 24));
    const hodiny = Math.floor((rozdil / (1000 * 60 * 60)) % 24);
    const minuty = Math.floor((rozdil / 1000 / 60) % 60);
    const sekundy = Math.floor((rozdil / 1000) % 60);

    elDny.textContent = dny;
    elHodiny.textContent = hodiny;
    elMinuty.textContent = minuty;
    elSekundy.textContent = sekundy;
}

// Okamžité spuštění při načtení a následná aktualizace každou sekundu
aktualizujOdpocet();
setInterval(aktualizujOdpocet, 1000);

// 2. Validace formuláře na druhé stránce
const formular = document.querySelector("#novinky-form");
const vstupEmail = document.querySelector("#email");
const vstupTym = document.querySelector("#tym");
const zprava = document.querySelector("#form-zprava");

if (formular) {
    formular.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailHodnota = vstupEmail.value.trim();
        const tymHodnota = vstupTym.value.trim();

        // Jednoduchá kontrola formátu e-mailu
        if (!emailHodnota || !emailHodnota.includes("@") || !emailHodnota.includes(".")) {
            zprava.textContent = "Zadejte prosím platnou e-mailovou adresu.";
            zprava.className = "zprava chyba";
            return;
        }

        const oblibenyTym = tymHodnota ? ` (fandíte týmu: ${tymHodnota})` : "";
        zprava.textContent = `Děkujeme! Odběr novinek byl nastaven pro ${emailHodnota}${oblibenyTym}.`;
        zprava.className = "zprava uspech";
        formular.reset();
    });
}