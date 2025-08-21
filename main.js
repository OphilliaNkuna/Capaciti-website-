// Contact Form Success Message
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form && successMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      successMessage.classList.remove("hidden");
      form.reset();
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 4000);
    });
  }

 // Team Slider
  const slider = document.getElementById('slider');
  let sliderStarted = false;
  let timer;

  if (slider) {
    const slides = slider.querySelectorAll('[data-slide]');
    const dots = slider.querySelectorAll('[data-dot]');
    let current = 0;
    const total = slides.length;
    const DURATION = 2000;

    function show(n) {
      slides.forEach((s, i) => {
        if (i === n) {
          s.classList.add('opacity-100', 'pointer-events-auto');
          s.classList.remove('opacity-0', 'pointer-events-none');
        } else {
          s.classList.remove('opacity-100', 'pointer-events-auto');
          s.classList.add('opacity-0', 'pointer-events-none');
        }
      });
      dots.forEach((d, i) => {
        d.classList.toggle('w-4', i === n);
        d.classList.toggle('bg-white', i === n);
        d.classList.toggle('bg-white/60', i !== n);
      });
      current = n;
    }

    function startSlider() {
      if (timer) return; // Prevent multiple intervals
      timer = setInterval(() => {
        show((current + 1) % total);
      }, DURATION);
    }

    function stopSlider() {
      clearInterval(timer);
      timer = null;
    }

    // Dot navigation (optional, keeps auto-slide running)
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopSlider();
        show(i);
        startSlider();
      });
    });

    show(0);

    // Intersection Observer to start/stop slider on section visibility
    const teamSection = document.getElementById('team');
    if (teamSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startSlider();
            } else {
              stopSlider();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(teamSection);
    } else {
      // Fallback: start slider immediately
      startSlider();
    }
  }
});

 document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('chatbot-toggle');
  const box = document.getElementById('chatbot-box');
  const close = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  // Improved: FAQ-style responses for candidates
  const faqs = [
    {
      keywords: ['apply', 'application', 'enroll', 'register'],
      answer: "To apply, please visit our 'Contact Us' section or email reception@uvuafrica.com. We'll guide you through the process!"
    },
    {
      keywords: ['requirements', 'qualifications', 'needed', 'need'],
      answer: "Our programs are open to motivated youth. Basic computer literacy is helpful, but requirements vary by course. Contact us for details."
    },
    {
      keywords: ['location', 'where', 'address'],
      answer: "We are located at 2nd Floor, Brickfield Canvas Building, 35 Brickfield Road, Woodstock, Cape Town."
    },
    {
      keywords: ['contact', 'email', 'phone', 'call'],
      answer: "You can reach us at +27 (21) 409 7000 or reception@uvuafrica.com."
    },
    {
      keywords: ['help', 'support', 'assist'],
      answer: "How can I assist you today? You can ask about applications, requirements, or our services."
    },
    {
      keywords: ['services', 'offer', 'programs', 'courses'],
      answer: "We offer Web Development, AI Solutions, and IT Support. Let us know which program interests you!"
    }
  ];

  toggle.addEventListener('click', () => {
    box.classList.toggle('hidden');
    if (!box.classList.contains('hidden')) input.focus();
  });
  close.addEventListener('click', () => box.classList.add('hidden'));

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const userMsg = input.value.trim();
    if (!userMsg) return;
    // Show user message
    messages.innerHTML += `<div class="text-right"><span class="inline-block bg-[#F1D1D1] text-[#6115D0] px-3 py-2 rounded-lg mb-1">${userMsg}</span></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Improved: Simple FAQ matching
    let botReply = "Thank you for your message! We'll get back to you soon.";
    const lowerMsg = userMsg.toLowerCase();
    for (const faq of faqs) {
      if (faq.keywords.some(word => lowerMsg.includes(word))) {
        botReply = faq.answer;
        break;
      }
    }

    setTimeout(() => {
      messages.innerHTML += `<div><span class="inline-block bg-[#6115D0] text-white px-3 py-2 rounded-lg mb-1">${botReply}</span></div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 700);
  });
});