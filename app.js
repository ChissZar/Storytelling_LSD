'use strict';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const format = (n) => n.toLocaleString('vi-VN',{minimumFractionDigits:2,maximumFractionDigits:2});
const data = window.STORY_DATA.gdp;
let phase = 'all';
const phaseIncludes = (p,year) => p === 'all' || (p === 'before' && year <= 2019) || (p === 'shock' && year >= 2020 && year <= 2021) || (p === 'recovery' && year >= 2022);
const phaseLabels = {all:'Toàn kỳ 2011–2025',before:'Điểm nhấn: 2011–2019',shock:'Điểm nhấn: 2020–2021',recovery:'Điểm nhấn: 2022–2025'};
function drawChart(){
  const W=600,H=340,L=44,R=26,T=24,B=42;
  const x=i=>L+i*(W-L-R)/(data.length-1);
  const y=v=>H-B-v*(H-T-B)/10;
  const grid=[0,2,4,6,8,10].map(v=>`<line x1="${L}" y1="${y(v)}" x2="${W-R}" y2="${y(v)}" stroke="#d7d0c2" stroke-width="1"/><text x="${L-12}" y="${y(v)+5}" text-anchor="end">${v}</text>`).join('');
  const ticks=data.map((d,i)=>[0,3,6,9,12,14].includes(i)?`<text x="${x(i)}" y="${H-14}" text-anchor="middle">${d.year}</text>`:'').join('');
  const line=data.map((d,i)=>`${x(i)},${y(d.value)}`).join(' ');
  const marks=data.map((d,i)=>`<circle class="data-point" data-index="${i}" role="button" tabindex="0" aria-label="Năm ${d.year}: ${format(d.value)} phần trăm${d.year===2025?', ước tính':''}" cx="${x(i)}" cy="${y(d.value)}" r="${phaseIncludes(phase,d.year)?6:4}" fill="${phaseIncludes(phase,d.year)?'#9e302b':'#b8b4a9'}" stroke="#f5f1e8" stroke-width="2"/>`).join('');
  $('#gdp-chart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="group" aria-labelledby="chart-title chart-desc"><title id="chart-title">Tăng trưởng GDP thực Việt Nam, 2011 đến 2025</title><desc id="chart-desc">Trục tung từ 0 đến 10 phần trăm. Dùng Tab để chọn từng điểm, hoặc đọc bảng số liệu bên dưới. Điểm nhấn hiện tại: ${phaseLabels[phase]}.</desc>${grid}<line x1="${L}" y1="${T}" x2="${L}" y2="${H-B}" stroke="#8b8a80"/><polyline class="chart-line" points="${line}" fill="none" stroke="#8b8a80" stroke-width="2"/>${ticks}${marks}</svg>`;
  $$('.data-point').forEach(point=>{
    const show=()=>{const d=data[Number(point.dataset.index)];$('#chart-reading').textContent=`${d.year} · GDP tăng ${format(d.value)}% so với năm trước${d.year===2025?' (ước tính)':''}.`;};
    point.addEventListener('pointerenter',show);point.addEventListener('focus',show);point.addEventListener('click',show);
    point.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}});
  });
}
function setPhase(p){if(phase===p)return;phase=p;$$('.data-point').forEach(point=>{const active=phaseIncludes(p,data[Number(point.dataset.index)].year);point.setAttribute('r',active?6:4);point.setAttribute('fill',active?'#9e302b':'#b8b4a9');});$$('[data-phase][aria-pressed]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.phase===p)));if(!document.activeElement?.classList.contains('data-point'))$('#chart-reading').textContent=phaseLabels[p]+'. Chọn điểm để đọc giá trị.';}
drawChart();
const pointPicker=document.createElement('label');pointPicker.className='point-picker';pointPicker.textContent='Đọc giá trị theo năm ';const yearSelect=document.createElement('select');yearSelect.setAttribute('aria-label','Chọn năm để đọc tăng trưởng GDP');yearSelect.innerHTML='<option value="">Chọn năm</option>'+data.map((d,i)=>`<option value="${i}">${d.year}</option>`).join('');pointPicker.appendChild(yearSelect);$('#chart-reading').before(pointPicker);yearSelect.addEventListener('change',()=>{if(yearSelect.value==='')return;const d=data[Number(yearSelect.value)];$('#chart-reading').textContent=`${d.year} · GDP tăng ${format(d.value)}% so với năm trước${d.year===2025?' (ước tính)':''}.`;});
$('#gdp-table').innerHTML=data.map(d=>`<tr><th scope="row">${d.year}${d.year===2025?' *':''}</th><td>${format(d.value)}</td></tr>`).join('');
$$('.chart-tabs button').forEach(b=>b.addEventListener('click',()=>setPhase(b.dataset.phase)));
$('#restore-range').addEventListener('input',e=>{$('#compare').style.setProperty('--split',e.target.value+'%');$('#restore-value').textContent=e.target.value+'%';});
let ticking=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;$('#progress-bar').style.width=(max>0?scrollY/max*100:0)+'%';ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
if('IntersectionObserver' in window){
 const timelineObserver=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>{const yEl=$('#active-year');if(yEl&&yEl.textContent!==e.target.dataset.year){yEl.classList.add('year-changing');setTimeout(()=>{yEl.textContent=e.target.dataset.year;yEl.classList.remove('year-changing');},120);}else if(yEl){yEl.textContent=e.target.dataset.year;}$$('.timeline-dots a').forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});});},{rootMargin:'-25% 0px -40% 0px',threshold:0});
 $$('.timeline-step').forEach(el=>timelineObserver.observe(el));
 const growthObserver=new IntersectionObserver(entries=>{if(innerWidth>760)entries.filter(e=>e.isIntersecting).forEach(e=>setPhase(e.target.dataset.phase));},{rootMargin:'-30% 0px -40% 0px',threshold:0});
 $$('.growth-step').forEach(el=>growthObserver.observe(el));
 const chapterObserver=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>{$$('.chapter-nav a').forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-20% 0px -60% 0px',threshold:0});
 $$('.chapter-nav a').forEach(a=>chapterObserver.observe($(a.hash)));
 document.documentElement.classList.add('reveal-enabled');
 const revealObserver=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}});},{rootMargin:'0px 0px -40px 0px',threshold:0.1});
 $$('.reveal, .poverty-figure').forEach(el=>revealObserver.observe(el));
}
$('#quiz-form').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.target);const answers=['a','b','b'];let score=0;const explanations=['Đại hội VI (1986) đề ra đường lối đổi mới toàn diện.','16,8 − 5,0 = 11,8 điểm phần trăm; mức giảm tương đối khoảng 70,2%.','Biểu đồ mô tả biến động; xác định tác động riêng của một quyết sách cần thiết kế nghiên cứu và bằng chứng bổ sung.'];const rows=answers.map((answer,i)=>{const ok=form.get('q'+(i+1))===answer;if(ok)score++;return `<li><strong>${ok?'Đúng':'Chưa đúng'}.</strong> ${explanations[i]}</li>`;}).join('');const res=$('#quiz-result');res.innerHTML=`<strong>Bạn trả lời đúng ${score}/3 câu.</strong><ol>${rows}</ol>`;res.classList.remove('show');void res.offsetWidth;res.classList.add('show');});
