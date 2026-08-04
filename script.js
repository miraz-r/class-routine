/*==================================================
    UNIVERSITY CLASS ROUTINE
    PART 1
    DATA + DOM + STATE + HELPERS
==================================================*/

/*==================================================
    COURSE DATA
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

const routine = [
  // Sunday
  {
    day: "Sunday",
    time: "11:01 AM - 12:00 PM",
    course: "finance",
    room: "604",
  },
  {
    day: "Sunday",
    time: "1:01 PM - 2:00 PM",
    course: "mathematics",
    room: "614",
  },
  {
    day: "Sunday",
    time: "2:01 PM - 3:00 PM",
    course: "english",
    room: "614",
  },

  // Monday
  {
    day: "Monday",
    time: "10:01 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },
  {
    day: "Monday",
    time: "12:01 PM - 1:00 PM",
    course: "mathematics",
    room: "614",
  },
  {
    day: "Monday",
    time: "1:01 PM - 2:00 PM",
    course: "economics",
    room: "614",
  },

  // Tuesday
  {
    day: "Tuesday",
    time: "11:01 AM - 12:00 PM",
    course: "economics",
    room: "601",
  },
  {
    day: "Tuesday",
    time: "12:01 PM - 1:00 PM",
    course: "finance",
    room: "614",
  },
  {
    day: "Tuesday",
    time: "1:01 PM - 2:00 PM",
    course: "english",
    room: "614",
  },

  // Wednesday
  {
    day: "Wednesday",
    time: "10:01 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },
  {
    day: "Wednesday",
    time: "12:01 PM - 1:00 PM",
    course: "mathematics",
    room: "614",
  },
  {
    day: "Wednesday",
    time: "1:01 PM - 2:00 PM",
    course: "english",
    room: "614",
  },

  // Thursday
  {
    day: "Thursday",
    time: "10:01 AM - 11:00 AM",
    course: "history",
    room: "B-203",
  },
  {
    day: "Thursday",
    time: "12:01 PM - 1:00 PM",
    course: "finance",
    room: "614",
  },
  {
    day: "Thursday",
    time: "1:01 PM - 2:00 PM",
    course: "economics",
    room: "613",
  },
];

/*==================================================
    HOLIDAYS
==================================================*/

const holidays = [
  {
    month: 2,
    day: 21,
    name: "International Mother Language Day",
  },
  {
    month: 3,
    day: 26,
    name: "Independence Day",
  },
  {
    month: 4,
    day: 14,
    name: "Pohela Boishakh",
  },
  {
    month: 5,
    day: 1,
    name: "May Day",
  },
  {
    month: 8,
    day: 5,
    name: "July Mass Uprising Day",
  },
  {
    month: 12,
    day: 16,
    name: "Victory Day",
  },
  {
    month: 12,
    day: 25,
    name: "Christmas Day",
  },
];

/*==================================================
    DOM ELEMENTS
==================================================*/

const template = document.getElementById("classCardTemplate");

const routineGrid = document.querySelector(".routine-grid");

const emptyState = document.getElementById("emptyState");
const emptyDate = document.getElementById("emptyDate");

const selectedDateText = document.getElementById("selectedDate");

const calendarButton = document.getElementById("calendarButton");
const calendarModal = document.getElementById("calendarModal");

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

const themeButton = document.getElementById("themeToggle");
const moonIcon = document.querySelector(".moon-icon");
const sunIcon = document.querySelector(".sun-icon");

const dayPills = document.querySelectorAll(".day-pill");

const dayContainers = {
  Sunday: document.getElementById("Sunday"),
  Monday: document.getElementById("Monday"),
  Tuesday: document.getElementById("Tuesday"),
  Wednesday: document.getElementById("Wednesday"),
  Thursday: document.getElementById("Thursday"),
};

/*==================================================
    APP STATE
==================================================*/

const state = {
  selectedDate: new Date(),

  calendarMonth: new Date().getMonth(),

  calendarYear: new Date().getFullYear(),
};

/*==================================================
    HELPERS
==================================================*/

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getWeekday(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function getHoliday(date) {
  return holidays.find(
    (holiday) =>
      holiday.month === date.getMonth() + 1 && holiday.day === date.getDate(),
  );
}
function isWeekend(date) {
  const day = date.getDay();

  return day === 5 || day === 6;
}
/*==================================================
    ROUTINE CARD RENDERING
==================================================*/

function createClassCard(classInfo) {
  const course = courses[classInfo.course];

  const card = template.content.cloneNode(true);

  const article = card.querySelector(".class-card");

  article.classList.add(course.color);

  card.querySelector(".time").textContent = classInfo.time;
  card.querySelector(".subject").textContent = course.subject;
  card.querySelector(".course-code").textContent = course.courseCode;
  card.querySelector(".teacher").textContent = course.teacher;
  card.querySelector(".room").textContent = classInfo.room;

  return card;
}

function clearRoutine() {
  Object.values(dayContainers).forEach((container) => {
    container.innerHTML = "";
  });
}

function renderRoutine() {
  clearRoutine();

  routine.forEach((classInfo) => {
    dayContainers[classInfo.day].appendChild(createClassCard(classInfo));
  });
}

/*==================================================
    EMPTY STATE
==================================================*/

function showEmptyState(message, isHoliday = false) {
  routineGrid.style.display = "none";

  emptyState.classList.add("show");

  emptyDate.textContent = message;

  const subtitle = emptyState.querySelector("span");

  if (isHoliday) {
    subtitle.style.display = "none";
  } else {
    subtitle.style.display = "inline";
    subtitle.textContent = "Enjoy your weekend.";
  }
}
function hideEmptyState() {
  routineGrid.style.display = "grid";

  emptyState.classList.remove("show");
}

/*==================================================
    DESKTOP / MOBILE ROUTINE VISIBILITY
==================================================*/

function showAllDays() {
  document.querySelectorAll(".day-column").forEach((column) => {
    column.style.display = "flex";
  });
}

function showOnlyDay(day) {
  document.querySelectorAll(".day-column").forEach((column) => {
    const heading = column.querySelector("h2").textContent;

    column.style.display = heading === day ? "flex" : "none";
  });
}

function updateMobileRoutine(day) {
  if (window.innerWidth > 768) {
    showAllDays();
    return;
  }

  showOnlyDay(day);

  dayPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.day === day);
  });
}

/*==================================================
    SELECTED DATE
==================================================*/

function updateSelectedDate() {
  selectedDateText.textContent = formatDate(state.selectedDate);
}

/*==================================================
    DATE STATE
==================================================*/

function setSelectedDate(date) {
  state.selectedDate = new Date(date);

  state.calendarMonth = state.selectedDate.getMonth();
  state.calendarYear = state.selectedDate.getFullYear();

  updateSelectedDate();

  updateCurrentView();
}

/*==================================================
    MAIN VIEW CONTROLLER
==================================================*/

function updateCurrentView() {
  const holiday = getHoliday(state.selectedDate);

  // Holiday ALWAYS has highest priority
  if (holiday) {
    showEmptyState(holiday.name, true);
    return;
  }

  // Weekend only if not holiday
  if (isWeekend(state.selectedDate)) {
    showEmptyState("", false);

    return;
  }

  hideEmptyState();

  updateMobileRoutine(getWeekday(state.selectedDate));
}
/*==================================================
    THEME
==================================================*/

function updateTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  moonIcon.style.display = isDark ? "none" : "block";
  sunIcon.style.display = isDark ? "block" : "none";
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  updateTheme(savedTheme === "dark");
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("dark");

  updateTheme(isDark);

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/*==================================================
    CALENDAR
==================================================*/

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendar() {
  calendarDays.innerHTML = "";

  monthYear.textContent = `${monthNames[state.calendarMonth]} ${state.calendarYear}`;

  const firstDay = new Date(
    state.calendarYear,
    state.calendarMonth,
    1,
  ).getDay();

  const totalDays = new Date(
    state.calendarYear,
    state.calendarMonth + 1,
    0,
  ).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("button");

    empty.className = "calendar-day empty";

    calendarDays.appendChild(empty);
  }

  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    const button = document.createElement("button");

    button.className = "calendar-day";

    button.textContent = day;

    if (
      day === today.getDate() &&
      state.calendarMonth === today.getMonth() &&
      state.calendarYear === today.getFullYear()
    ) {
      button.classList.add("today");
    }

    if (
      day === state.selectedDate.getDate() &&
      state.calendarMonth === state.selectedDate.getMonth() &&
      state.calendarYear === state.selectedDate.getFullYear()
    ) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      setSelectedDate(new Date(state.calendarYear, state.calendarMonth, day));

      calendarModal.classList.remove("show");

      renderCalendar();
    });

    calendarDays.appendChild(button);
  }
}

/*==================================================
    CALENDAR CONTROLS
==================================================*/

function openCalendar() {
  calendarModal.classList.add("show");

  renderCalendar();
}

function closeCalendar() {
  calendarModal.classList.remove("show");
}

function previousMonth() {
  state.calendarMonth--;

  if (state.calendarMonth < 0) {
    state.calendarMonth = 11;
    state.calendarYear--;
  }

  renderCalendar();
}

function nextMonth() {
  state.calendarMonth++;

  if (state.calendarMonth > 11) {
    state.calendarMonth = 0;
    state.calendarYear++;
  }

  renderCalendar();
}
/*==================================================
    MOBILE DAY PILLS
==================================================*/

function getNextDateForDay(dayName) {
  const today = new Date();

  const targetDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(dayName);

  let difference = targetDay - today.getDay();

  if (difference < 0) {
    difference += 7;
  }

  const nextDate = new Date(today);

  nextDate.setDate(today.getDate() + difference);

  return nextDate;
}

function handleDayPillClick(day) {
  dayPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.day === day);
  });

  setSelectedDate(getNextDateForDay(day));
}

/*==================================================
    WINDOW RESIZE
==================================================*/

function handleResize() {
  if (window.innerWidth > 768) {
    showAllDays();
    return;
  }

  if (!isWeekend(state.selectedDate) && !getHoliday(state.selectedDate)) {
    updateMobileRoutine(getWeekday(state.selectedDate));
  }
}

/*==================================================
    EVENT LISTENERS
==================================================*/

// Theme
themeButton.addEventListener("click", toggleTheme);

// Calendar
calendarButton.addEventListener("click", openCalendar);

prevMonthButton.addEventListener("click", previousMonth);

nextMonthButton.addEventListener("click", nextMonth);

// Close calendar
calendarModal.addEventListener("click", (event) => {
  if (event.target === calendarModal) {
    closeCalendar();
  }
});

// Mobile day pills
dayPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    handleDayPillClick(pill.dataset.day);
  });
});

// Window resize
window.addEventListener("resize", handleResize);

/*==================================================
    KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCalendar();
  }
});

/*==================================================
    INITIALIZATION
==================================================*/

renderRoutine();

loadTheme();

setSelectedDate(state.selectedDate);

handleResize();
