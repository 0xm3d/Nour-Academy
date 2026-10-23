import "../styles/styles.css";
import { courses } from "./courses.js";

let catalogue = document.getElementById("catalogue");
let counter = document.getElementById("compteur");
let noResult = document.getElementById("aucun-resultat");
let levelSelect = document.getElementById("niveau");
let subjectSelect = document.getElementById("matiere");

function showCourses() {
  let chosenLevel = levelSelect.value;
  let chosenSubject = subjectSelect.value;
  let count = 0;

  catalogue.innerHTML = "";

  for (let i = 0; i < courses.length; i++) {
    let c = courses[i];

    if (chosenLevel != "" && c.level != chosenLevel) continue;

    if (chosenSubject != "" && c.subject != chosenSubject) continue;

    count++;

    let seats = c.seatsRemaining + " places restantes";
    let buttonText = "Sélectionner ce cours";
    let disabled = "";

    if (c.seatsRemaining === 0) {
      seats = "Complet";
      buttonText = "Sélection indisponible";
      disabled = "disabled";
    }

    catalogue.innerHTML += `
      <article class="flex flex-col gap-2 rounded-xl border border-[var(--color-soft)] bg-white p-5">
        <span class="self-end rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs">${seats}</span>
        <p class="text-xs font-semibold text-[var(--color-muted)]">${c.subject}</p>
        <h3 class="text-xl font-semibold text-[var(--color-primary)]">${c.title}</h3>
        <p class="text-sm">${c.level}</p>
        <p class="text-sm">${c.schedule}</p>
        <p class="text-sm">${c.center}</p>
        <p class="mt-2 text-2xl font-semibold text-[var(--color-primary)]">${c.price} MAD / mois</p>
        <button type="button" data-action="add" data-id="${c.id}" ${disabled}
          class="mt-2 min-h-11 rounded-md bg-[var(--color-primary)] px-4 text-sm text-white disabled:opacity-50">
          ${buttonText}
        </button>
      </article>`;
  }

  counter.textContent = count + " cours trouvés";

  if (count === 0) {
    noResult.classList.remove("hidden");
  } else {
    noResult.classList.add("hidden");
  }
}

levelSelect.addEventListener("change", showCourses);
subjectSelect.addEventListener("change", showCourses);

showCourses();