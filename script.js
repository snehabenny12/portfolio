const roles = ["Python Developer", "AI Enthusiast", "Data Analyst"];
const typingTarget = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    charIndex += 1;
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeLoop, 1250);
      return;
    }
  } else {
    charIndex -= 1;
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 48 : 84);
}

typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("skill-bar")) {
        const fill = entry.target.querySelector(".bar-fill");
        if (fill) {
          fill.style.width = `${fill.dataset.fill}%`;
        }
      }

      if (entry.target.classList.contains("metric-card")) {
        const metric = entry.target.querySelector(".metric");
        if (metric && !metric.dataset.done) {
          animateCounter(metric, Number(metric.dataset.target || 0));
          metric.dataset.done = "true";
        }
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal, .skill-bar, .metric-card").forEach((el) => observer.observe(el));

function animateCounter(element, target) {
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    element.textContent = Math.floor(progress * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const toTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  toTopBtn.classList.toggle("show", window.scrollY > 420);
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotPanel = document.getElementById("chatbot-panel");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotInput = document.getElementById("chatbot-input");

chatbotToggle.addEventListener("click", () => {
  chatbotPanel.classList.toggle("open");
  if (chatbotPanel.classList.contains("open")) {
    chatbotInput.focus();
  }
});

chatbotClose.addEventListener("click", () => chatbotPanel.classList.remove("open"));

function getBotReply(question) {
  const q = question.toLowerCase();

  if (q.includes("skill")) {
    return "Sneha's core skills include Python, Django, SQL, Power BI, Pandas, Excel, Machine Learning, HTML/CSS, and JavaScript.";
  }

  if (q.includes("project") || q.includes("built")) {
    return "Sneha has built QueueZero (smart hospital queue system), a Hospital Patient Analytics Dashboard, and an AI Resume Analyzer using Python NLP.";
  }

  if (q.includes("dashboard") || q.includes("analytics") || q.includes("power bi")) {
    return "Sneha works on hospital analytics dashboards covering patient demographics, registration trends, queue insights, and staff workload analysis in Power BI.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("github")) {
    return "You can contact Sneha via email at snehabenny@example.com, and connect through LinkedIn or GitHub links in the Contact section.";
  }

  if (q.includes("resume") || q.includes("cv")) {
    return "Use the Download Resume button in the Hero or Resume section to get Sneha's latest CV.";
  }

  if (q.includes("about") || q.includes("who")) {
    return "Sneha Benny is an MCA student and aspiring Python Developer, Data Analyst, and AI enthusiast focused on building intelligent, data-driven systems.";
  }

  return "I can help with Sneha's skills, projects, dashboards, resume, and contact details. Try asking: What projects has Sneha built?";
}

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chat-msg ${type}`;
  message.textContent = text;
  chatbotBody.appendChild(message);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatbotInput.value.trim();

  if (!question) {
    return;
  }

  addMessage(question, "user");
  const reply = getBotReply(question);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 320);

  chatbotInput.value = "";
});

const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for your message. Sneha will get back to you soon.");
  contactForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
