window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('preloader').classList.add('done');
  },1200);
});

const dot=document.querySelector('.cursor-dot');
const ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);}
loop();
document.querySelectorAll('.hoverable').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});

const header=document.getElementById('site-header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40));

const burger=document.getElementById('burger');
const mmenu=document.getElementById('mobile-menu');
burger.addEventListener('click',()=>mmenu.classList.add('open'));
document.querySelector('.mm-close').addEventListener('click',()=>mmenu.classList.remove('open'));
mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mmenu.classList.remove('open')));

document.querySelectorAll('.about2-tabs .tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const tab=btn.dataset.tab;
    document.querySelectorAll('.about2-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.about2-panels p').forEach(p=>{
      p.classList.toggle('active',p.dataset.panel===tab);
    });
  });
});

const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){en.target.classList.add('in'); io.unobserve(en.target);} });
},{threshold:0.12});
document.querySelectorAll('.reveal-el').forEach(el=>io.observe(el));

const zio=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){en.target.classList.add('in');en.target.classList.remove('out');}
    else{en.target.classList.remove('in');en.target.classList.add('out');}
  });
},{threshold:0.15});
document.querySelectorAll('.zoom-el').forEach(el=>zio.observe(el));

document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const ans=item.querySelector('.faq-a');
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight=null;
    });
    if(!isOpen){
      item.classList.add('open');
      ans.style.maxHeight=ans.scrollHeight+40+'px';
    }
  });
});

const counters=document.querySelectorAll('[data-count]');
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const el=en.target; const target=parseInt(el.dataset.count,10); let cur=0;
      const step=()=>{ cur+=Math.max(1,target/40);
        if(cur<target){el.textContent=Math.floor(cur)+'+';requestAnimationFrame(step);}
        else{el.textContent=target+'+';} };
      step(); cio.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>cio.observe(c));

/* ---------- Contact Form → WhatsApp Submit ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const service = document.getElementById('cf-service').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    // WhatsApp number in international format (no + or spaces)
    const whatsappNumber = '918871156731';

    let text = `*New Contact Form Submission*%0A`;
    text += `Name: ${name}%0A`;
    text += `Email: ${email}%0A`;
    if (phone) text += `Phone: ${phone}%0A`;
    if (service) text += `Service Needed: ${service}%0A`;
    text += `Message: ${message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappURL, '_blank');

    this.reset();
  });
}