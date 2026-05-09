
const SAMPLE_DATASETS = {
  sales:    { title:'Monthly Sales',    labels:'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug',  values:'65,59,80,81,56,72,88,95',   values2:'45,52,60,70,48,63,75,82' },
  weather:  { title:'Temperature (°C)', labels:'Mon,Tue,Wed,Thu,Fri,Sat,Sun',       values:'22,19,25,28,24,30,27',      values2:'12,10,14,16,13,18,15' },
  market:   { title:'Market Share',     labels:'Brand A,Brand B,Brand C,Brand D,Brand E', values:'35,25,20,12,8',  values2:'' },
  students: { title:'Student Scores',   labels:'Math,Science,English,History,Art', values:'78,85,72,88,91',           values2:'65,70,80,75,95' },
  stocks:   { title:'Stock Performance',labels:'Q1,Q2,Q3,Q4',                       values:'142,178,156,203',          values2:'98,115,108,134' },
};

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
const state = {
  chartType: 'bar',
  palette: 'ibm',
  showGrid: true,
  showLegend: true,
  showDatalabels: true,
  fillArea: false,
  enableAnimation: true,
  highContrast: false,
  pointStyle: 'circle',
  pointSize: 6,
  borderWidth: 3,
  lineTension: 0.4,
  cbType: 'normal',
  rating: 0,
  chartData: null,
  charts: {},
  simCharts: {}
};

// ═══════════════════════════════════════════════════════════
// PALETTES
// ═══════════════════════════════════════════════════════════
const PALETTES = {
  ibm:    { name:'IBM Accessible',  colors:['#648fff','#785ef0','#dc267f','#fe6100','#ffb000','#00b945','#00d9ff','#aa00ff','#ff6e9c','#00e5a0','#ffa040','#9d7cff','#ff5e78','#00c6d7','#d4af37','#ff91a4'] },
  tol:    { name:'Tol Bright',      colors:['#4477AA','#EE6677','#228833','#CCBB44','#66CCEE','#AA3377','#BBBBBB','#332288','#88CCAA','#DDCC77','#CC6677','#AA4499','#117733','#999933','#44AA99','#6699CC'] },
  wong:   { name:'Wong',            colors:['#E69F00','#56B4E9','#009E73','#F0E442','#0072B2','#D55E00','#CC79A7','#999999','#EDB120','#7EB2DD','#4DBEEE','#F4E300','#3399CC','#FF8C00','#DA70D6','#A9A9A9'] },
  viridis:{ name:'Viridis',         colors:['#440154','#31688e','#35b779','#fde724','#90d743','#21918c','#453781','#2a788e','#238a8d','#1f9e89','#25b17e','#51c468','#85d54a','#c2df23','#fde725','#46327e'] },
  okabe:  { name:'Okabe-Ito',       colors:['#E69F00','#56B4E9','#009E73','#F0E442','#0072B2','#D55E00','#CC79A7','#999999','#F5A623','#7ED3F7','#33D69F','#FFE920','#4A9FD8','#FF6B35','#E89AC7','#B8B8B8'] },
  cividis:{ name:'Cividis (CB-safe)',colors:['#00224e','#123570','#3b496c','#575d6d','#707173','#8a8678','#a59c74','#c3b369','#e1cc55','#f7e225','#405c73','#0d6e8c','#1fa195','#39ce8c','#85e279','#caf270'] },
  hicontrast:{ name:'High Contrast', colors:['#1a1a1a','#FFFFFF','#FF6600','#0000DD','#DDDD00','#DD00DD','#00CCCC','#EE0000','#00CC00','#8B4513','#4B0082','#FF69B4','#00CED1','#FF8C00','#7FFF00','#DC143C'] }
};

const ORIGINAL_COLORS = ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#FF6384','#C9CBCF','#E74C3C','#3498DB','#F39C12','#1ABC9C','#9B59B6','#E67E22','#95A5A6','#34495E'];

const CHART_TYPES = [
  { id:'bar',        icon:'📊', label:'Bar'       },
  { id:'stackedBar', icon:'🗂️', label:'Stacked'   },
  { id:'line',       icon:'📈', label:'Line'      },
  { id:'area',       icon:'🌊', label:'Area'      },
  { id:'pie',        icon:'🥧', label:'Pie'       },
  { id:'doughnut',   icon:'🍩', label:'Doughnut'  },
  { id:'bubble',     icon:'🫧', label:'Bubble'    },
  { id:'scatter',    icon:'🔵', label:'Scatter'   },
  { id:'radar',      icon:'🎯', label:'Radar'     },
  { id:'polarArea',  icon:'⭕', label:'Polar'     },
  { id:'histogram',  icon:'📉', label:'Histogram' },
];

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildChartTypes();
  buildPalettes();
  buildSampleBtns();
  setupCSV();
  setupStars();
  setupKeyboard();
  updateClock();
  setInterval(updateClock, 1000);

  // start in light mode
  document.body.classList.add('light');
  document.getElementById('themeIcon').textContent = '☀️';
  document.getElementById('themeLabel').textContent = 'Dark';

  generateCharts();

  // ── EFFECTS ENGINE ─────────────────────────────────────────
  initLoadingOverlay();
  initParticles();
  initCursorGlow();
  initRipple();
  initCardTilt();
  initTabIndicator();
  initScrollTop();
  initScrollReveal();
  initDynamicTooltip();
});

// ═══════════════════════════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════════════════════════
function updateClock() {
  const now = new Date();
  document.getElementById('clockTime').textContent = now.toLocaleTimeString();
  document.getElementById('clockDate').textContent = now.toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric', year:'numeric' });
}

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  document.getElementById('themeIcon').textContent = isLight ? '☀️' : '🌙';
  document.getElementById('themeLabel').textContent = isLight ? 'Dark' : 'Light';
  if (state.chartData) setTimeout(generateCharts, 50);
}

// ═══════════════════════════════════════════════════════════
// SAMPLE DATASETS
// ═══════════════════════════════════════════════════════════
function buildSampleBtns() {
  const wrap = document.getElementById('sampleBtns');
  if (!wrap) return;
  wrap.innerHTML = '';
  Object.entries(SAMPLE_DATASETS).forEach(([key,ds]) => {
    const btn = document.createElement('button');
    btn.className = 'sample-btn';
    btn.textContent = ds.title;
    btn.onclick = () => loadSample(key);
    wrap.appendChild(btn);
  });
}

function loadSample(key) {
  const ds = SAMPLE_DATASETS[key];
  if (!ds) return;
  document.getElementById('chartTitle').value = ds.title;
  document.getElementById('labelsInput').value = ds.labels;
  document.getElementById('valuesInput').value = ds.values;
  document.getElementById('values2Input').value = ds.values2;
  // Show Dataset 2 if this sample has values2, or if current chart type supports it
  const supportsTwo = ['line','scatter','radar','area','bubble','stackedBar'];
  document.getElementById('values2Group').style.display =
    (ds.values2 || supportsTwo.includes(state.chartType)) ? 'block' : 'none';
  generateCharts();
  showToast(`Loaded: ${ds.title}`, 'info');
}

function randomData() {
  const count = Math.floor(Math.random()*5)+4;
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const lbls = months.slice(0,count);
  const v1 = Array.from({length:count},()=>Math.floor(Math.random()*90)+10);
  const v2 = Array.from({length:count},()=>Math.floor(Math.random()*80)+5);
  document.getElementById('labelsInput').value = lbls.join(', ');
  document.getElementById('valuesInput').value = v1.join(', ');
  document.getElementById('values2Input').value = v2.join(', ');
  document.getElementById('chartTitle').value = 'Random Dataset';
  generateCharts();
  showToast('Random data generated!', 'success');
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'g' || e.key === 'G') generateCharts();
    if (e.key === 't' || e.key === 'T') toggleTheme();
    if (e.key === 'r' || e.key === 'R') randomData();
    if (e.key === 'h' || e.key === 'H') { const t=document.getElementById('hcHeaderBtn'); if(t) toggleHighContrast(t); }
    if (e.key === '1') switchTabById('charts');
    if (e.key === '2') switchTabById('advanced');
    if (e.key === '3') switchTabById('simulator');
    if (e.key === '4') switchTabById('feedback');
    if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen();
  });
}

function toggleHighContrast(el) {
  el.classList.toggle('on');
  state.highContrast = el.classList.contains('on');
  document.body.classList.toggle('high-contrast', state.highContrast);
  // Sync the header button visual state
  const headerBtn = document.getElementById('hcHeaderBtn');
  const hcIcon = document.getElementById('hcIcon');
  const hcLabel = document.getElementById('hcLabel');
  if (headerBtn) {
    if (state.highContrast) {
      headerBtn.style.borderColor = 'var(--accent)';
      headerBtn.style.color = 'var(--accent)';
    } else {
      headerBtn.style.borderColor = '';
      headerBtn.style.color = '';
    }
  }
  if (hcIcon) hcIcon.textContent = state.highContrast ? '🟡' : '⬛';
  if (hcLabel) hcLabel.textContent = state.highContrast ? 'Hi-C ON' : 'Hi-C';
  if (state.chartData) generateCharts();
  showToast(state.highContrast ? '⬛ High Contrast ON' : '🎨 High Contrast OFF', 'info');
}

function switchTabById(name) {
  const tabBtns = document.querySelectorAll('.tab');
  const names = ['charts','advanced','simulator','feedback'];
  const idx = names.indexOf(name);
  if (idx>=0 && tabBtns[idx]) switchTab(name, tabBtns[idx]);
}

// ═══════════════════════════════════════════════════════════
// ACCESSIBILITY SCORE
// ═══════════════════════════════════════════════════════════
function calcAccessScore() {
  const pal = PALETTES[state.palette];
  const colors = pal.colors.slice(0,6);
  let passCount = 0, total = 0;
  for (let i=0;i<colors.length-1;i++) {
    for (let j=i+1;j<colors.length;j++) {
      total++;
      if (getContrastRatio(colors[i],colors[j]) >= 3) passCount++;
    }
  }
  const score = Math.round((passCount/total)*100);
  return score;
}

function hexToLum(hex) {
  const h = hex.replace('#','');
  const r=parseInt(h.slice(0,2),16)/255, g=parseInt(h.slice(2,4),16)/255, b=parseInt(h.slice(4,6),16)/255;
  const toLinear = c => c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4);
  return 0.2126*toLinear(r)+0.7152*toLinear(g)+0.0722*toLinear(b);
}

function getContrastRatio(c1,c2) {
  const l1=hexToLum(c1), l2=hexToLum(c2);
  const lighter=Math.max(l1,l2), darker=Math.min(l1,l2);
  return (lighter+0.05)/(darker+0.05);
}

function updateScoreBadge(score) {
  const el = document.getElementById('accessScore');
  if (!el) return;
  const grade = score>=85?'A+':score>=70?'A':score>=55?'B':score>=40?'C':'D';
  const color = score>=70?'#39ff14':score>=50?'#ffb000':'#ff4d6d';
  el.innerHTML = `<span style="color:${color};font-weight:800;font-family:var(--font-mono)">${grade} ${score}%</span> <span style="font-size:0.75em;color:var(--text3)">WCAG contrast</span>`;
}

// ═══════════════════════════════════════════════════════════
// PRINT
// ═══════════════════════════════════════════════════════════
function printChart() {
  if (!state.charts['accessible']) {
    showToast('Generate a chart first','error');
    return;
  }

  const canvas = document.getElementById('accessibleChart');
  const dataUrl = canvas.toDataURL('image/png');

  const w = window.open('', '_blank');

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ChromaVision Chart</title>
      <style>
        body{
          margin:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:40px;
          font-family:sans-serif;
        }
        img{
          max-width:100%;
          border:1px solid #ccc;
          border-radius:8px;
        }
        h2{
          color:#333;
          margin-bottom:20px;
        }
        p{
          color:#666;
          font-size:13px;
          margin-top:12px;
        }
      </style>
    </head>
    <body>
      <h2>
        ChromaVision — ${document.getElementById('chartTitle').value || 'Chart'}
      </h2>
      <img src="${dataUrl}" />
      <p>
        Palette: ${state.palette} |
        Vision mode: ${state.cbType} |
        Generated: ${new Date().toLocaleString()}
      </p>
    </body>
    </html>
  `);
  w.document.close();

  // SAFE way to trigger print
  w.onload = function () {
    w.print();
  };

  showToast('Opening print dialog…','info');
}

function switchTab(name, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['charts','advanced','simulator','feedback'].forEach(t => {
    const el = document.getElementById('tab-'+t);
    if (el) el.style.display = t===name ? 'block' : 'none';
  });
  // Refresh charts when switching tabs — Canvas may need resize after display:none→block
  if (name==='simulator') {
    requestAnimationFrame(()=> generateSimulator());
  }
  if (name==='advanced') {
    requestAnimationFrame(()=> updatePreview());
  }
}

// ═══════════════════════════════════════════════════════════
// BUILD UI
// ═══════════════════════════════════════════════════════════
function buildChartTypes() {
  const wrap = document.getElementById('chartTypes');
  wrap.innerHTML = '';
  CHART_TYPES.forEach(ct => {
    const btn = document.createElement('button');
    btn.className = 'ct-btn' + (ct.id===state.chartType ? ' active' : '');
    btn.innerHTML = `<span class="icon">${ct.icon}</span><span>${ct.label}</span>`;
    btn.onclick = () => {
      document.querySelectorAll('.ct-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.chartType = ct.id;
      // Chart types that support a second dataset
      const supportsTwo = ['line','scatter','radar','area','bubble','stackedBar'];
      const v2group = document.getElementById('values2Group');
      const v2label = document.getElementById('values2Label');
      const v2input = document.getElementById('values2Input');
      if (supportsTwo.includes(ct.id)) {
        v2group.style.display = 'block';
        const hints = {
          line:       { label:'Dataset 2',            ph:'e.g., 45, 62, 70, 88, 50, 66',  hint:'Same number of values as Dataset 1' },
          area:       { label:'Dataset 2 (filled)',   ph:'e.g., 45, 62, 70, 88, 50, 66',  hint:'Fills below the line — match Dataset 1 count' },
          scatter:    { label:'Dataset 2 (X,Y pairs)',ph:'e.g., 1,20 2,35 3,28 4,50',     hint:'Space-separated X,Y pairs e.g. 1,20 2,35' },
          bubble:     { label:'Dataset 2 (sizes → radius)', ph:'e.g., 30, 80, 50, 120, 40', hint:'Values become bubble radius — match Dataset 1 count' },
          radar:      { label:'Dataset 2',            ph:'e.g., 75, 60, 90, 55, 80',       hint:'One value per axis label' },
          stackedBar: { label:'Dataset 2 (stacks on top)',  ph:'e.g., 30, 20, 40, 25, 35, 45', hint:'Stacks on top of Dataset 1 — match count' },
        };
        const h = hints[ct.id] || { label:'Dataset 2', ph:'e.g., 45, 62, 70', hint:'' };
        if (v2label) v2label.textContent = h.label;
        if (v2input) v2input.placeholder = h.ph;
        const v2hint = document.getElementById('values2Hint');
        if (v2hint) v2hint.textContent = h.hint;
      } else {
        v2group.style.display = 'none';
      }
    };
    wrap.appendChild(btn);
  });
}

function buildPalettes() {
  const wrap = document.getElementById('palettes');
  wrap.innerHTML = '';
  Object.entries(PALETTES).forEach(([key, pal]) => {
    const btn = document.createElement('button');
    btn.className = 'pal-btn' + (key===state.palette ? ' active' : '');
    const dots = pal.colors.slice(0,5).map(c => `<span class="pal-dot" style="background:${c}"></span>`).join('');
    btn.innerHTML = `<div class="pal-dots">${dots}</div>${pal.name}`;
    btn.onclick = () => {
      document.querySelectorAll('.pal-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.palette = key;
    };
    wrap.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════════════
// TOGGLE OPTIONS
// ═══════════════════════════════════════════════════════════
function toggleOpt(key, el) {
  el.classList.toggle('on');
  state[key] = el.classList.contains('on');
}

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════
function showToast(msg, type='info') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100px)'; t.style.transition='all 0.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}

// ═══════════════════════════════════════════════════════════
// COLORBLIND SIMULATION
// ═══════════════════════════════════════════════════════════
const CB_MATRICES = {
  protanopia:    [[0.567,0.433,0],[0.558,0.442,0],[0,0.242,0.758]],
  deuteranopia:  [[0.625,0.375,0],[0.7,0.3,0],[0,0.3,0.7]],
  tritanopia:    [[0.95,0.05,0],[0,0.433,0.567],[0,0.475,0.525]],
  achromatopsia: [[0.299,0.587,0.114],[0.299,0.587,0.114],[0.299,0.587,0.114]]
};

function simulateCB(hex, type) {
  if (type==='normal') return hex;
  const h = hex.replace('#','');
  let r = parseInt(h.slice(0,2),16)/255, g = parseInt(h.slice(2,4),16)/255, b = parseInt(h.slice(4,6),16)/255;
  const m = CB_MATRICES[type];
  const toH = v => Math.max(0,Math.min(255,Math.round(v*255))).toString(16).padStart(2,'0');
  return `#${toH(m[0][0]*r+m[0][1]*g+m[0][2]*b)}${toH(m[1][0]*r+m[1][1]*g+m[1][2]*b)}${toH(m[2][0]*r+m[2][1]*g+m[2][2]*b)}`;
}

// ═══════════════════════════════════════════════════════════
// PATTERNS
// ═══════════════════════════════════════════════════════════
const PATTERN_FNS = [
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(i*10,0);ctx.lineTo(i*10+20,20);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<3;i++) for(let j=0;j<3;j++){ctx.beginPath();ctx.arc(i*10+5,j*10+5,2.5,0,Math.PI*2);ctx.fill();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(i*10,0);ctx.lineTo(i*10+20,20);ctx.stroke();ctx.beginPath();ctx.moveTo(i*10,20);ctx.lineTo(i*10+20,0);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(i*5,0);ctx.lineTo(i*5,20);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,i*5);ctx.lineTo(20,i*5);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<2;i++) for(let j=0;j<2;j++){const x=i*10+5,y=j*10+5;ctx.beginPath();ctx.moveTo(x-3,y);ctx.lineTo(x+3,y);ctx.moveTo(x,y-3);ctx.lineTo(x,y+3);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<=4;i++){ctx.beginPath();ctx.moveTo(i*5,0);ctx.lineTo(i*5,20);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*5);ctx.lineTo(20,i*5);ctx.stroke();} },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); const alt=isLight()?'rgba(0,0,0,0.18)':'rgba(255,255,255,0.25)'; for(let i=0;i<4;i++) for(let j=0;j<4;j++){if((i+j)%2===0){ctx.fillStyle=alt;ctx.fillRect(i*5,j*5,5,5);} } ctx.fillStyle=c; },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); ctx.beginPath();ctx.moveTo(0,10);for(let i=0;i<5;i++){ctx.lineTo(i*5+2,7);ctx.lineTo(i*5+5,10);}ctx.stroke(); },
  (ctx,c)=>{ ctx.fillStyle=c; ctx.fillRect(0,0,20,20); for(let i=0;i<2;i++) for(let j=0;j<2;j++){const x=i*10+5,y=j*10+5;ctx.beginPath();ctx.moveTo(x,y-3);ctx.lineTo(x+3,y);ctx.lineTo(x,y+3);ctx.lineTo(x-3,y);ctx.closePath();ctx.stroke();} },
];

function createPattern(ctx, color, idx) {
  // Create pattern on a fresh offscreen canvas each time
  // Using a separate canvas ensures patterns aren't tied to the chart's GL context
  const c = document.createElement('canvas');
  c.width=20; c.height=20;
  const cx = c.getContext('2d');
  const hc = document.body.classList.contains('high-contrast');
  const strokeCol = isLight() && !hc ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.72)';
  cx.strokeStyle = strokeCol;
  cx.fillStyle   = strokeCol;
  cx.lineWidth=2;
  PATTERN_FNS[idx % PATTERN_FNS.length](cx, color);
  // ctx.createPattern needs to be called on the TARGET canvas's context
  return ctx.createPattern(c,'repeat');
}

// ═══════════════════════════════════════════════════════════
// DATA HELPERS
// ═══════════════════════════════════════════════════════════
function parseValues(str) {
  return str.split(',').map(v=>parseFloat(v.trim())).filter(v=>!isNaN(v));
}

function binHistogram(data, bins=10) {
  const mn=Math.min(...data), mx=Math.max(...data), w=(mx-mn)/bins;
  const counts=new Array(bins).fill(0), lbls=[];
  for(let i=0;i<bins;i++){
    const s=mn+i*w, e=s+w;
    lbls.push(`${s.toFixed(1)}–${e.toFixed(1)}`);
    data.forEach(v=>{ if(v>=s&&(i===bins-1?v<=e:v<e)) counts[i]++; });
  }
  return {labels:lbls,data:counts};
}

function parseScatter(str) {
  const v=str.split(',').map(s=>parseFloat(s.trim())).filter(v=>!isNaN(v));
  const pts=[];
  for(let i=0;i<v.length-1;i+=2) pts.push({x:v[i],y:v[i+1]});
  return pts;
}

function isLight() { return document.body.classList.contains('light'); }
function isHC()    { return document.body.classList.contains('high-contrast'); }

// Axis tick labels — must be readable on chart canvas background
function tickColor() {
  if (isHC()) return '#ffffff';
  return isLight() ? '#1a2f4a' : '#c8daf0';
}
// Grid lines
function gridColor() {
  if (isHC()) return 'rgba(255,255,255,0.35)';
  return isLight() ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';
}
// Axis title / radar point labels
function axisLabelColor() {
  if (isHC()) return '#ffff00';
  return isLight() ? '#0284c7' : '#38bdf8';
}
// Point border color — visible on all backgrounds
function pointBorderCol() {
  if (isHC()) return '#ffff00';
  return isLight() ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.8)';
}
// Border for original chart bars/pie slices
function origBorderCol() {
  if (isHC()) return '#ffffff';
  return isLight() ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.18)';
}
// Data label text drawn directly on canvas
function dataLabelColor() {
  if (isHC()) return '#ffff00';
  return isLight() ? '#0c1a2e' : '#ffffff';
}

// ═══════════════════════════════════════════════════════════
// CHART BUILDER
// ═══════════════════════════════════════════════════════════
function buildConfig(type, labels, datasets, extra={}) {
  const isPie = ['pie','doughnut','polarArea'].includes(type);
  const isRadar = type==='radar';
  const isStacked = type==='stackedBar';
  const isBubble  = type==='bubble';
  const isArea    = type==='area';
  const chartJsType = (type==='histogram'||type==='stackedBar') ? 'bar'
                    : (type==='area') ? 'line'
                    : (type==='bubble') ? 'bubble'
                    : type;

  // Canvas background fill — ensures chart is readable in all themes including HC
  const bgPlugin = {
    id: 'chromaBg',
    beforeDraw(chart) {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = isHC() ? '#000000' : (isLight() ? '#ffffff' : 'transparent');
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  };

  // Data label plugin — draws values on bars/segments, crucial for CVD users
  const dataLabelPlugin = {
    id: 'cvdDataLabels',
    afterDatasetsDraw(chart) {
      if (!state.showDatalabels) return;
      const { ctx } = chart;
      const isScatterType = chart.config.type === 'scatter';
      ctx.save();
      chart.data.datasets.forEach((dataset, di) => {
        const meta = chart.getDatasetMeta(di);
        if (meta.hidden) return;
        meta.data.forEach((element, idx) => {
          const val = dataset.data[idx];
          if (val === null || val === undefined) return;
          if (isScatterType) return;
          const label = typeof val === 'object' ? '' : String(val);
          if (!label) return;
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          // Shadow for legibility on patterned backgrounds
          ctx.shadowColor = isLight() && !isHC() ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 4;
          ctx.fillStyle = dataLabelColor();
          if (isPie) {
            try {
              const cp = element.getCenterPoint();
              ctx.textBaseline = 'middle';
              ctx.fillText(label, cp.x, cp.y);
            } catch(e) {}
          } else {
            const { x, y } = element;
            ctx.textBaseline = 'bottom';
            ctx.fillText(label, x, y - 5);
          }
          ctx.shadowBlur = 0;
        });
      });
      ctx.restore();
    }
  };

  const cfg = {
    type: chartJsType,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: state.enableAnimation ? { duration: 800 } : false,
      plugins: {
        legend: {
          display: state.showLegend,
          labels: {
            color: tickColor(),
            font: { size: 12, family: 'Inter, sans-serif', weight: '500' },
            padding: 16,
            usePointStyle: true,
            boxWidth: 12,
            boxHeight: 12
          }
        }
      },
      ...extra
    },
    plugins: [bgPlugin, dataLabelPlugin]
  };

  if (!isPie && !isRadar) {
    cfg.options.scales = {
      y: {
        beginAtZero: true,
        stacked: isStacked,
        grid: {
          display: state.showGrid,
          color: gridColor(),
          lineWidth: isHC() ? 1.5 : 1
        },
        border: { color: isHC() ? '#ffffff' : (isLight() ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') },
        ticks: {
          color: tickColor(),
          font: { size: 11, family: 'Inter, sans-serif' },
          maxTicksLimit: 8
        },
        title: {
          display: !!document.getElementById('yAxisLabel').value,
          text: document.getElementById('yAxisLabel').value || '',
          color: axisLabelColor(),
          font: { size: 13, weight: 'bold', family: 'Inter, sans-serif' }
        }
      },
      x: {
        stacked: isStacked,
        grid: {
          display: state.showGrid,
          color: gridColor(),
          lineWidth: isHC() ? 1.5 : 1
        },
        border: { color: isHC() ? '#ffffff' : (isLight() ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') },
        ticks: {
          color: tickColor(),
          font: { size: 11, family: 'Inter, sans-serif' },
          maxRotation: 45,
          minRotation: 0
        }
      }
    };
  }
  if (isRadar) {
    cfg.options.scales = {
      r: {
        beginAtZero: true,
        grid: { color: gridColor(), lineWidth: isHC() ? 1.5 : 1 },
        ticks: {
          color: tickColor(),
          backdropColor: isHC() ? 'rgba(0,0,0,0.7)' : (isLight() ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)'),
          font: { size: 10, family: 'Inter, sans-serif' }
        },
        pointLabels: {
          color: axisLabelColor(),
          font: { size: 12, weight: 'bold', family: 'Inter, sans-serif' }
        },
        angleLines: { color: gridColor(), lineWidth: isHC() ? 1.5 : 1 }
      }
    };
  }
  return cfg;
}

function destroyChart(id) {
  if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; }
}

// ═══════════════════════════════════════════════════════════
// GENERATE CHARTS
// ═══════════════════════════════════════════════════════════
function _generateChartsCore() {
  const title = document.getElementById('chartTitle').value || 'Chart';
  let labels = document.getElementById('labelsInput').value.split(',').map(l=>l.trim());
  let values = parseValues(document.getElementById('valuesInput').value);
  let values2 = parseValues(document.getElementById('values2Input').value||'');
  const ps = parseInt(document.getElementById('pointSize').value)||6;
  const pt = document.getElementById('pointStyle').value;
  const bw = parseInt(document.getElementById('borderWidth').value)||3;
  const lt = parseFloat(document.getElementById('lineTension').value)||0.4;
  const ct = state.chartType;

  if (values.length===0) { showToast('Please enter valid values','error'); return; }

  // Histogram preprocessing
  if (ct==='histogram') {
    const h = binHistogram(values);
    labels = h.labels; values = h.data;
  }

  // Bubble: generate r (radius) values from values2 if available, else auto
  let bubblePts1=[], bubblePts2=[];
  if (ct==='bubble') {
    bubblePts1 = values.map((v,i) => ({ x: i+1, y: v, r: values2[i] ? Math.max(4, Math.min(30, values2[i]/4)) : Math.max(6, Math.min(28, v/10)) }));
    bubblePts2 = values2.length ? values2.map((v,i) => ({ x: i+1.4, y: v, r: Math.max(4, Math.min(24, v/8)) })) : [];
  }

  // Scatter
  let scatterPts1=[], scatterPts2=[];
  if (ct==='scatter') {
    scatterPts1 = parseScatter(document.getElementById('valuesInput').value);
    scatterPts2 = parseScatter(document.getElementById('values2Input').value||'');
  }

  const isPie    = ['pie','doughnut','polarArea'].includes(ct);
  const isLine   = ct==='line' || ct==='radar' || ct==='area';
  const isScatter= ct==='scatter';
  const isBubble = ct==='bubble';
  const isStacked= ct==='stackedBar';

  const accColors = PALETTES[state.palette].colors;

  // Store for later
  state.chartData = { title, labels, values, values2, scatterPts1, scatterPts2, bubblePts1, bubblePts2, ct, ps, pt, bw, lt };

  // ─── ORIGINAL ─────────────────────────────────────────
  destroyChart('original');
  const origCtx = document.getElementById('originalChart').getContext('2d');
  // Set data-type for colored top border CSS
  const origCard = document.getElementById('originalChart')?.closest('.chart-card');
  const accCard  = document.getElementById('accessibleCard');
  if (origCard) origCard.dataset.type = ct;
  if (accCard)  accCard.dataset.type  = ct;
  let origDS;
  if (isBubble) {
    origDS = [{ label:'Dataset 1', data:bubblePts1, backgroundColor:ORIGINAL_COLORS[0]+'99', borderColor:ORIGINAL_COLORS[0], borderWidth:2 }];
    if (bubblePts2.length) origDS.push({ label:'Dataset 2', data:bubblePts2, backgroundColor:ORIGINAL_COLORS[1]+'99', borderColor:ORIGINAL_COLORS[1], borderWidth:2 });
  } else if (isScatter) {
    origDS = [{ label:'Dataset 1', data:scatterPts1, backgroundColor:ORIGINAL_COLORS[0], borderColor:ORIGINAL_COLORS[0], pointRadius:ps, pointStyle:pt, pointBorderWidth:2, pointBorderColor:pointBorderCol() }];
    if (scatterPts2.length) origDS.push({ label:'Dataset 2', data:scatterPts2, backgroundColor:ORIGINAL_COLORS[1], borderColor:ORIGINAL_COLORS[1], pointRadius:ps, pointStyle:pt, pointBorderWidth:2, pointBorderColor:pointBorderCol() });
  } else if (ct==='area') {
    origDS = [{ label:'Dataset 1', data:values, borderColor:ORIGINAL_COLORS[0], backgroundColor:ORIGINAL_COLORS[0]+'44', tension:lt, pointRadius:ps, pointStyle:pt, borderWidth:2.5, fill:true, pointBorderWidth:2, pointBorderColor:pointBorderCol() }];
    if (values2.length) origDS.push({ label:'Dataset 2', data:values2, borderColor:ORIGINAL_COLORS[1], backgroundColor:ORIGINAL_COLORS[1]+'33', tension:lt, pointRadius:ps, pointStyle:pt, borderWidth:2.5, fill:true, pointBorderWidth:2, pointBorderColor:pointBorderCol() });
  } else if (isStacked) {
    origDS = [{ label:'Dataset 1', data:values, backgroundColor:ORIGINAL_COLORS[0]+'cc', borderColor:ORIGINAL_COLORS[0], borderWidth:1.5 }];
    if (values2.length) origDS.push({ label:'Dataset 2', data:values2, backgroundColor:ORIGINAL_COLORS[1]+'cc', borderColor:ORIGINAL_COLORS[1], borderWidth:1.5 });
  } else if (isLine) {
    origDS = [{ label:'Dataset 1', data:values, borderColor:ORIGINAL_COLORS[0], backgroundColor:ORIGINAL_COLORS[0]+'33', tension:lt, pointRadius:ps, pointStyle:pt, borderWidth:2.5, fill:state.fillArea, pointBorderWidth:2, pointBorderColor:pointBorderCol() }];
    if (values2.length) origDS.push({ label:'Dataset 2', data:values2, borderColor:ORIGINAL_COLORS[1], backgroundColor:ORIGINAL_COLORS[1]+'33', tension:lt, pointRadius:ps, pointStyle:pt, borderWidth:2.5, fill:state.fillArea, pointBorderWidth:2, pointBorderColor:pointBorderCol() });
  } else {
    origDS = [{ label:title, data:values, backgroundColor:ORIGINAL_COLORS.slice(0,values.length), borderColor:origBorderCol(), borderWidth:2 }];
  }
  state.charts['original'] = new Chart(origCtx, buildConfig(ct, (isScatter||isBubble)?undefined:labels, origDS));

  // ─── ACCESSIBLE ───────────────────────────────────────
  buildAccessibleChart(accColors);
  
  // ─── INSIGHT ──────────────────────────────────────────
  if (!isScatter) generateInsight(values, labels);

  // Update advanced preview too
  updatePreview();

  // Update access score
  updateScoreBadge(calcAccessScore());

  showToast('Charts generated!','success');
}

function buildAccessibleChart(accColors) {
  const { labels, values, values2, scatterPts1, scatterPts2, bubblePts1, bubblePts2, ct, ps, pt, bw, lt, title } = state.chartData;
  const cbType = state.cbType;
  const txColors = accColors.map(c=>simulateCB(c, cbType));
  const isPie    = ['pie','doughnut','polarArea'].includes(ct);
  const isLine   = ct==='line'||ct==='radar'||ct==='area';
  const isScatter= ct==='scatter';
  const isBubble = ct==='bubble';
  const isStacked= ct==='stackedBar';

  const POINT_STYLES  = ['circle', 'triangle', 'rect', 'star', 'cross', 'dash'];
  const DASH_PATTERNS = [[], [8,4], [2,4], [8,4,2,4], [16,4]];

  destroyChart('accessible');
  const ctx = document.getElementById('accessibleChart').getContext('2d');

  let accDS;
  if (isBubble) {
    accDS = [{ label:'Dataset 1', data:bubblePts1||[], backgroundColor:txColors[0]+'aa', borderColor:txColors[0], borderWidth:2 }];
    if (bubblePts2&&bubblePts2.length) accDS.push({ label:'Dataset 2', data:bubblePts2, backgroundColor:txColors[1]+'aa', borderColor:txColors[1], borderWidth:2 });
  } else if (isScatter) {
    accDS = [{ label:'Dataset 1', data:scatterPts1, backgroundColor:txColors[0], borderColor:txColors[0], pointRadius:ps+2, pointStyle:POINT_STYLES[0], pointBorderWidth:2.5, pointBorderColor:pointBorderCol() }];
    if (scatterPts2.length) accDS.push({ label:'Dataset 2', data:scatterPts2, backgroundColor:txColors[1], borderColor:txColors[1], pointRadius:ps+2, pointStyle:POINT_STYLES[1], pointBorderWidth:2.5, pointBorderColor:pointBorderCol() });
  } else if (ct==='area') {
    accDS = [{ label:'Dataset 1', data:values, borderColor:txColors[0], backgroundColor:txColors[0]+'55', tension:lt, pointRadius:ps+2, pointStyle:POINT_STYLES[0], borderWidth:bw+1, borderDash:DASH_PATTERNS[0], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true }];
    if (values2.length) accDS.push({ label:'Dataset 2', data:values2, borderColor:txColors[1], backgroundColor:txColors[1]+'44', tension:lt, pointRadius:ps+2, pointStyle:POINT_STYLES[1], borderWidth:bw+1, borderDash:DASH_PATTERNS[1], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true });
  } else if (isStacked) {
    const bgPats = txColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
    accDS = [{ label:'Dataset 1', data:values, backgroundColor:bgPats, borderColor:origBorderCol(), borderWidth:1.5 }];
    if (values2.length) {
      const bgPats2 = txColors.slice(0,values2.length).map((c,i)=>createPattern(ctx,c,i+4));
      accDS.push({ label:'Dataset 2', data:values2, backgroundColor:bgPats2, borderColor:origBorderCol(), borderWidth:1.5 });
    }
  } else if (isLine) {
    accDS = [{ label:'Dataset 1', data:values, borderColor:txColors[0], backgroundColor:txColors[0]+'44', tension:lt, pointRadius:ps+2, pointStyle:POINT_STYLES[0], borderWidth:bw+1, borderDash:DASH_PATTERNS[0], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:state.fillArea }];
    if (values2.length) accDS.push({ label:'Dataset 2', data:values2, borderColor:txColors[1], backgroundColor:txColors[1]+'44', tension:lt, pointRadius:ps+2, pointStyle:POINT_STYLES[1], borderWidth:bw+1, borderDash:DASH_PATTERNS[1], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:state.fillArea });
  } else if (isPie) {
    const bgPats = txColors.slice(0,values.length).map((c,i) => createPattern(ctx, c, i));
    const borderWidths = values.map((_,i) => i%2===0 ? bw+2 : bw);
    const borderColors = values.map(() => origBorderCol());
    accDS = [{ label:title, data:values, backgroundColor:bgPats, borderColor:borderColors, borderWidth:borderWidths }];
  } else if (ct==='radar') {
    const bgPats = txColors.slice(0,values.length).map((c,i) => createPattern(ctx, c, i));
    accDS = [{ label:'Dataset 1', data:values, backgroundColor:bgPats[0]||txColors[0]+'55', borderColor:txColors[0], borderWidth:bw+1, pointRadius:ps+2, pointStyle:POINT_STYLES[0], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true }];
    if (values2.length) accDS.push({ label:'Dataset 2', data:values2, backgroundColor:txColors[1]+'44', borderColor:txColors[1], borderWidth:bw+1, borderDash:DASH_PATTERNS[1], pointRadius:ps+2, pointStyle:POINT_STYLES[1], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true });
  } else {
    const bgPats = txColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
    accDS = [{ label:title, data:values, backgroundColor:bgPats, borderColor:origBorderCol(), borderWidth:bw }];
  }

  state.charts['accessible'] = new Chart(ctx, buildConfig(ct, (isScatter||isBubble)?undefined:labels, accDS));

  // Populate CVD legend strip — shape + dash cues so legend is readable without color
  const legendEl = document.getElementById('cvdLegend');
  if (legendEl) {
    const showLegend = (isLine || isScatter) && (values2.length > 0 || scatterPts2.length > 0);
    if (showLegend) {
      const c1 = txColors[0], c2 = txColors[1];
      legendEl.style.display = 'flex';
      legendEl.innerHTML = `
        <span style="font-weight:700;color:var(--text3);font-size:0.85em;margin-right:4px">KEY:</span>
        <span class="cvd-legend-item">
          <svg width="28" height="12" style="flex-shrink:0"><line x1="0" y1="6" x2="28" y2="6" stroke="${c1}" stroke-width="3"/><circle cx="14" cy="6" r="4" fill="${c1}"/></svg>
          <span>Dataset 1 — Circle · Solid</span>
        </span>
        <span class="cvd-legend-item">
          <svg width="28" height="12" style="flex-shrink:0"><line x1="0" y1="6" x2="28" y2="6" stroke="${c2}" stroke-width="3" stroke-dasharray="6,3"/><polygon points="14,2 18,10 10,10" fill="${c2}"/></svg>
          <span>Dataset 2 — Triangle · Dashed</span>
        </span>`;
    } else {
      legendEl.style.display = 'none';
    }
  }
}

function setCBType(val) {
  state.cbType = val;
  // Sync the select dropdown
  const sel = document.getElementById('cvdSelect');
  if (sel && sel.value !== val) sel.value = val;
  if (state.chartData) buildAccessibleChart(PALETTES[state.palette].colors);
}

function onCBTypeChange() {
  // Legacy fallback
  const sel = document.getElementById('cvdSelect');
  if (sel) setCBType(sel.value);
}

// ═══════════════════════════════════════════════════════════
// ADVANCED PREVIEW
// ═══════════════════════════════════════════════════════════
function updatePreview() {
  if (!state.chartData) return;
  const { labels, values, values2, scatterPts1, scatterPts2, ct, ps, pt, bw, lt, title } = state.chartData;
  const baseColors = PALETTES[state.palette].colors;
  const accColors = baseColors.map(c => simulateCB(c, state.cbType));
  const isPie    = ['pie','doughnut','polarArea'].includes(ct);
  const isLine   = ct==='line'||ct==='radar'||ct==='area';
  const isScatter= ct==='scatter';
  const isBubble = ct==='bubble';
  const isStacked= ct==='stackedBar';
  const chartJsType = (ct==='histogram'||ct==='stackedBar') ? 'bar'
                    : (ct==='area') ? 'line'
                    : (ct==='bubble') ? 'bubble'
                    : ct;

  if (state.charts['preview']) { state.charts['preview'].destroy(); delete state.charts['preview']; }
  const canvasEl = document.getElementById('previewChart');
  if (!canvasEl) return;
  const ctx = canvasEl.getContext('2d');
  let ds;
  if (isBubble) {
    ds = [{ label:'Dataset 1', data:bubblePts1||[], backgroundColor:accColors[0]+'aa', borderColor:accColors[0], borderWidth:2 }];
    if (bubblePts2&&bubblePts2.length) ds.push({ label:'Dataset 2', data:bubblePts2, backgroundColor:accColors[1]+'aa', borderColor:accColors[1], borderWidth:2 });
  } else if (isScatter) {
    ds = [{ label:'Dataset 1', data:scatterPts1||[], backgroundColor:accColors[0], borderColor:accColors[0], pointRadius:ps+2, pointStyle:'circle', pointBorderWidth:2.5, pointBorderColor:pointBorderCol() }];
    if (scatterPts2&&scatterPts2.length) ds.push({ label:'Dataset 2', data:scatterPts2, backgroundColor:accColors[1], borderColor:accColors[1], pointRadius:ps+2, pointStyle:'triangle', pointBorderWidth:2.5, pointBorderColor:pointBorderCol() });
  } else if (ct==='area') {
    ds = [{ label:'Dataset 1', data:values, borderColor:accColors[0], backgroundColor:accColors[0]+'55', tension:lt, pointRadius:ps+2, pointStyle:'circle', borderWidth:bw+1, borderDash:[], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true }];
    if (values2&&values2.length) ds.push({ label:'Dataset 2', data:values2, borderColor:accColors[1], backgroundColor:accColors[1]+'44', tension:lt, pointRadius:ps+2, pointStyle:'triangle', borderWidth:bw+1, borderDash:[8,4], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true });
  } else if (isStacked) {
    const bgPats = accColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
    ds = [{ label:'Dataset 1', data:values, backgroundColor:bgPats, borderColor:origBorderCol(), borderWidth:1.5 }];
    if (values2&&values2.length) {
      const bgPats2 = accColors.slice(0,values2.length).map((c,i)=>createPattern(ctx,c,i+4));
      ds.push({ label:'Dataset 2', data:values2, backgroundColor:bgPats2, borderColor:origBorderCol(), borderWidth:1.5 });
    }
  } else if (isLine) {
    ds = [{ label:'Dataset 1', data:values, borderColor:accColors[0], backgroundColor:accColors[0]+'44', tension:lt, pointRadius:ps+2, pointStyle:'circle', borderWidth:bw+1, borderDash:[], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:state.fillArea }];
    if (values2&&values2.length) ds.push({ label:'Dataset 2', data:values2, borderColor:accColors[1], backgroundColor:accColors[1]+'44', tension:lt, pointRadius:ps+2, pointStyle:'triangle', borderWidth:bw+1, borderDash:[8,4], pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:state.fillArea });
  } else if (isPie) {
    const bws = values.map((_,i)=>i%2===0?bw+2:bw);
    const piePats = accColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
    ds = [{ label:title, data:values, backgroundColor:piePats, borderColor:values.map(()=>origBorderCol()), borderWidth:bws }];
  } else if (ct==='radar') {
    const radPat = accColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
    ds = [{ label:'Dataset 1', data:values, backgroundColor:radPat[0]||accColors[0]+'55', borderColor:accColors[0], borderWidth:bw+1, borderDash:[], pointRadius:ps+2, pointStyle:'circle', pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true }];
    if (values2&&values2.length) ds.push({ label:'Dataset 2', data:values2, backgroundColor:accColors[1]+'44', borderColor:accColors[1], borderWidth:bw+1, borderDash:[8,4], pointRadius:ps+2, pointStyle:'triangle', pointBorderWidth:2.5, pointBorderColor:pointBorderCol(), fill:true });
  } else {
    ds = [{ label:title, data:values, backgroundColor:accColors.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i)), borderColor:origBorderCol(), borderWidth:bw }];
  }
  const prevCfg = buildConfig(ct, (isScatter||isBubble) ? undefined : labels, ds);
  prevCfg.type = chartJsType;
  state.charts['preview'] = new Chart(ctx, prevCfg);
}

// ═══════════════════════════════════════════════════════════
// SIMULATOR
// ═══════════════════════════════════════════════════════════
function generateSimulator() {
  if (!state.chartData) { showToast('Generate a chart first','info'); return; }
  const { labels, values, values2, scatterPts1, scatterPts2, bubblePts1, bubblePts2, ct } = state.chartData;
  const baseColors = PALETTES[state.palette].colors;
  const isPie    = ['pie','doughnut','polarArea'].includes(ct);
  const isLine   = ct==='line'||ct==='radar'||ct==='area';
  const isScatter= ct==='scatter';
  const isBubble = ct==='bubble';
  const isStacked= ct==='stackedBar';
  const chartJsType = (ct==='histogram'||ct==='stackedBar') ? 'bar'
                    : (ct==='area') ? 'line'
                    : (ct==='bubble') ? 'bubble'
                    : ct;
  const simLabels = (isScatter||isBubble) ? undefined : labels;

  const simTypes = [
    {id:'simNormal',cb:'normal'},{id:'simProtanopia',cb:'protanopia'},
    {id:'simDeuteranopia',cb:'deuteranopia'},{id:'simTritanopia',cb:'tritanopia'},
    {id:'simAchromatopsia',cb:'achromatopsia'},
  ];

  simTypes.forEach(({id, cb}) => {
    if (state.simCharts[id]) { state.simCharts[id].destroy(); delete state.simCharts[id]; }
    const canvasEl = document.getElementById(id);
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    const txC = baseColors.map(c => simulateCB(c, cb));
    const SIM_POINTS = ['circle', 'triangle', 'rect', 'star'];
    const SIM_DASH   = [[], [8,4]];
    let ds;
    if (isBubble) {
      ds = [{ data:bubblePts1||[], backgroundColor:txC[0]+'aa', borderColor:txC[0], borderWidth:2 }];
      if (bubblePts2&&bubblePts2.length) ds.push({ data:bubblePts2, backgroundColor:txC[1]+'aa', borderColor:txC[1], borderWidth:2 });
    } else if (isScatter) {
      ds = [{ data:scatterPts1||[], backgroundColor:txC[0], borderColor:txC[0], pointRadius:4, pointBorderWidth:2, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[0] }];
      if (scatterPts2&&scatterPts2.length) ds.push({ data:scatterPts2, backgroundColor:txC[1], borderColor:txC[1], pointRadius:4, pointBorderWidth:2, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[1] });
    } else if (ct==='area') {
      ds = [{ data:values, borderColor:txC[0], backgroundColor:txC[0]+'55', tension:0.4, borderWidth:2.5, borderDash:SIM_DASH[0], pointRadius:3, pointBorderWidth:1.5, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[0], fill:true }];
      if (values2&&values2.length) ds.push({ data:values2, borderColor:txC[1], backgroundColor:txC[1]+'44', tension:0.4, borderWidth:2.5, borderDash:SIM_DASH[1], pointRadius:3, pointBorderWidth:1.5, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[1], fill:true });
    } else if (isStacked) {
      const bgPats = txC.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
      ds = [{ data:values, backgroundColor:bgPats, borderColor:origBorderCol(), borderWidth:1.5 }];
      if (values2&&values2.length) {
        const bgPats2 = txC.slice(0,values2.length).map((c,i)=>createPattern(ctx,c,i+4));
        ds.push({ data:values2, backgroundColor:bgPats2, borderColor:origBorderCol(), borderWidth:1.5 });
      }
    } else if (isLine) {
      ds = [{ data:values, borderColor:txC[0], backgroundColor:txC[0]+'55', tension:0.4, borderWidth:2.5, borderDash:SIM_DASH[0], pointRadius:4, pointBorderWidth:2, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[0], fill:state.fillArea }];
      if (values2&&values2.length) ds.push({ data:values2, borderColor:txC[1], backgroundColor:txC[1]+'55', tension:0.4, borderWidth:2.5, borderDash:SIM_DASH[1], pointRadius:4, pointBorderWidth:2, pointBorderColor:pointBorderCol(), pointStyle:SIM_POINTS[1], fill:state.fillArea });
    } else if (isPie) {
      const bws = values.map((_,i)=>i%2===0?3:1);
      const simPiePats = txC.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i));
      ds = [{ data:values, backgroundColor:simPiePats, borderColor:values.map(()=>origBorderCol()), borderWidth:bws }];
    } else {
      ds = [{ data:values, backgroundColor:txC.slice(0,values.length).map((c,i)=>createPattern(ctx,c,i)), borderColor:origBorderCol(), borderWidth:1.5 }];
    }
    const simBgPlugin = {
      id: 'simBg',
      beforeDraw(chart) {
        const { ctx, width, height } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = isHC() ? '#000000' : (isLight() ? '#ffffff' : 'transparent');
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }
    };
    const simCfg = {
      type: chartJsType,
      data: { labels:simLabels, datasets:ds },
      options: { responsive:true, maintainAspectRatio:false, animation:false,
                 plugins:{ legend:{display:false} } },
      plugins: [simBgPlugin]
    };
    if (!isPie && ct!=='radar') {
      simCfg.options.scales = {
        y:{ beginAtZero:true, stacked:isStacked, grid:{color:gridColor()}, border:{color:isHC()?'#fff':'rgba(128,128,128,0.3)'}, ticks:{color:tickColor(),font:{size:9,family:'Inter,sans-serif'}} },
        x:{ stacked:isStacked, grid:{color:gridColor()}, border:{color:isHC()?'#fff':'rgba(128,128,128,0.3)'}, ticks:{color:tickColor(),font:{size:9,family:'Inter,sans-serif'}} }
      };
    }
    if (ct==='radar') {
      simCfg.options.scales = { r:{ beginAtZero:true, ticks:{display:false,backdropColor:'transparent'}, grid:{color:gridColor()}, angleLines:{color:gridColor()} } };
    }
    state.simCharts[id] = new Chart(ctx, simCfg);
  });
  showToast('Simulator updated','success');
}

// ═══════════════════════════════════════════════════════════
// INSIGHT
// ═══════════════════════════════════════════════════════════
function generateInsight(values, labels) {
  if (!values||values.length<2) return;
  const mn=Math.min(...values), mx=Math.max(...values);
  const sum=values.reduce((a,b)=>a+b,0), avg=sum/values.length;
  const mnI=values.indexOf(mn), mxI=values.indexOf(mx);
  const last=values[values.length-1], first=values[0];
  const growth=first!==0?(((last-first)/first)*100):0;
  const variance=values.reduce((a,v)=>a+Math.pow(v-avg,2),0)/values.length;
  const std=Math.sqrt(variance);
  let maxInc=0, maxDrop=0, incLbl='', dropLbl='';
  for(let i=1;i<values.length;i++){
    const d=values[i]-values[i-1];
    if(d>maxInc){maxInc=d;incLbl=`${labels[i-1]}→${labels[i]}`;}
    if(d<maxDrop){maxDrop=d;dropLbl=`${labels[i-1]}→${labels[i]}`;}
  }

  let trend = growth>15 ? '📈 Strong positive growth trend.' : growth<-15 ? '📉 Significant downward trend.' : '📊 Stable performance.';
  let vol = std>avg*0.25 ? '⚡ High volatility.' : std>avg*0.1 ? '🔄 Moderate fluctuations.' : '✅ Consistent data.';

  document.getElementById('insightBox').style.display='block';
  document.getElementById('insightTrend').textContent = `${trend} ${vol}`;
  document.getElementById('insightStats').innerHTML = `
    <div class="stat-item"><strong>${mx}</strong>Peak (${labels[mxI]||'N/A'})</div>
    <div class="stat-item"><strong>${mn}</strong>Trough (${labels[mnI]||'N/A'})</div>
    <div class="stat-item"><strong>${avg.toFixed(2)}</strong>Average</div>
    <div class="stat-item"><strong>${sum.toFixed(2)}</strong>Total</div>
    <div class="stat-item"><strong>${growth.toFixed(1)}%</strong>Growth</div>
    <div class="stat-item"><strong>${std.toFixed(2)}</strong>Std Dev</div>
    <div class="stat-item"><strong>+${maxInc.toFixed(1)}</strong>${incLbl||'—'}</div>
    <div class="stat-item"><strong>${maxDrop.toFixed(1)}</strong>${dropLbl||'—'}</div>
  `;

  // Mini bar chart
  const mb = document.getElementById('miniBars');
  if (mb) {
    const maxV = mx || 1;
    mb.innerHTML = values.slice(0,12).map((v,i)=>{
      const h = Math.max(8, Math.round((v/maxV)*36));
      const pal = PALETTES[state.palette].colors;
      return `<div class="mini-bar" style="height:${h}px;background:${pal[i%pal.length]};opacity:0.85" title="${labels[i]||i}: ${v}"></div>`;
    }).join('');
  }

  // Score ring — use health score based on consistency
  const consistencyScore = Math.max(0,Math.min(100, Math.round(100-(std/avg*100))));
  const ringEl = document.getElementById('scoreRingFg');
  if (ringEl) {
    const circumference = 132;
    const offset = circumference - (consistencyScore/100)*circumference;
    setTimeout(()=>{ ringEl.style.strokeDashoffset = offset; }, 100);
    const color = consistencyScore>70?'#39ff14':consistencyScore>45?'#ffb000':'#ff4d6d';
    ringEl.style.stroke = color;
  }
  // Auto-refresh data table if open
  const wrap = document.getElementById('dataTableWrap');
  if (wrap && wrap.classList.contains('show')) updateDataTable();
}

// ═══════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════
function exportChart(fmt) {
  const ch = state.charts['accessible'];
  if (!ch) { showToast('Generate a chart first','error'); return; }
  const c = document.getElementById('accessibleChart');
  const tmp = document.createElement('canvas');
  tmp.width=c.width; tmp.height=c.height;
  const tx = tmp.getContext('2d');
  tx.fillStyle = isLight() ? '#ffffff' : '#070b14';
  tx.fillRect(0,0,tmp.width,tmp.height);
  tx.drawImage(c,0,0);
  const a=document.createElement('a');
  a.download=`chromavision-${state.cbType}-${Date.now()}.${fmt}`;
  a.href=fmt==='png'?tmp.toDataURL('image/png'):tmp.toDataURL('image/jpeg',0.95);
  a.click();
  showToast('Exported ' + fmt.toUpperCase() + '!', 'success');
}

function exportCSV() {
  if (!state.chartData) { showToast('No chart data','error'); return; }
  const { labels, values, values2, title } = state.chartData;
  let csv = `"${title}"\nLabel,Value${values2.length?',Value2':''}\n`;
  const n=Math.max(labels.length,values.length);
  for(let i=0;i<n;i++) {
    csv += `"${labels[i]||''}","${values[i]||''}"${values2.length?`,"${values2[i]||''}"`:''}\n`;
  }
  csv += `\nPalette,${state.palette}\nColorblind Type,${state.cbType}\nChart Type,${state.chartType}`;
  const b=new Blob([csv],{type:'text/csv'});
  const u=URL.createObjectURL(b), a=document.createElement('a');
  a.href=u; a.download=`chart-data-${Date.now()}.csv`; a.click();
  setTimeout(()=>URL.revokeObjectURL(u),200);
  showToast('CSV exported!','success');
}

function copyJSON() {
  if (!state.chartData) { showToast('No chart data','error'); return; }
  const { labels, values, values2, title, ct } = state.chartData;
  const json = JSON.stringify({
    title,
    chartType: ct,
    palette: state.palette,
    labels,
    datasets: [
      { label:'Dataset 1', data:values },
      ...(values2&&values2.length ? [{ label:'Dataset 2', data:values2 }] : [])
    ]
  }, null, 2);
  navigator.clipboard.writeText(json)
    .then(()=> showToast('JSON copied to clipboard!','success'))
    .catch(()=> showToast('Copy failed — try another browser','error'));
}

// ═══════════════════════════════════════════════════════════
// FULLSCREEN
// ═══════════════════════════════════════════════════════════
function toggleFS() {
  const el = document.getElementById('accessibleCard');
  if (!document.fullscreenElement) {
    el.requestFullscreen().catch(err => showToast('Fullscreen not available','error'));
  } else {
    document.exitFullscreen();
  }
}
document.addEventListener('fullscreenchange', ()=>{
  const btn = document.querySelector('.fullscreen-btn');
  if(btn) btn.textContent = document.fullscreenElement ? '❌ Exit' : '🔍 Expand';
  // Force chart resize after layout settles
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      if (state.charts['accessible']) state.charts['accessible'].resize();
      if (state.charts['original']) state.charts['original'].resize();
    });
  });
});

// ═══════════════════════════════════════════════════════════
// CSV
// ═══════════════════════════════════════════════════════════
function setupCSV() {
  const dz = document.getElementById('dropZone');
  const fi = document.getElementById('csvFile');

  fi.addEventListener('change', e => handleCSV(e.target.files[0]));

  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => {
    e.preventDefault(); dz.classList.remove('drag-over');
    if(e.dataTransfer.files[0]) handleCSV(e.dataTransfer.files[0]);
  });
}

function handleCSV(file) {
  if(!file) return;
  Papa.parse(file, {
    complete(res) {
      const rows = res.data.filter(r=>r.length>1&&r[0]);
      // skip header if non-numeric
      const start = isNaN(parseFloat(rows[0][1])) ? 1 : 0;
      const data = rows.slice(start);
      const lbls = data.map(r=>r[0]||'');
      const v1 = data.map(r=>r[1]||'');
      const v2 = data.map(r=>r[2]||'').filter(Boolean);
      document.getElementById('labelsInput').value = lbls.join(', ');
      document.getElementById('valuesInput').value = v1.join(', ');
      if(v2.length) { document.getElementById('values2Input').value = v2.join(', '); document.getElementById('values2Group').style.display='block'; }
      generateCharts();
      showToast('CSV loaded!','success');
    },
    error() { showToast('CSV parse error','error'); }
  });
}

// ═══════════════════════════════════════════════════════════
// DATA TABLE
// ═══════════════════════════════════════════════════════════
function toggleDataTable() {
  const wrap = document.getElementById('dataTableWrap');
  const btn = document.querySelector('.table-toggle-btn');
  if (!wrap) return;
  wrap.classList.toggle('show');
  if (wrap.classList.contains('show')) {
    btn.textContent = '📋 Hide Data Table';
    updateDataTable();
  } else {
    btn.textContent = '📋 Show Data Table';
  }
}

function updateDataTable() {
  if (!state.chartData) return;
  const { labels, values } = state.chartData;
  const tbody = document.getElementById('dataTableBody');
  if (!tbody) return;
  const mx = Math.max(...values) || 1;
  tbody.innerHTML = values.map((v,i) => {
    const barW = Math.round((v/mx)*80);
    const pal = PALETTES[state.palette].colors;
    return `<tr>
      <td>${i+1}</td>
      <td>${labels[i]||'—'}</td>
      <td>${v}</td>
      <td><span class="val-bar" style="width:${barW}px;background:${pal[i%pal.length]}"></span></td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// STARS / FEEDBACK
// ═══════════════════════════════════════════════════════════
function setupStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(s => {
    s.onclick = () => {
      const val = parseInt(s.dataset.val);
      state.rating = val;
      stars.forEach(st => st.classList.toggle('active', parseInt(st.dataset.val)<=val));
    };
    s.onmouseover = () => {
      const val = parseInt(s.dataset.val);
      stars.forEach(st => st.style.transform = parseInt(st.dataset.val)<=val?'scale(1.3)':'scale(1)');
    };
    s.onmouseout = () => stars.forEach(st => st.style.transform='');
  });
}

// ═══════════════════════════════════════════════════════════
// ✦ EFFECTS ENGINE
// ═══════════════════════════════════════════════════════════

// ── 1. LOADING OVERLAY ─────────────────────────────────────
function initLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;
  // Dismiss after charts render (give it a min 900ms so it feels intentional)
  setTimeout(() => {
    overlay.classList.add('hidden');
    setTimeout(() => overlay.remove(), 700);
  }, 900);
}

// ── 2. FLOATING PARTICLES ──────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Build particle pool — tiny dots with random drift
  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * Math.PI * 2   // phase offset
    };
  }
  for (let i = 0; i < 70; i++) particles.push(makeParticle());

  let t = 0;
  function draw() {
    if (document.body.classList.contains('high-contrast')) {
      requestAnimationFrame(draw); return;
    }
    ctx.clearRect(0, 0, W, H);
    const accentRaw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';
    t += 0.008;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;

      const a = p.alpha * (0.6 + 0.4 * Math.sin(t + p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accentRaw + Math.round(a * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });

    // Draw faint connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineA = (1 - dist/90) * 0.12;
          ctx.strokeStyle = accentRaw + Math.round(lineA * 255).toString(16).padStart(2,'0');
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── 3. CURSOR GLOW FOLLOWER ────────────────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  let mx = -999, my = -999, cx = -999, cy = -999;
  let visible = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { glow.style.opacity = '1'; visible = true; }
  });
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0'; visible = false;
  });

  // Smooth lag follow
  function follow() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(follow);
  }
  cx = mx; cy = my;
  follow();
}

// ── 4. RIPPLE EFFECT on all buttons ───────────────────────
function initRipple() {
  // Attach to all existing + future buttons via event delegation
  document.addEventListener('click', e => {
    const btn = e.target.closest('button, .ct-btn, .pal-btn, .sample-btn, .exp-btn, .act-btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    // Ensure relative positioning for ripple
    const pos = getComputedStyle(btn).position;
    if (pos === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// ── 5. 3D CARD TILT on cards ───────────────────────────────
function initCardTilt() {
  function attachTilt(card) {
    card.addEventListener('mousemove', e => {
      if (document.body.classList.contains('high-contrast')) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = dy * -5;
      const rotY = dx *  5;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      setTimeout(() => card.style.transition = '', 500);
    });
  }
  document.querySelectorAll('.chart-card, .panel').forEach(attachTilt);
}

// ── 6. SLIDING TAB INDICATOR ──────────────────────────────
function initTabIndicator() {
  const tabBar = document.getElementById('tabBar');
  if (!tabBar) return;

  // Create indicator pill
  const ind = document.createElement('div');
  ind.className = 'tab-indicator';
  tabBar.appendChild(ind);

  function moveIndicator(activeTab) {
    const barRect = tabBar.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    ind.style.left  = (tabRect.left - barRect.left) + 'px';
    ind.style.width = tabRect.width + 'px';
  }

  // Position on first active tab
  const firstActive = tabBar.querySelector('.tab.active');
  if (firstActive) {
    ind.style.transition = 'none';
    moveIndicator(firstActive);
    setTimeout(() => ind.style.transition = '', 50);
  }

  // Intercept tab clicks — update indicator before switchTab runs
  tabBar.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (tab) setTimeout(() => moveIndicator(tab), 0);
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    const active = tabBar.querySelector('.tab.active');
    if (active) { ind.style.transition = 'none'; moveIndicator(active); setTimeout(() => ind.style.transition = '', 50); }
  });
}

// ── 7. SCROLL TO TOP visibility ────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
}

// ── 8. SCROLL REVEAL for insight box ──────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll('.insight-box, .sim-card, .stat-item, .panel, .chart-card, .banner');
  if (!targets.length || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('revealed'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
  targets.forEach(t => obs.observe(t));
}

// ── 9. NUMBER COUNTER ANIMATION ───────────────────────────
// Called after insight box updates to animate number values
function animateCounters() {
  document.querySelectorAll('.stat-item strong[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 700;
    const start = performance.now();
    const from = 0;
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = (from + (target - from) * eased).toFixed(el.dataset.dec||0) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── 10. GEN BUTTON PROGRESS BAR ────────────────────────────
function runGenProgress() {
  const bar = document.getElementById('genProgress');
  if (!bar) return;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  requestAnimationFrame(() => {
    bar.style.transition = 'width 0.75s cubic-bezier(0.4,0,0.2,1)';
    bar.style.width = '100%';
    setTimeout(() => { bar.style.transition = 'width 0.3s ease'; bar.style.width = '0%'; }, 850);
  });
}

// ── 11. TAB SLIDE-IN ANIMATION ─────────────────────────────
// Augments switchTab with animation + indicator update
const _switchTabOrig = window._switchTabBase || switchTab;
window._switchTabBase = _switchTabOrig;

function switchTab(name, btn) {
  // call the original logic directly to avoid recursion
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['charts','advanced','simulator','feedback'].forEach(t => {
    const el = document.getElementById('tab-'+t);
    if (el) el.style.display = t===name ? 'block' : 'none';
  });
  if (name==='simulator') requestAnimationFrame(()=> generateSimulator && generateSimulator());
  if (name==='advanced')  requestAnimationFrame(()=> updatePreview && updatePreview());

  // Tab slide-in animation
  const pane = document.getElementById('tab-' + name);
  if (pane) {
    pane.classList.remove('tab-in');
    void pane.offsetWidth;
    pane.classList.add('tab-in');
  }

  // Move indicator
  const ind = document.querySelector('.tab-indicator');
  if (ind) {
    const tabBar = document.getElementById('tabBar');
    if (tabBar) {
      const barRect = tabBar.getBoundingClientRect();
      const tabRect = btn.getBoundingClientRect();
      ind.style.left  = (tabRect.left - barRect.left) + 'px';
      ind.style.width = tabRect.width + 'px';
    }
  }
}

// ── 12. WRAP generateCharts to trigger progress bar ────────
function generateCharts() {
  runGenProgress();
  _generateChartsCore();
  setTimeout(() => {
    initScrollReveal();
    animateCounters();
  }, 400);
}

// ── 13. TYPEWRITER on banner tagline ───────────────────────
(function typewriterBanner() {
  const banner = document.querySelector('.banner > span:nth-child(2)');
  if (!banner) return;
  const full = banner.textContent;
  banner.textContent = '';
  let i = 0;
  function type() {
    if (i < full.length) {
      banner.textContent += full[i++];
      setTimeout(type, i < 30 ? 18 : 6); // fast after first word
    }
  }
  setTimeout(type, 1100); // start after loading overlay fades
})();

// ── 14. MAGNETIC HOVER on gen-btn ──────────────────────────
(function magneticBtn() {
  const btn = document.querySelector('.gen-btn');
  if (!btn) return;
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.12;
    const dy = (e.clientY - cy) * 0.12;
    btn.style.transform = `translateY(-2px) translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
})();

// ── 15. DYNAMIC "HOVER FOR VALUES" TOOLTIP ─────────────────
function initDynamicTooltip() {
  const canvasWrap = document.querySelector('#originalChart')?.parentElement;
  if (!canvasWrap) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'dynamic-tooltip';
  tooltip.textContent = 'Hover for values';
  tooltip.style.cssText = `
    position: absolute;
    bottom: 12px;
    right: 14px;
    font-size: 0.68em;
    color: var(--text3);
    font-family: var(--font-mono);
    pointer-events: none;
    opacity: 0;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    background: color-mix(in srgb, var(--surface2) 90%, transparent);
    border: 1px solid var(--border);
    border-radius: 6px;
    backdrop-filter: blur(8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(4px);
    z-index: 10;
  `;
  canvasWrap.appendChild(tooltip);

  canvasWrap.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
  });
  canvasWrap.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(4px)';
  });
}


function submitFeedback() {
  const name = document.getElementById('fbName').value.trim();
  const email = document.getElementById('fbEmail').value.trim();
  const type = document.getElementById('fbType').value;
  const msg = document.getElementById('fbMessage').value.trim();
  if (!name||!email||!state.rating||!type||!msg) { showToast('Please fill all fields','error'); return; }

  const payload = { name, email, rating:state.rating, feedbackType:type, message:msg };

  fetch("https://script.google.com/macros/s/AKfycbxAJQUtPKh1hhGEqdXQY7x5iUzMESyPWgAKjp77Q6ZS7GMYDs8E_nuVCbbHCXtAgbI/exec",{
    method:'POST', body:JSON.stringify(payload)
  })
  .then(()=>showToast('Feedback submitted! Thank you 🎉','success'))
  .catch(()=>showToast('Feedback submitted (demo mode)','info'));

  // Clear form
  document.getElementById('fbName').value='';
  document.getElementById('fbEmail').value='';
  document.getElementById('fbType').value='';
  document.getElementById('fbMessage').value='';
  state.rating=0;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
}
