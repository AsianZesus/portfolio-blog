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

async function projectsList() {
  try {
    const res = await fetch("/data/projects.json");
    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }

    projectsHeaders(data);
  } catch (error) {
    console.log(error);
  }
}

function projectsHeaders(obj) {
  const testData = document.querySelector("#test-project");
  const projectsData = obj.projects;

  // for (const projectData of projectsData) {
  //   testData.textContent = projectData[i].name;
  // }

  projectsData.forEach((element) => {
    const myLink = document.createElement("a");
    myLink.textContent = element.name;
    // myLink.classList.add("text-large")
    testData.append(myLink);
  });
}

projectsList();
