// GoalFlow Application - Vanilla JavaScript
// State Management
const state = {
  activeTab: "daily",
  streak: 12,
  isSubmitted: false,
  isDarkMode: true,
  viewDate: new Date(),
  expandedMetric: null,
  habits: [], // Will be loaded dynamically from routine matrix
  isAddingHabit: false,
  editingHabitId: null,
  auditData: {
    Health: [
      { name: "Nutrition", score: 5, comment: "" },
      { name: "Sleep", score: 7, comment: "" },
      { name: "Exercise", score: 4, comment: "" },
    ],
    Growth: [
      { name: "Skill Dev", score: 6, comment: "" },
      { name: "Mindset", score: 8, comment: "" },
      { name: "Network", score: 5, comment: "" },
    ],
  },
  journal: {
    wentWell: "",
    couldImprove: "",
    tomorrowGoal: "",
  },
};

// Utility Functions
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function formatDate() {
  const options = { weekday: "long", month: "short", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
}

// Dark Mode Toggle
function toggleDarkMode() {
  state.isDarkMode = !state.isDarkMode;
  if (state.isDarkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
}

// Initialize Dark Mode from localStorage
function initDarkMode() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "false") {
    state.isDarkMode = false;
    document.documentElement.classList.remove("dark");
  } else {
    state.isDarkMode = true;
    document.documentElement.classList.add("dark");
  }
}

// Tab Navigation
function switchTab(tabName) {
  state.activeTab = tabName;

  // Hide all views
  $("#daily-view").classList.add("hidden");
  $("#calendar-view").classList.add("hidden");
  $("#audit-view").classList.add("hidden");
  $("#journal-view").classList.add("hidden");

  // Show active view
  if (tabName === "daily") {
    $("#daily-view").classList.remove("hidden");
  } else if (tabName === "calendar") {
    $("#calendar-view").classList.remove("hidden");
    renderCalendar();
  } else if (tabName === "audit") {
    $("#audit-view").classList.remove("hidden");
  } else if (tabName === "journal") {
    $("#journal-view").classList.remove("hidden");
  }

  // Update nav buttons
  $$(".nav-btn").forEach((btn) => {
    const isActive =
      btn.dataset.tab === tabName ||
      (tabName === "calendar" && btn.dataset.tab === "daily");
    if (isActive) {
      btn.classList.add("text-emerald-700", "dark:text-emerald-400");
      btn.classList.remove("text-slate-400", "dark:text-slate-500");
      btn.querySelector(".nav-bg").classList.remove("hidden");
    } else {
      btn.classList.remove("text-emerald-700", "dark:text-emerald-400");
      btn.classList.add("text-slate-400", "dark:text-slate-500");
      btn.querySelector(".nav-bg").classList.add("hidden");
    }
  });

  window.scrollTo(0, 0);
}

function loadHabitsFromRoutine() {
  const defaultSlots = [ // fallback if no routine exists yet
    {label:"10:00 PM – 5:00 AM",rows:Array(7).fill({cls:"sleep",text:"Sleep",sub:"7 hrs"})}, 
    {label:"9:00 AM – 6:00 PM",rows:Array(7).fill({cls:"work",text:"Job shift",sub:"9 hrs"})}
  ];
  
  const matrixData = JSON.parse(localStorage.getItem('routine_slots_data')) || defaultSlots;
  const todayDate = new Date();
  const dayIdx = (todayDate.getDay() + 6) % 7; // 0=Mon, 6=Sun
  
  const completionsKey = `completions_${todayDate.toISOString().split('T')[0]}`;
  const savedCompletions = JSON.parse(localStorage.getItem(completionsKey)) || {};

  state.habits = matrixData.map((slot, index) => {
    const item = slot.rows[dayIdx];
    // Filter out completely free time if desired, but let's include all named tasks
    return {
      id: index, // Use index as ID for mapping
      name: item.text,
      category: item.cls,
      timeLabel: slot.label,
      completed: !!savedCompletions[index]
    };
  }).filter(h => h.category !== "free"); // Optional: hide "Free time" slots from checklist
}

function calculateConsistency() {
  if (state.habits.length === 0) return 0;
  const completed = state.habits.filter((h) => h.completed).length;
  return Math.round((completed / state.habits.length) * 100);
}

function updateConsistencyDisplay() {
  const percentage = calculateConsistency();
  $("#consistency-score").textContent = percentage + "%";
  $("#progress-bar").style.width = percentage + "%";
}

function renderHabits() {
  const container = $("#habits-list");
  container.innerHTML = "";
  
  if (state.habits.length === 0) {
    container.innerHTML = `
      <div class="text-center p-6 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
        <i data-lucide="calendar" class="w-8 h-8 text-slate-300 mx-auto mb-2"></i>
        <p class="text-sm font-bold text-slate-400">No scheduled tasks for today.</p>
        <p class="text-xs text-slate-500 mt-1">Check your Routine Matrix.</p>
      </div>
    `;
    lucide.createIcons();
    updateConsistencyDisplay();
    return;
  }

  state.habits.forEach((habit) => {
    const habitEl = document.createElement("div");
    habitEl.className = `group rounded-[2rem] transition-all duration-300 overflow-hidden ${
      habit.completed
        ? "bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20"
        : "bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/50"
    } ${state.isSubmitted ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`;

    if (state.editingHabitId === habit.id) {
      habitEl.innerHTML = `
                <div class="p-4 flex flex-col gap-3">
                    <input type="text" class="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl outline-none font-bold text-sm dark:text-white" value="${habit.name}" id="edit-input-${habit.id}">
                    <div class="flex items-center gap-3">
                        <select id="edit-category-${habit.id}" class="flex-1 bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl outline-none text-xs font-semibold dark:text-slate-300 appearance-none">
                            <option value="uncategorized" ${habit.category === "uncategorized" ? "selected" : ""}>Uncategorized</option>
                            <option value="work" ${habit.category === "work" ? "selected" : ""}>Work & Career</option>
                            <option value="health" ${habit.category === "health" ? "selected" : ""}>Health & Fitness</option>
                            <option value="study" ${habit.category === "study" ? "selected" : ""}>Learning & Growth</option>
                        </select>
                        <button onclick="saveEdit(${habit.id})" class="bg-emerald-700 text-white p-3 rounded-2xl shrink-0 transition-transform active:scale-95">
                            <i data-lucide="check" class="w-[18px] h-[18px]"></i>
                        </button>
                    </div>
                </div>
            `;
    } else {
      const categoryColors = {
        work: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
        health: "bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
        study: "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
        uncategorized: "bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/20"
      };
      
      const categoryLabels = {
        work: "Work",
        health: "Health",
        study: "Study",
        uncategorized: "Task"
      };
      
      const badgeColor = categoryColors[habit.category] || categoryColors.uncategorized;
      const badgeLabel = categoryLabels[habit.category] || categoryLabels.uncategorized;
      habitEl.innerHTML = `
                <div class="flex items-center">
                    <button onclick="toggleHabit(${habit.id})" class="flex-1 flex items-center p-5 text-left gap-4" ${state.isSubmitted ? "disabled" : ""}>
                        <div class="w-8 h-8 rounded-xl transition-all flex items-center justify-center ${
                          habit.completed
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                        }">
                            ${
                              habit.completed
                                ? '<i data-lucide="check" class="w-[18px] h-[18px]"></i>'
                                : '<div class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>'
                            }
                        </div>
                        <div class="flex flex-col items-start gap-1 w-full overflow-hidden">
                            <span class="text-sm font-bold transition-all truncate w-full ${
                              habit.completed
                                ? "text-emerald-800 dark:text-emerald-400 line-through opacity-70"
                                : "text-slate-700 dark:text-slate-200"
                            }">${habit.name}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold uppercase py-0.5 px-2 rounded-full border ${badgeColor} transition-opacity ${habit.completed ? "opacity-50" : ""}">
                                    ${badgeLabel}
                                </span>
                                <span class="text-[10px] font-bold text-slate-400 opacity-60">
                                    ${habit.timeLabel}
                                </span>
                            </div>
                        </div>
                    </button>
                </div>
            `;
    }

    container.appendChild(habitEl);
  });

  lucide.createIcons();
  updateConsistencyDisplay();
}

function toggleHabit(id) {
  if (state.isSubmitted || state.editingHabitId) return;
  
  const todayDate = new Date();
  const completionsKey = `completions_${todayDate.toISOString().split('T')[0]}`;
  const savedCompletions = JSON.parse(localStorage.getItem(completionsKey)) || {};

  state.habits = state.habits.map((h) => {
    if (h.id === id) {
      const isCompleted = !h.completed;
      savedCompletions[id] = isCompleted;
      return { ...h, completed: isCompleted };
    }
    return h;
  });
  
  localStorage.setItem(completionsKey, JSON.stringify(savedCompletions));
  renderHabits();
}

// Since habits are now synced with Routine Matrix, we disable the custom Add/Delete/Edit logic 
// to prevent desyncs from the main schedule.
// function showAddHabitForm() {...}
// function addHabit() {...}
// function deleteHabit(id) {...}
// function startEditing(id) {...}
// function saveEdit(id) {...}

// Calendar Functions
function navigateMonth(direction) {
  const newDate = new Date(state.viewDate);
  newDate.setMonth(newDate.getMonth() + direction);
  state.viewDate = newDate;
  renderCalendar();
}

function generateCalendarDays() {
  const year = state.viewDate.getFullYear();
  const month = state.viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

function isDaySuccessful(day) {
  if (!day) return false;
  return (day + state.viewDate.getMonth()) % 2 === 0 || day % 5 === 0;
}

function renderCalendar() {
  $("#calendar-month").textContent = state.viewDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  $("#calendar-streak").textContent = state.streak + " Days";

  const grid = $("#calendar-grid");
  grid.innerHTML = "";

  const days = generateCalendarDays();
  days.forEach((day, idx) => {
    const active = isDaySuccessful(day);
    const dayEl = document.createElement("div");
    dayEl.className = `aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
      !day
        ? "bg-transparent"
        : active
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
          : "bg-slate-50 dark:bg-slate-900/40 text-slate-400"
    }`;
    dayEl.textContent = day || "";
    grid.appendChild(dayEl);
  });
}

// Audit Functions
function renderAudit() {
  const container = $("#audit-categories");
  container.innerHTML = "";

  Object.keys(state.auditData).forEach((category) => {
    const categoryEl = document.createElement("div");
    categoryEl.className = "space-y-6";

    let metricsHTML = "";
    state.auditData[category].forEach((item, idx) => {
      const metricId = `${category}-${idx}`;
      const isExpanded = state.expandedMetric === metricId;

      metricsHTML += `
                <div class="bg-white dark:bg-slate-800/40 rounded-[2rem] border transition-all duration-300 ${
                  isExpanded
                    ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                    : "border-slate-200 dark:border-white/5"
                }">
                    <div class="p-5 space-y-4 cursor-pointer" onclick="toggleExpand('${metricId}')">
                        <div class="flex justify-between items-end">
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-bold text-slate-600 dark:text-slate-400">${item.name}</span>
                                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}"></i>
                            </div>
                            <span class="text-2xl font-black text-emerald-700 dark:text-emerald-400 leading-none">
                                ${item.score}<span class="text-xs text-slate-400 ml-1">/10</span>
                            </span>
                        </div>
                        <div onclick="event.stopPropagation()">
                            <input type="range" min="1" max="10" value="${item.score}" 
                                ${state.isSubmitted ? "disabled" : ""}
                                onchange="updateAuditScore('${category}', ${idx}, this.value)"
                                class="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-600 ${state.isSubmitted ? "opacity-30" : ""}">
                        </div>
                    </div>
                    ${
                      isExpanded
                        ? `
                        <div class="px-5 pb-5 animate-in">
                            <div class="relative">
                                <div class="absolute left-4 top-3 text-emerald-600/40">
                                    <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                                </div>
                                <textarea 
                                    ${state.isSubmitted ? "disabled" : ""}
                                    placeholder="Add context to this score..."
                                    onclick="event.stopPropagation()"
                                    onchange="updateAuditComment('${category}', ${idx}, this.value)"
                                    class="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-2xl p-3 pl-10 text-xs font-medium dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none min-h-[80px] transition-all resize-none"
                                >${item.comment}</textarea>
                            </div>
                        </div>
                    `
                        : ""
                    }
                </div>
            `;
    });

    categoryEl.innerHTML = `
            <div class="flex items-center gap-3">
                <h2 class="text-xs font-bold tracking-[0.3em] uppercase text-emerald-700 dark:text-emerald-400">${category} Sector</h2>
                <div class="flex-1 h-[1px] bg-slate-200 dark:bg-white/5"></div>
            </div>
            <div class="grid gap-6">
                ${metricsHTML}
            </div>
        `;

    container.appendChild(categoryEl);
  });

  lucide.createIcons();
}

function toggleExpand(metricId) {
  state.expandedMetric = state.expandedMetric === metricId ? null : metricId;
  renderAudit();
}

function updateAuditScore(category, index, value) {
  if (state.isSubmitted) return;
  state.auditData[category][index].score = parseInt(value);
  renderAudit();
}

function updateAuditComment(category, index, value) {
  if (state.isSubmitted) return;
  state.auditData[category][index].comment = value;
}

// Journal Functions
function handleSubmitDay() {
  if (state.isSubmitted) return;

  // Get journal values
  state.journal.wentWell = $("#went-well").value;
  state.journal.couldImprove = $("#could-improve").value;
  state.journal.tomorrowGoal = $("#tomorrow-goal").value;

  state.isSubmitted = true;
  state.streak += 1;

  // Update streak displays
  $("#streak-count").textContent = state.streak;
  $("#final-streak").textContent = state.streak + "D";

  // Show success banner and journal success
  $("#success-banner").classList.remove("hidden");
  $("#journal-form").classList.add("hidden");
  $("#journal-success").classList.remove("hidden");

  // Update buttons
  if (!state.isAddingHabit) {
    $("#add-habit-btn").classList.add("hidden");
  }

  // Re-render to disable inputs
  renderHabits();
  renderAudit();

  lucide.createIcons();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event Listeners
function initEventListeners() {
  // Theme toggle
  $("#theme-toggle").addEventListener("click", toggleDarkMode);

  // Navigation
  $$(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  $("#streak-button").addEventListener("click", () => switchTab("calendar"));
  $("#back-to-daily").addEventListener("click", () => switchTab("daily"));

  // Habit management is now integrated with Routine Matrix
  // Replacing add/cancel/edit listeners with a redirect to Routine view
  $("#edit-routine-btn").addEventListener("click", () => {
    window.location.href = "weekly_routine_matrix.html";
  });

  // Calendar navigation
  $("#prev-month").addEventListener("click", () => navigateMonth(-1));
  $("#next-month").addEventListener("click", () => navigateMonth(1));

  // Journal submission
  $("#submit-day").addEventListener("click", handleSubmitDay);
}

// Initialize App
function init() {
  initDarkMode();
  $("#current-date").textContent = formatDate();
  loadHabitsFromRoutine();
  renderHabits();
  renderAudit();
  renderCalendar();
  initEventListeners();
  switchTab("daily");
  lucide.createIcons();
}

// Run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
