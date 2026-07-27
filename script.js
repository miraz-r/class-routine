/*==================================================
    COURSES
==================================================*/

const courses = {
  finance: {
    subject: "Finance",
    courseCode: "FIN 0412125",
    teacher: "DMMH",
    color: "finance",
  },

  economics: {
    subject: "Micro Economics",
    courseCode: "ECO 031115",
    teacher: "KABS",
    color: "economics",
  },

  mathematics: {
    subject: "Business Mathematics",
    courseCode: "GED 0541112",
    teacher: "AMS",
    color: "mathematics",
  },

  english: {
    subject: "English",
    courseCode: "GED 0232111",
    teacher: "MMK",
    color: "english",
  },

  history: {
    subject: "History",
    courseCode: "GED 0222119",
    teacher: "ZS",
    color: "history",
  },
};

/*==================================================
    CLASS ROUTINE
==================================================*/

const classRoutine = [
  // Sunday

  {
    day: "Sunday",
    time: "11:10 AM - 12:00 PM",
    course: "finance",
    room: "604",
  },

  {
    day: "Sunday",
    time: "1:10 PM - 2:00 PM",
    course: "mathematics",
    room: "614",
  },

  {
    day: "Sunday",
    time: "2:10 PM - 3:00 PM",
    course: "english",
    room: "614",
  },

  // Monday

  {
    day: "Monday",
    time: "10:10 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },

  {
    day: "Monday",
    time: "12:10 PM - 1:00 PM",
    course: "mathematics",
    room: "614",
  },

  {
    day: "Monday",
    time: "1:10 PM - 2:00 PM",
    course: "economics",
    room: "614",
  },

  // Tuesday

  {
    day: "Tuesday",
    time: "11:10 AM - 12:00 PM",
    course: "economics",
    room: "601",
  },

  {
    day: "Tuesday",
    time: "12:10 PM - 1:00 PM",
    course: "finance",
    room: "614",
  },

  {
    day: "Tuesday",
    time: "1:10 PM - 2:00 PM",
    course: "english",
    room: "614",
  },

  // Wednesday

  {
    day: "Wednesday",
    time: "10:10 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },

  {
    day: "Wednesday",
    time: "12:10 PM - 1:00 PM",
    course: "mathematics",
    room: "614",
  },

  {
    day: "Wednesday",
    time: "1:10 PM - 2:00 PM",
    course: "english",
    room: "614",
  },

  // Thursday

  {
    day: "Thursday",
    time: "10:10 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },

  {
    day: "Thursday",
    time: "12:10 PM - 1:00 PM",
    course: "finance",
    room: "614",
  },

  {
    day: "Thursday",
    time: "1:10 PM - 2:00 PM",
    course: "economics",
    room: "613",
  },
];

/*==================================================
    TEMPLATE & DAY CONTAINERS
==================================================*/

const cardTemplate = document.getElementById("classCardTemplate");

const dayContainers = {
  Sunday: document.getElementById("Sunday"),
  Monday: document.getElementById("Monday"),
  Tuesday: document.getElementById("Tuesday"),
  Wednesday: document.getElementById("Wednesday"),
  Thursday: document.getElementById("Thursday"),
};

/*==================================================
    SVG ICONS
==================================================*/

const icons = {
  book: `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5V4.5A2.5 2.5 0 016.5 2z"/>
    </svg>
  `,

  teacher: `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M22 10v6M2 10v6"/>
      <path d="M12 3L2 8l10 5 10-5-10-5z"/>
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>
    </svg>
  `,

  room: `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M12 21s-6-5.3-6-11a6 6 0 1112 0c0 5.7-6 11-6 11z"/>
      <circle cx="12" cy="10" r="2"/>
    </svg>
  `,
};
/*==================================================
    CREATE ROUTINE CARDS
==================================================*/

function createRoutineCards() {
  classRoutine.forEach((classInfo) => {
    const course = courses[classInfo.course];

    const card = cardTemplate.content.cloneNode(true);

    const article = card.querySelector(".class-card");

    // Subject colour
    article.classList.add(course.color);

    // Fill data
    card.querySelector(".time").textContent = classInfo.time;
    card.querySelector(".subject").textContent = course.subject;
    card.querySelector(".course-code").textContent = course.courseCode;
    card.querySelector(".teacher").textContent = course.teacher;
    card.querySelector(".room").textContent = classInfo.room;

    // Add to correct day
    dayContainers[classInfo.day].appendChild(card);
  });
}

/*==================================================
    DARK MODE
==================================================*/

const themeButton = document.getElementById("themeToggle");

const themeText = document.querySelector(".theme-text");

const moonIcon = document.querySelector(".moon-icon");

const sunIcon = document.querySelector(".sun-icon");

function updateThemeUI(isDark) {
  if (isDark) {
    document.body.classList.add("dark");

    moonIcon.style.display = "none";
    sunIcon.style.display = "block";

    themeText.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");

    moonIcon.style.display = "block";
    sunIcon.style.display = "none";

    themeText.textContent = "Dark Mode";
  }
}

// Load saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  updateThemeUI(true);
} else {
  updateThemeUI(false);
}

// Toggle theme

themeButton.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");

  updateThemeUI(isDark);

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/*==================================================
    INITIALIZE
==================================================*/

createRoutineCards();
  