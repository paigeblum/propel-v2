let _students = [];
let _funds = [
  { id: "f1", name: "USC General Scholarship Fund", balance: 125000 },
  { id: "f2", name: "UCLA Opportunity Fund", balance: 98000 },
  { id: "f3", name: "NYU First-Gen Support", balance: 54000 },
  { id: "f4", name: "Columbia Student Relief", balance: 67000 }
];

export function initStudents(seed){ if(_students.length===0){ _students = seed.map(s=>({...s})); } }
export function getStudents(){ return _students; }
export function addStudent(s){ _students.unshift(s); return s; }
export function getStudentById(id){ return _students.find(x=>x.id===id); }
export function updateStudentDonation(id, amount){
  const s = getStudentById(id);
  if(!s) return null;
  const amt = Math.max(0, Number(amount)||0);
  s.raised += amt;
  s.remainingBalance = Math.max(0, s.remainingBalance - amt);
  return s;
}

export function getFunds(){ return _funds; }
export function donateToFund(id, amount){
  const f = _funds.find(x=>x.id===id);
  if(!f) return null;
  const amt = Math.max(0, Number(amount)||0);
  f.balance += amt;
  return f;
}