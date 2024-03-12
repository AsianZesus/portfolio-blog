const themeToggle = document.querySelector("#theme-toggle");
const localeTimeElement = document.querySelector("#localeTime");

// Dark/Light Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.contains("light-theme")
    ? enableDarkMode()
    : enableLightMode();
});

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
}

function setThemePreference() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    enableDarkMode();
    return;
  }
  enableLightMode();
}

document.onload = setThemePreference();

// Time
function time() {
  setInterval(() => {
    const fullTime = new Date();
    localeTimeElement.textContent = fullTime.toLocaleTimeString();
  }, 1000);
}
window.onload = time;

// Projects

async function projects() {
  const requestURL = "https://http://localhost:5173/data/projects.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const superHeroesText = await response.text();

  const superHeroes = JSON.parse(superHeroesText);
  projectsHeader(superHeroes);
  projectsHeader(superHeroes);
}

function projectsHeader(obj) {
  const header = document.querySelector("#test-project");
  const myH1 = document.createElement("h1");
  myH1.textContent = obj.year;
  header.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent = `Hometown: ${obj.name}`;
  header.appendChild(myPara);
}

function populateProjects(obj) {
  const section = document.querySelector(".test-section");
  const heroes = obj.projects;

  for (const hero of heroes) {
    const myH2 = document.createElement("h2");

    myH2.textContent = hero.name;

    const superPowers = hero.year;

    for (const power of superPowers) {
      const myh3 = document.createElement("h3");

      myh3.textContent = power;
    }

    section.appendChild(myH2);
  }
}

projects();
