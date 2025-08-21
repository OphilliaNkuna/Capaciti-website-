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
  if (slider) {
    const slides = slider.querySelectorAll('[data-slide]');
    const dots = slider.querySelectorAll('[data-dot]');
    let current = 0;
    const total = slides.length;
    const DURATION = 4000;

    function show(n) {
      slides.forEach((s, i) => {
        s.classList.toggle('opacity-100', i === n);
        s.classList.toggle('opacity-0', i !== n);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('w-4', i === n);
        d.classList.toggle('bg-white', i === n);
        d.classList.toggle('bg-white/60', i !== n);
      });
      current = n;
    }

    let timer = setInterval(() => show((current + 1) % total), DURATION);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => {
      clearInterval(timer);
      timer = setInterval(() => show((current + 1) % total), DURATION);
    });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        show(i);
        timer = setInterval(() => show((current + 1) % total), DURATION);
      });
    });
    show(0);
  }
});

 document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('chatbot-toggle');
    const box = document.getElementById('chatbot-box');
    const close = document.getElementById('chatbot-close');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

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
      // Simple bot reply
      setTimeout(() => {
        messages.innerHTML += `<div><span class="inline-block bg-[#6115D0] text-white px-3 py-2 rounded-lg mb-1">Thank you for your message! We'll get back to you soon.</span></div>`;
        messages.scrollTop = messages.scrollHeight;
      }, 700);
    });
  });