import "../styles/styles.css";
import { courses } from "./courses.js";

let catalog = document.getElementById("catalog");
let counter = document.getElementById("counter");
let noResult = document.getElementById("no-results");
let levelSelect = document.getElementById("level");
let subjectSelect = document.getElementById("subject");
let searchInput = document.getElementById("search");

function showCourses() {
  let chosenLevel = levelSelect.value;
  let chosenSubject = subjectSelect.value;
  let search = searchInput.value.toLowerCase().trim();
  let count = 0;

  catalog.innerHTML = "";

  for (let i = 0; i < courses.length; i++) {
    let c = courses[i];

    if (chosenLevel != "" && c.level != chosenLevel) continue;

    if (chosenSubject != "" && c.subject != chosenSubject) continue;

    let text = (c.title + " " + c.subject).toLowerCase();
    if (!text.includes(search)) continue;

    count++;

    let seats = c.seatsRemaining + " seats left";
    let buttonText = "Select this course";
    let disabled = "";

    if (c.seatsRemaining === 0) {
      seats = "Full";
      buttonText = "Selection unavailable";
      disabled = "disabled";
    }

    catalog.innerHTML += `
      <article class="flex flex-col gap-2 rounded-xl border border-[var(--color-soft)] bg-white p-5">
        <span class="self-end rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs">${seats}</span>
        <p class="text-xs font-semibold text-[var(--color-muted)]">${c.subject}</p>
        <h3 class="text-xl font-semibold text-[var(--color-primary)]">${c.title}</h3>
        <p class="text-sm">${c.level}</p>
        <p class="text-sm">${c.schedule}</p>
        <p class="text-sm">${c.center}</p>
        <p class="mt-2 text-2xl font-semibold text-[var(--color-primary)]">${c.price} MAD / month</p>
        <button type="button" data-action="add" data-id="${c.id}" ${disabled}
          class="mt-2 min-h-11 rounded-md bg-[var(--color-primary)] px-4 text-sm text-white disabled:opacity-50">
          ${buttonText}
        </button>
      </article>`;
  }

  counter.textContent = count + " courses found";

  if (count === 0) {
    noResult.classList.remove("hidden");
  } else {
    noResult.classList.add("hidden");
  }
}

levelSelect.addEventListener("change", showCourses);
subjectSelect.addEventListener("change", showCourses);
searchInput.addEventListener("input", showCourses);

showCourses();