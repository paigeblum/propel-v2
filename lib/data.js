// Deterministic seed for consistent demos
function mulberry32(a){ return function(){ let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; } }
const rand = mulberry32(20250904);

const first = ["Aaliyah","Diego","Sofia","Marcus","Emily","Jamal","Priya","Liam","Isabella","Noah","Grace","Ethan","Maya","Carlos","Olivia","Daniel","Zara","Jonah","Hannah","Leo"];
const last  = ["Nguyen","Martinez","Patel","Wright","Chen","Johnson","Singh","O'Brien","Garcia","Kim","Hughes","Brown","Lopez","Anderson","Smith","Rodriguez","Ali","Murphy","Clark","Khan"];
const schools = ["USC","UCLA","Columbia","NYU","Harvard","MIT","Yale","Stanford"];
const majors = ["Computer Science","Economics","Biomedical Eng","Film","Law","Finance","Physics","Sociology"];
const stories = [
  "Balancing two jobs while studying engineering.",
  "First-gen college student aiming for med school.",
  "Researching climate solutions in my program.",
  "Dreaming of founding a social impact startup.",
  "Focused on becoming an educator in underserved communities.",
  "Exploring AI art and creative technology.",
  "Interning at a hospital while finishing pre-med.",
  "Leading a robotics club and mentoring younger students."
];
const aspirations = [
  "Design accessible medical devices.",
  "Launch a nonprofit for education.",
  "Contribute to policy research.",
  "Build sustainable housing solutions.",
  "Teach computer science at high schools.",
  "Pursue a PhD in physics.",
  "Direct documentaries about social issues.",
  "Create AI tools for artists."
];

function pick(arr){ return arr[Math.floor(rand()*arr.length)]; }
function money(min,max){ return Math.floor(min + rand()*(max-min)); }
function pass(){ return String(100000 + Math.floor(rand()*900000)); }

export const seedStudents = Array.from({length: 60}).map((_,i)=>{
  const f = pick(first), l = pick(last);
  const total = money(40000, 140000);
  const remaining = money(12000, Math.max(20000, total));
  return {
    id: `s${i+1}`,
    firstName: f,
    lastName: l,
    shareName: rand() > 0.25,
    school: pick(schools),
    major: pick(majors),
    remainingBalance: remaining,
    totalBalance: total,
    paymentsRemaining: money(36, 120),
    story: pick(stories),
    aspirations: pick(aspirations),
    verificationFileName: "Verification.pdf",
    passcode: pass(),
    raised: money(500, Math.min(20000, total - Math.floor(remaining*0.5)))
  };
});