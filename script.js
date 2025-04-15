
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typing-text");
  const phrases = [
    "Tech enthusiast 🚀",
    "Web developer 🌐",
    "Creative coder 💻",
    " Computer Science student 🎓 in IIITH",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
    } else {
      charIndex--;
    }

    typingText.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
});

document.addEventListener('DOMContentLoaded', function () {
  const educationItems = document.querySelectorAll('.education-item');

  educationItems.forEach(item => {
    const header = item.querySelector('.education-header');
    const button = item.querySelector('.expand-btn');

    header.addEventListener('click', function () {
      toggleEducationItem(item);
    });

    button.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleEducationItem(item);
    });
  });

  function toggleEducationItem(item) {
    educationItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.expand-btn').classList.remove('expanded');
      }
    });

    item.classList.toggle('active');
    item.querySelector('.expand-btn').classList.toggle('expanded');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.achievement-card').forEach(card => {
    observer.observe(card);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const skillSection = document.getElementById('skills');

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateProficiencyBars();
      observer.unobserve(skillSection);
    }
  }, { threshold: 0.2 });

  observer.observe(skillSection);
});

function animateProficiencyBars() {
  const proficiencyLevels = document.querySelectorAll('.proficiency-level');

  proficiencyLevels.forEach(level => {
    const percentage = level.getAttribute('data-level') + '%';
    const proficiencyBar = level.parentElement;

    proficiencyBar.setAttribute('data-tooltip', percentage);

    setTimeout(() => {
      level.style.width = percentage;
    }, 100);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const tools = document.querySelectorAll('.tools');

  tools.forEach(tool => {
    tool.addEventListener('mouseenter', function () {
      const skillName = this.querySelector('.toolname').textContent;
      const proficiencyLevel = this.querySelector('.proficiency-level').getAttribute('data-level');
    });
  });
});

// 2. 
document.addEventListener("DOMContentLoaded", function () {
  logEvent("view", document.title || "Page");

  initViewTracking();

  document.addEventListener("click", function (event) {
    const element = event.target;

    const objectDescription = getElementDescription(element);

    logEvent("click", objectDescription);
  });

  function getElementDescription(element) {
    if (element.closest('.nav-item')) {
      return `Navigation Item: ${element.textContent.trim()}`;
    } else if (element.closest('#Logo')) {
      return "Logo";
    } else if (element.closest('.expand-btn')) {
      const header = element.closest('.education-header');
      return header ? `Expand Button for: ${header.querySelector('h3').textContent}` : "Expand Button";
    } else if (element.closest('.education-header')) {
      return `Education Header: ${element.closest('.education-header').querySelector('h3').textContent}`;
    } else if (element.closest('.achievement-card')) {
      return `Achievement Card: ${element.closest('.achievement-card').querySelector('h3').textContent}`;
    } else if (element.closest('.cv-link')) {
      return "CV Download Link";
    } else if (element.closest('.tools')) {
      return `Skill Icon: ${element.closest('.tools').querySelector('.toolname').textContent}`;
    } else if (element.closest('.footer-icons a')) {
      let iconType = "Social Icon";
      const classes = element.className;
      if (classes.includes('fa-github')) iconType = "GitHub Icon";
      else if (classes.includes('fa-linkedin')) iconType = "LinkedIn Icon";
      else if (classes.includes('fa-envelope')) iconType = "Email Icon";
      else if (classes.includes('fa-instagram')) iconType = "Instagram Icon";
      return iconType;
    } else if (element.tagName === 'IMG') {
      return `Image: ${element.alt || "Unnamed Image"}`;
    } else if (element.textContent && element.textContent.trim()) {
      const text = element.textContent.trim();
      return `Text: ${text.length > 30 ? text.substring(0, 30) + '...' : text}`;
    }

    return `${element.tagName.toLowerCase()}${element.id ? ' #' + element.id : ''}${element.className ? ' .' + element.className.split(' ')[0] : ''}`;
  }

  function initViewTracking() {
    const elementsToTrack = [
      { selector: '#about', name: 'About Section' },
      { selector: '#education', name: 'Education Section' },
      { selector: '#skills', name: 'Skills Section' },
      { selector: '#Achievements', name: 'Achievements Section' },
      { selector: '#cv', name: 'CV Section' },
      { selector: '.education-item', name: 'Education Item' },
      { selector: '.achievement-card', name: 'Achievement Card' },
      { selector: '.tools', name: 'Skill Item' },
      { selector: '.local-images img', name: 'Local Image' },
      { selector: '.profile-pic', name: 'Profile Picture' }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elementName = entry.target.dataset.trackName ||
            getElementDescription(entry.target);

          logEvent("view", elementName);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    elementsToTrack.forEach(item => {
      document.querySelectorAll(item.selector).forEach((element, index) => {
        element.dataset.trackName = item.name +
          (document.querySelectorAll(item.selector).length > 1 ?
            ` #${index + 1}` : '');

        observer.observe(element);
      });
    });
  }

  function logEvent(eventType, objectDescription) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectDescription}`);
  }
});


//3. 
function analyzeText() {
  const text = document.getElementById("textInput").value;

  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialSymbols = (text.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g) || []).join("").length;

  const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

  const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "her", "its", "our", "their"];
  const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "off", "over", "under"];
  const articles = ["a", "an"];

  const countOccurrences = (group) => {
    const counts = {};
    group.forEach(word => counts[word] = 0);
    tokens.forEach(token => {
      if (group.includes(token)) counts[token]++;
    });
    return counts;
  };

  const pronounCounts = countOccurrences(pronouns);
  const prepositionCounts = countOccurrences(prepositions);
  const articleCounts = countOccurrences(articles);

  const formatCounts = (title, counts) => {
    return `
      <h3>${title}</h3>
      <ul>${Object.entries(counts).map(([k, v]) => `<li>${k}: ${v}</li>`).join("")}</ul>
    `;
  };

  document.getElementById("analysisResults").innerHTML = `
    <h2>Text Statistics</h2>
    <p><strong>Letters:</strong> ${letters}</p>
    <p><strong>Words:</strong> ${words}</p>
    <p><strong>Spaces:</strong> ${spaces}</p>
    <p><strong>Newlines:</strong> ${newlines}</p>
    <p><strong>Special Symbols:</strong> ${specialSymbols}</p>
    ${formatCounts("Pronoun Counts", pronounCounts)}
    ${formatCounts("Preposition Counts", prepositionCounts)}
    ${formatCounts("Indefinite Article Counts", articleCounts)}
  `;
}
