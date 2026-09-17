/* AUTCO LLC — interactions */
(function(){
  "use strict";

  /* ----- Mobile nav ----- */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu){
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); });
    });
  }

  /* ----- Rotating thoughts (beautiful thoughts on every page) ----- */
  var thoughtsEN = [
    "We Build Today For Your Tomorrow.",
    "We design & build your future — to sustain.",
    "Quality is not an act; it is our reputation, poured into every foundation.",
    "On-time delivery is a promise, not a target.",
    "Incident-free construction is obtainable — we prove it every day.",
    "Every structure we raise tells a story of trust.",
    "From concept to completion, one team, one commitment.",
    "Safe hands build lasting landmarks."
  ];
  var thoughtsAR = [
    "نبني اليوم من أجل غدك.",
    "نصمم ونبني مستقبلك ليستدام.",
    "الجودة ليست تصرفاً عابراً؛ إنها سمعتنا تُصبّ في كل أساس.",
    "التسليم في الموعد وعدٌ لا هدف.",
    "البناء بلا حوادث ممكن — ونثبت ذلك كل يوم.",
    "كل هيكل نرفعه يروي قصة ثقة.",
    "من الفكرة إلى التسليم، فريق واحد والتزام واحد.",
    "أيادٍ آمنة تبني معالم خالدة."
  ];
  var thoughts = (document.documentElement.lang === 'ar') ? thoughtsAR : thoughtsEN;
  var qEls = document.querySelectorAll('.q');
  if (qEls.length){
    var i = 0;
    setInterval(function(){
      i = (i + 1) % thoughts.length;
      qEls.forEach(function(el){
        el.style.opacity = 0;
        setTimeout(function(){ el.textContent = (document.documentElement.lang==='ar' ? "«" : "“") + thoughts[i] + (document.documentElement.lang==='ar' ? "»" : "”"); el.style.opacity = 1; }, 480);
      });
    }, 6000);
  }

  /* ----- Counters ----- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, end = +el.getAttribute('data-count'),
            suffix = el.getAttribute('data-suffix') || '', t0 = null;
        function step(t){
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1400, 1);
          el.textContent = Math.round(end * (0.2 + 0.8 * p * p)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, {threshold:.4});
    counters.forEach(function(c){ cio.observe(c); });
  }

  /* ----- Reveal on scroll ----- */
  var revs = document.querySelectorAll('.reveal');
  if (revs.length && 'IntersectionObserver' in window){
    var rio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('in'); rio.unobserve(en.target); }
      });
    }, {threshold:.12});
    revs.forEach(function(r){ rio.observe(r); });
  } else {
    revs.forEach(function(r){ r.classList.add('in'); });
  }

  /* ----- Lightbox ----- */
  var lb = document.getElementById('lightbox');
  if (lb){
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.cap');
    document.querySelectorAll('.gallery a').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var img = a.querySelector('img');
        lbImg.src = img.src;
        lbCap.textContent = a.querySelector('figcaption') ? a.querySelector('figcaption').textContent : '';
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function(){ lb.classList.remove('open'); });
  }

  /* ----- Contact form -> mailto ----- */
  var form = document.getElementById('quoteForm');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var g = function(id){ return document.getElementById(id).value; };
      var body =
        "Name: " + g('fName') +
        "%0D%0ACompany: " + g('fCompany') +
        "%0D%0APhone: " + g('fPhone') +
        "%0D%0AService needed: " + g('fService') +
        "%0D%0A%0D%0AMessage:%0D%0A" + g('fMsg');
      window.location.href = "mailto:assamunited@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20" +
        encodeURIComponent(g('fName')) + "&body=" + body;
    });
  }

  /* ----- Year ----- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

  /* ----- Social share buttons ----- */
  (function(){
    var links = document.querySelectorAll('[data-share]');
    if (!links.length) return;
    var u = encodeURIComponent(location.href);
    var t = encodeURIComponent('AUTCO — Engineering & Construction | We Build Today For Your Tomorrow');
    var map = {
      fb: 'https://www.facebook.com/sharer/sharer.php?u=' + u,
      x:  'https://twitter.com/intent/tweet?url=' + u + '&text=' + t,
      li: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u,
      wa: 'https://wa.me/?text=' + t + '%20' + u,
      tg: 'https://t.me/share/url?url=' + u + '&text=' + t
    };
    links.forEach(function(a){
      a.href = map[a.getAttribute('data-share')] || '#';
      a.target = '_blank'; a.rel = 'noopener';
    });
  })();

  /* ----- Pro: scroll progress + sticky header + back to top ----- */
  (function(){
    var bar=document.getElementById('progress'),hdr=document.querySelector('header.site'),top=document.getElementById('toTop');
    function upd(){
      var h=document.documentElement,sc=h.scrollTop||document.body.scrollTop,
          mx=(h.scrollHeight-h.clientHeight)||1;
      if(bar)bar.style.width=(sc/mx*100)+'%';
      if(hdr)hdr.classList.toggle('scrolled',sc>60);
      if(top)top.classList.toggle('show',sc>500);
    }
    window.addEventListener('scroll',upd,{passive:true});upd();
    if(top)top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  })();
