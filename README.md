# Nour Academy – Enrollment Portal

A mobile-first enrollment portal for Nour Academy, a network of 3 tutoring centers in Nador. Parents can find a course, build a selection and send a complete enrollment file from their phone. Everything runs in the browser (no server).

| | |
|---|---|
| Live site | https://nour-academy-ruddy.vercel.app/ |
| Jira board | https://mohamed-bouhadi01.atlassian.net/jira/software/projects/NA/boards/1/backlog |
| Figma design | https://www.figma.com/design/GPdfVRAXNx1YhCz8j9HII0/Untitled?node-id=0-1 |

## Context

Nour Academy welcomes about 1,400 students a year, from primary school to the Baccalaureate, in three centers: Nador Centre, Hay Al Matar and Selouane. Most registrations arrive by WhatsApp or at the counter, 1 parent in 4 cannot find the right course, and 35% of files are incomplete or wrong. The secretaries lose about 15 hours a week calling parents back.

The goal of this portal is to bring incomplete files under 15% by blocking anything invalid at the entry. The secretariat back-office is the subject of Part 2.

**Users:** Fatima (parent, entry-level Android phone, irregular 4G), Yassine (2nd Bac student comparing courses on his phone) and Khadija (secretary, needs clean and complete data).

## Features

- **Catalog (US1):** 12 courses stored in an array and rendered with JavaScript (no card in the HTML). Prices are shown in MAD per month. A course with 0 seats shows "Full" and its button is disabled.
- **Filters (US2):** level and subject filters that combine, no page reload, a result counter and a "no course matches" message.
- **Selection (US3):** add and remove courses, monthly total in MAD, no duplicates. One click listener on the container handles every button, even after filtering (event delegation).
- **Guided form (US4):** live validation with a message and a border color under each field.
- **Submission (US5):** sending is blocked if a field is invalid, if the selection is empty or if consent is not checked. The focus goes to the first field in error. On success, a summary (student, courses, total, unique file number) is shown and the form and selection are reset.
- **Bonus B1:** instant keyword search in course titles.


## Tech and style choice

- Native JavaScript (ES modules), no library or framework.
- **Tailwind CSS v4 with Vite**, with the color charter declared once in `styles/styles.css` and used through variables such as `bg-[var(--color-primary)]`. I chose Tailwind because it keeps the styles next to the markup, makes the mobile-first breakpoints (`md:`, `lg:`) quick to write, and the Vite build only ships the classes that are used, which keeps the page light for 3G/4G.
- HTML, CSS and JS are in separate files. No inline `onclick` or `style` in the HTML, and `const`/`let` only.
- No external API and no Tailwind CDN script.

## Validation rules

| Field | Rule |
|---|---|
| Parent's name | At least 2 characters |
| Email | Regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` (something, `@`, something, a dot, something) |
| Mobile phone | Spaces removed, then regex `^(0[67][0-9]{8}\|\+212[67][0-9]{8})$`: `06`/`07` + 8 digits, or `+212` + `6`/`7` + 8 digits |
| Student's name | At least 2 characters |
| Student's level | One level must be chosen |
| Confirm password | Must be identical to the password |
| Consent | Must be checked (not pre-checked) |

Each check runs while the user types and again on submit, and the same function shows the message and the green or red border.

## Law 09-08 (CNDP)

Consent is explicit and not pre-checked, with an information notice under the checkbox. Only the data needed to process the enrollment is collected (no national ID number), and the repository contains only fictitious data.

## Project structure

```
index.html          page structure (sections: header, hero, courses, enrollment, centers, footer)
src/main.js         catalog, filters and cart
src/courses.js      the 12 courses (data)
src/form.js         form validation and submission
styles/styles.css   Tailwind import and color charter
images/             logo and hero image
```

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build
```

## Git workflow

One Jira ticket per user story (key `NA-<number>`), one branch per ticket named `feature/NA-<number>-<description>`, and one Pull Request per user story with what was done and how to test it.

## Difficulties and solutions

- **Buttons stopped working after filtering.** The cards are rebuilt at every filter, so listeners attached to old buttons disappeared. I attached one listener to the container and read `data-action` and `data-id` from the clicked button with `closest()`.
- **Two files that need to talk.** After a valid submit, `form.js` has to empty the cart that lives in `main.js`. Instead of importing one into the other, `form.js` dispatches a custom `registration-success` event and `main.js` listens to it.
- **Combining the filters.** Each filter is ignored when empty and otherwise must match, so level, subject and search are all applied together on every redraw.
- **Showing the right message at the right time.** One `show()` helper writes the message and changes the border for every field, so the validation functions only decide whether the value is valid.

## Sources

- MDN Web Docs: DOM, `classList`, event delegation, regular expressions
- Tailwind CSS v4 documentation
- Vite documentation
- Law 09-08 information from the CNDP
