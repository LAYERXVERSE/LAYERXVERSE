// ---------- custom cursor ----------
(function(){
  var cursor = document.getElementById('cursor');
  var label = cursor.querySelector('span');
  if(window.matchMedia('(max-width: 900px)').matches) return;
  window.addEventListener('mousemove', function(e){
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('[data-cursor], a, button').forEach(function(el){
    el.addEventListener('mouseenter', function(){
      cursor.classList.add('hovering');
      label.textContent = el.getAttribute('data-cursor') || (el.tagName === 'A' ? 'VIEW' : 'OPEN');
    });
    el.addEventListener('mouseleave', function(){
      cursor.classList.remove('hovering');
    });
  });
})();

// ---------- header scroll state ----------
(function(){
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }, { passive:true });
})();

// ---------- mobile menu ----------
(function(){
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', function(){
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });
})();

// ---------- hero reveal ----------
window.addEventListener('DOMContentLoaded', function(){
  requestAnimationFrame(function(){
    document.getElementById('hero').classList.add('in');
  });
});

// ---------- scroll reveal ----------
(function(){
  var items = document.querySelectorAll('.reveal');
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function(el){ obs.observe(el); });
})();

// ---------- tapstation version tabs ----------
(function(){
  var tabs = document.querySelectorAll('.tab-item');
  var dots = document.querySelectorAll('#tap-mini-dots .nfc-dot');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var version = parseInt(tab.getAttribute('data-version'), 10);
      dots.forEach(function(dot, i){
        dot.classList.toggle('active', i < version);
      });
    });
  });
})();

// ---------- customization preview ----------
(function(){
  var chips = document.querySelectorAll('.custom-chip');
  var obj = document.getElementById('custom-obj');
  var label = document.getElementById('custom-obj-label');
  var colors = ['#0f0f0f', '#4a4a4a', '#dcdad4', '#7a7a7a'];
  var shapes = ['6px', '50%', '30% 70% 70% 30% / 30% 30% 70% 70%'];
  var colorIdx = 0, shapeIdx = 0;
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      var text = chip.textContent.trim();
      if(text === 'Color'){
        colorIdx = (colorIdx + 1) % colors.length;
        obj.style.background = colors[colorIdx];
        var names=['Black','Graphite','Red','Steel']; label.textContent = 'Color · ' + names[colorIdx];
      } else if(text === 'Shape'){
        shapeIdx = (shapeIdx + 1) % shapes.length;
        obj.style.borderRadius = shapes[shapeIdx];
        label.textContent = 'Shape · updated';
      } else if(text === 'Size'){
        obj.style.width = obj.style.width === '110px' ? '150px' : '110px';
        obj.style.height = obj.style.height === '110px' ? '150px' : '110px';
        label.textContent = 'Size · updated';
      } else {
        label.textContent = text + ' · selected';
      }
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
    });
  });
})();

// ---------- product grid ----------
(function(){
  var KC_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_d4f7f890-8021-4d09-820b-085fea07bf06.png';
  var FLATLAY_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_6a37c160-ad82-4dc6-b61e-c84d29626934.png';
  var TAP_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_5c2e2987-dada-4b13-ad92-e11243b67d03.png';
  var HERO_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_2c5d227d-366c-4c4c-a4f5-7779b36de545.png';
  var PRINTER_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_02986334-b3aa-45d9-a717-1ca096588271.png';
  var SIGN_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_c436d9a0-8f71-4355-9c90-9f8a80375d89.png';
  var MOTO_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212741_66f006b3-ad88-414e-99b1-a55617865ffb.png';
  var PERSONALIZED_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212832_72753197-d561-4f20-a1b2-4b68fb783b54.png';
  var DESK_DISPLAY_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_25475bae-5de7-4d2e-bd23-2c8bdba1683e.png';
  var CAFE_STAND_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_0bf10d20-d157-42eb-b543-d748fc35fcc5.png';
  var LOGO_PLATE_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_7080b5ba-2d07-4392-a5c2-6c772cc86f50.png';

  var products = [
    { name:'NFC Keychain', cat:'nfc keychains', desc:'A compact keychain with an embedded NFC chip linking to any destination.', img:KC_IMG },
    { name:'Custom Keychain', cat:'keychains custom', desc:'Any shape, any logo — a keychain designed around your idea.', img:MOTO_IMG },
    { name:'Tapstation', cat:'nfc desk business', desc:'Our signature NFC display for a desk, counter, or entryway.', img:TAP_IMG },
    { name:'Branded Desk Display', cat:'desk business custom', desc:'A small-format display for a desk or counter, built around your logo.', img:DESK_DISPLAY_IMG },
    { name:'Custom Business Sign', cat:'signs business custom', desc:'Dimensional signage for storefronts, offices, and walls.', img:SIGN_IMG },
    { name:'Social Media Display', cat:'business desk signs', desc:'A stand or plaque made to showcase your handle in person.', img:CAFE_STAND_IMG },
    { name:'Custom Logo Plate', cat:'business custom signs', desc:'A raised, layered rendering of your logo as a physical plate.', img:LOGO_PLATE_IMG },
    { name:'Personalized 3D Product', cat:'custom', desc:'A one-off object designed around your interests, space, or idea.', img:PERSONALIZED_IMG }
  ];
  var grid = document.getElementById('product-grid');
  var filterBtns = document.querySelectorAll('.filter-btn');

  function render(filter){
    grid.innerHTML = '';
    products
      .filter(function(p){ return filter === 'all' || p.cat.indexOf(filter) !== -1; })
      .forEach(function(p){
        var card = document.createElement('div');
        card.className = 'product-card';
        var visualInner = p.img ? ('<img src="' + p.img + '" alt="' + p.name + '">') : '';
        card.innerHTML =
          '<div class="pc-top"><span class="pc-tag">' + p.cat.split(' ')[0].toUpperCase() + '</span></div>' +
          '<div class="pc-visual" aria-hidden="true">' + visualInner + '</div>' +
          '<div><h4>' + p.name + '</h4><p>' + p.desc + '</p>' +
          '<div class="pc-explore">Request a quote <span class="arrow">→</span></div></div>';
        card.addEventListener('click', function(){
          window.location.hash = 'contact';
        });
        grid.appendChild(card);
      });
  }
  render('all');

  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.getAttribute('data-filter'));
    });
  });
})();

// ---------- contact form ----------
(function(){
  var form = document.getElementById('project-form');
  var success = document.getElementById('form-success');
  var uploadTrigger = document.getElementById('upload-trigger');
  var fileInput = document.getElementById('f-file');
  var fileNameEl = document.getElementById('file-name');
  var emailInsteadLink = document.getElementById('email-instead-link');
  var WHATSAPP_NUMBER = '905344149831';
  var ORDER_EMAIL = 'layerxverse@gmail.com';

  uploadTrigger.addEventListener('click', function(){ fileInput.click(); });
  fileInput.addEventListener('change', function(){
    fileNameEl.textContent = fileInput.files.length ? ('Attached: ' + fileInput.files[0].name + ' (mention this in your message — see note below)') : '';
  });

  function buildMessageLines(data){
    return [
      'New order — LAYERXVERSE website',
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Business/brand: ' + data.get('business'),
      'Product type: ' + data.get('type'),
      'Quantity: ' + data.get('quantity'),
      'What they need: ' + data.get('need'),
      '',
      'Customization details:',
      data.get('details'),
      '',
      'Message:',
      data.get('message')
    ];
  }

  function markSent(){
    form.style.display = 'none';
    success.classList.add('show');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var text = encodeURIComponent(buildMessageLines(data).join('\n'));
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank');
    markSent();
  });

  emailInsteadLink.addEventListener('click', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var subject = encodeURIComponent('Order inquiry: ' + (data.get('name') || 'New lead'));
    var body = encodeURIComponent(buildMessageLines(data).join('\n'));
    window.location.href = 'mailto:' + ORDER_EMAIL + '?subject=' + subject + '&body=' + body;
    markSent();
  });
})();
