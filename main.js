document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------
     Contact Form Success Message
  ------------------------------ */
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form && successMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      successMessage.classList.remove("hidden");
      form.reset();
      setTimeout(() => successMessage.classList.add("hidden"), 4000);
    });
  }

  /* ------------------------------
     Team Slider
  ------------------------------ */
  const slider = document.getElementById("slider");
  if (slider) {
    const slides = slider.querySelectorAll("[data-slide]");
    const dots = slider.querySelectorAll("[data-dot]");
    let current = 0;
    let timer;
    const DURATION = 2000;

    function show(n) {
      slides.forEach((s, i) => {
        s.classList.toggle("opacity-100", i === n);
        s.classList.toggle("pointer-events-auto", i === n);
        s.classList.toggle("opacity-0", i !== n);
        s.classList.toggle("pointer-events-none", i !== n);
      });
      dots.forEach((d, i) => {
        d.classList.toggle("w-4", i === n);
        d.classList.toggle("bg-white", i === n);
        d.classList.toggle("bg-white/60", i !== n);
      });
      current = n;
    }

    function startSlider() {
      if (!timer) {
        timer = setInterval(() => show((current + 1) % slides.length), DURATION);
      }
    }

    function stopSlider() {
      clearInterval(timer);
      timer = null;
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        stopSlider();
        show(i);
        startSlider();
      });
    });

    show(0);

    const teamSection = document.getElementById("team");
    if (teamSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.isIntersecting ? startSlider() : stopSlider();
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(teamSection);
    } else {
      startSlider();
    }
  }

  /* ------------------------------
     Chatbot (FAQ-style)
  ------------------------------ */
  const toggle = document.getElementById("chatbot-toggle");
  const box = document.getElementById("chatbot-box");
  const close = document.getElementById("chatbot-close");
  const chatbotForm = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  const faqs = [
    { keywords: ["apply","application","enroll","register"], answer: "To apply, please visit our 'Contact Us' section or email hello@capaciti.org.za. We'll guide you through the process!" },
    { keywords: ["requirements","qualifications","needed","need"], answer: "Our programs are open to motivated youth. Basic computer literacy is helpful, but requirements vary by course. Contact us for details." },
    { keywords: ["location","where","address"], answer: "We are located in Cape Town, Johannesburg and Hazyview. Visit our 'Contact Us' section for more details!" },
    { keywords: ["contact","email","phone","call"], answer: "You can reach us at hello@capaciti.org.za or visit the 'Contact Us' section." },
    { keywords: ["help","support","assist"], answer: "How can I assist you today? You can ask about applications, requirements, or our services." },
    { keywords: ["services","offer","programs","courses"], answer: "We offer Web Development, AI Solutions, and IT Support. Let us know which program interests you!" }
  ];

  if (toggle && box && close && chatbotForm && input && messages) {
    toggle.addEventListener("click", () => {
      box.classList.toggle("hidden");
      if (!box.classList.contains("hidden")) input.focus();
    });
    close.addEventListener("click", () => box.classList.add("hidden"));

    chatbotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const userMsg = input.value.trim();
      if (!userMsg) return;

      messages.innerHTML += `<div class="text-right"><span class="inline-block bg-[#F1D1D1] text-[#6115D0] px-3 py-2 rounded-lg mb-1">${userMsg}</span></div>`;
      input.value = "";
      messages.scrollTop = messages.scrollHeight;

      let botReply = "Thank you for your message! We'll get back to you soon.";
      const lowerMsg = userMsg.toLowerCase();
      for (const faq of faqs) {
        if (faq.keywords.some((word) => lowerMsg.includes(word))) {
          botReply = faq.answer;
          break;
        }
      }

      setTimeout(() => {
        messages.innerHTML += `<div><span class="inline-block bg-[#6115D0] text-white px-3 py-2 rounded-lg mb-1">${botReply}</span></div>`;
        messages.scrollTop = messages.scrollHeight;
      }, 700);
    });
  }

  /* ------------------------------
     Job Application Modal Success
  ------------------------------ */
  const jobForm = document.querySelector("#job-application-modal form");
  const applicationSuccess = document.getElementById("applicationSuccess");
  if (jobForm && applicationSuccess) {
    jobForm.addEventListener("submit", function (e) {
      e.preventDefault();
      applicationSuccess.classList.remove("hidden");
      setTimeout(() => {
        applicationSuccess.classList.add("hidden");
        document.getElementById("job-application-modal").classList.add("hidden");
        jobForm.reset();
      }, 3000);
    });
  }

  /* ------------------------------
     Hero Carousel Sliding Effect
  ------------------------------ */
  const carouselImages = document.querySelectorAll("#hero-carousel .carousel-img");
  const carouselDots = document.querySelectorAll(".carousel-dot");
  let currentSlide = 0;
  const slideInterval = 120000; // 2 minutes

  function showHeroSlide(n) {
    carouselImages.forEach((img, i) => {
      img.classList.toggle("opacity-100", i === n);
      img.classList.toggle("opacity-0", i !== n);
    });
    carouselDots.forEach((dot, i) => {
      dot.classList.toggle("bg-[#F25251]", i === n);
      dot.classList.toggle("bg-white/60", i !== n);
    });
    currentSlide = n;
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % carouselImages.length;
    showHeroSlide(currentSlide);
  }, slideInterval);

  carouselDots.forEach((dot, i) => {
    dot.addEventListener("click", () => showHeroSlide(i));
  });

  showHeroSlide(currentSlide);

  /* ------------------------------
     WORK WITH US Button Scroll
  ------------------------------ */
  const workBtn = document.getElementById("workBtn");
  const opportunitiesSection = document.getElementById("opportunities");

  if (workBtn && opportunitiesSection) {
    workBtn.addEventListener("click", () => {
      opportunitiesSection.scrollIntoView({ behavior: "smooth" });
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll("#impact h3[data-target]");
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // animation duration in ms
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / target));

      const counterInterval = setInterval(() => {
        start += 1;
        counter.textContent = start;
        if (start >= target) clearInterval(counterInterval);
      }, stepTime);
    });
  }

  // Only animate when section is visible
  const impactSection = document.getElementById("impact");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(impactSection); // only animate once
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(impactSection);
});
