const $ = (id) => document.getElementById(id);

// inputs
const screen = $("screen");
const focus  = $("focus");
const move   = $("move");
const rest   = $("rest");

// outputs
const btnSee   = $("btnSee");
const result   = $("result");
const futureEl = $("future");
const btnCopy  = $("btnCopy");
const btnAgain = $("btnAgain");

// helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// base timeline
const base = {
  morning: [
    "06:50  You wake up briefly, then close your eyes again",
    "07:10  You get ready on autopilot",
    "07:40  You snooze the alarm one more time",
    "08:00  You rush out, slightly distracted"
  ],
  commute: [
    "08:10  You listen to music on the way",
    "08:30  Same route, same scenery",
    "08:45  You scroll without thinking",
    "09:05  Your mind arrives late"
  ],
  lunch: [
    "12:10  The usual lunch",
    "12:30  A light meal",
    "12:20  Choosing food takes more time than expected",
    "12:45  Coffee holds the afternoon together"
  ],
  evening: [
    "18:50  You sit down as soon as you get home",
    "19:20  You move your body for a bit",
    "19:45  'What should I do now?' feels heavy",
    "20:10  You lie down and start counting time"
  ],
  night: [
    "22:30  Tired, but still scrolling",
    "22:50  You fall asleep thinking about tomorrow",
    "23:10  You go to bed after wrapping up the day",
    "23:50  The day ends much like the others"
  ]
};

// sharp (15)
const sharpLines = [
  "07:40  Snoozing has become a habit",
  "08:30  Same road, but your thoughts feel stuck",
  "10:30  Every distraction cuts the day shorter",
  "11:50  You pass today's tasks to tomorrow's self",
  "12:20  Even choosing lunch feels tiring",
  "14:30  This hour needs willpower, not coffee",
  "15:40  When your body feels heavy, so does your mind",
  "16:30  A chunk of time quietly disappears",
  "18:50  The day ends the moment you sit down",
  "19:45  'What should I do?' is the hardest question",
  "20:10  You replay the day while lying down",
  "21:30  Meaningless videos keep playing",
  "22:30  You're tired, but keep scrolling",
  "23:10  You go to bed without closing the day",
  "23:50  Today ends just like yesterday"
];

// warm (15)
const warmLines = [
  "06:50  You take a breath before starting the day",
  "08:10  Music makes the commute lighter",
  "10:20  Focus sticks, even if just briefly",
  "10:40  Finishing a small task brings relief",
  "12:30  A slow lunch clears your head",
  "14:10  You pause, then continue",
  "15:40  Moving your body shifts your mood",
  "16:10  A small win lifts your energy",
  "18:20  The commute ties the day into one scene",
  "19:20  Stretching helps you breathe again",
  "20:40  You decide not to worry about tomorrow yet",
  "21:40  You allow yourself real rest",
  "22:50  You put the phone down for tomorrow-you",
  "23:10  You go to bed feeling settled",
  "23:30  Today ends gently"
];

function moodPick() {
  return Math.random() < 0.5 ? pick(sharpLines) : pick(warmLines);
}

function generateFuture(s, f, m, r) {
  const lines = [];

  lines.push(pick(base.morning));
  lines.push(pick(base.commute));

  if (f >= 2) lines.push("10:20  You find a moment of real focus");
  else lines.push("10:30  Focus breaks easily");

  lines.push(moodPick());
  lines.push(pick(base.lunch));

  if (m >= 2) lines.push("15:40  Your body feels lighter");
  else lines.push("15:40  Your body feels heavy");

  lines.push(pick(base.evening));

  if (s >= 2 && r === 0) lines.push("21:30  Videos play without meaning");
  else if (r >= 2) lines.push("21:40  You actually rest");
  else lines.push(pick(base.night));

  lines.push(pick(base.night));

  let mood = "😐  The day felt ordinary, nothing special";
  if (f >= 2 && r >= 2) mood = "🙂  The day felt shorter than expected";
  if (s >= 2 && r === 0) mood = "😶  The day feels blurry in hindsight";

  lines.push("");
  lines.push(mood);

  return lines.join("\n");
}

btnSee.addEventListener("click", () => {
  const s = Number(screen.value);
  const f = Number(focus.value);
  const m = Number(move.value);
  const r = Number(rest.value);

  futureEl.textContent = generateFuture(s, f, m, r);
  result.hidden = false;
});

btnAgain.addEventListener("click", () => {
  result.hidden = true;
});

btnCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(futureEl.textContent);
    btnCopy.textContent = "Copied";
    setTimeout(() => (btnCopy.textContent = "Copy result"), 1200);
  } catch {
    alert("Select and copy manually if clipboard is blocked.");
  }
});
