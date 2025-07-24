//Night Mode Toggle
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add('dark');
  }
  
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    checkbox.checked = true;
  }

  // Toggle theme and save preference
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
});

});


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  // Resize canvas to fit viewport
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const mouse = { x: width / 2, y: height / 2 };
let scrollDelta = 0;
let lastScrollY = window.scrollY;
let frameCount = 0;

const maxGlitters = 80;
const initialGlitterCount = 60;
const glitters = [];

// Initialize glitter particles
function createGlitter(x, y) {
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 2 + 0.5,
    baseOpacity: Math.random() * 0.5 + 0.4
  };
}

for (let i = 0; i < initialGlitterCount; i++) {
  glitters.push(createGlitter(Math.random() * width, Math.random() * height));
}

function drawStar(ctx, x, y, outerRadius, spikes = 5, innerRadiusRatio = 0.5, color = "#ffffff", alpha = 1) {
  const innerRadius = outerRadius * innerRadiusRatio;
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / spikes;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
    rot += step;

    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
    rot += step;
  }
  ctx.closePath();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowColor = "#9900ffff";
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();
}


function animate() {
  ctx.clearRect(0, 0, width, height);

  const repelRadius = 40;
  const attractRadius = 80;

  for (const g of glitters) {
    const dx = g.x - mouse.x;
    const dy = g.y - mouse.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    // Mouse interaction forces
    if (dist < repelRadius) {
      let force = -0.15 / (distSq + 30);
      g.vx += force * dx;
      g.vy += force * dy;
    } else if (dist < attractRadius) {
      const attractStrength = 0.001;
      g.vx += (mouse.x - g.x) * attractStrength;
      g.vy += (mouse.y - g.y) * attractStrength;
    }

    // Scrolling behavior
if (Math.abs(scrollDelta) > 0.5) {
  g.vy += scrollDelta * 0.008 * (0.7 + 0.6 * Math.random()); // smaller multiplier
} else {
  g.vy += 0.02; // gentle sink
}


    // Random jitter
    const jitter = dist < attractRadius ? 0.005 : 0.02;
    g.vx += (Math.random() - 0.5) * jitter;
    g.vy += (Math.random() - 0.5) * jitter;

    // Damping and speed limits
    g.vx *= 0.92;
    g.vy *= 0.92;
    g.vx = Math.max(Math.min(g.vx, 1), -1);
    g.vy = Math.max(Math.min(g.vy, 1), -1);

    // Update position
    g.x += g.vx;
    g.y += g.vy;

    // Horizontal bounce
    if (g.x < 0) { g.x = 0; g.vx *= -0.6; }
    if (g.x > width) { g.x = width; g.vx *= -0.6; }

  

    // Draw glitter
drawStar(ctx, g.x, g.y, g.radius*4.5, 5, 0.5, "#ffffff", g.baseOpacity);

  }

  frameCount++;

  // Add new glitter
  if (frameCount % 10 === 0 && glitters.length < maxGlitters) {
    glitters.push(createGlitter(Math.random() * width, Math.random() * 20));
  }

  // Remove glitter that falls off screen
// Remove glitter that goes off screen (top or bottom)
for (let i = glitters.length - 1; i >= 0; i--) {
  if (glitters[i].y > height + 20 || glitters[i].y < -20) {
    glitters.splice(i, 1);
  }
}
  requestAnimationFrame(animate);
}

// Mouse move tracking
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Scroll detection
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  let scrollDelta = scrollY - lastScrollY;

  // Only apply scroll force if not at top or bottom
  if ((scrollY > 0 && scrollY < maxScroll)) {
    for (let g of glitters) {
      g.vy += scrollDelta * 0.01; // You can reduce this multiplier for subtle effect
    }
  }

  lastScrollY = scrollY;
});


// Resize handler
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

animate();
});


// Photo Slideshow
  let slideIndex = 1;

  window.onload = function () {
    showSlides(slideIndex);
  };

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let photosNav = document.getElementsByClassName("photosNav");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < photosNav.length; i++) {
      photosNav[i].className = photosNav[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    photosNav[slideIndex-1].className += " active";
  }

// Side Navigation Menu
window.addEventListener("resize", () => {
  const sidenav = document.getElementById("mySidenav");
  const navbtn = document.getElementById("navbtn");

  if (window.innerWidth >= 772) {
    // Desktop view: remove any inline width
    sidenav.style.width = "";
  } else {
    // Mobile view: reset to closed state
    sidenav.style.width = "0";
  }
});

function openNav() {
  document.getElementById("mySidenav").style.width = "40%";
  document.getElementById("mainContent").style.marginLeft = "40%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mainContent").style.marginLeft = "0";
  document.getElementById("closebtn").style.display = "hidden";
}

// Toggle Button
function toggleButton(button) {
    const targetId = button.getAttribute("data-target");
    const para = document.getElementById(targetId);
    const icon = button.querySelector('i');
    const isHidden = para.classList.contains("hidden");
    para.classList.toggle("hidden");
    para.classList.toggle("show");
    if (isHidden) {
        icon.classList.remove("fa-caret-down");
        icon.classList.add("fa-caret-up");
    } else {
        icon.classList.remove("fa-caret-up");
        icon.classList.add("fa-caret-down");
    }
}

