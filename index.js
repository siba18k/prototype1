// Auth Modal functionality
const authModal = document.getElementById('authModal') ? 
  new bootstrap.Modal(document.getElementById('authModal')) : null;

// Handle sign-in form submission
if (document.getElementById('signinForm')) {
  document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (authModal) authModal.hide();
    alert('Sign in functionality would be implemented in a real application.');
  });
}

// Handle sign-up form submission
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (authModal) authModal.hide();
    alert('Sign up functionality would be implemented in a real application.');
  });
}

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('svg');
    
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    if (icon) {
      icon.style.transform = answer.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
    }
  });
});

// Material card hover effects
document.querySelectorAll('.material-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Recycling Tracker specific functionality
if (document.getElementById('scanBtn')) {
  document.getElementById('scanBtn').addEventListener('click', function() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const scanResult = document.getElementById('scanResult');
    
    if (loadingSpinner) loadingSpinner.style.display = 'flex';
    
    setTimeout(function() {
      if (loadingSpinner) loadingSpinner.style.display = 'none';
      if (scanResult) {
        scanResult.style.display = 'block';
        scanResult.innerHTML = '<div class="alert alert-success">Item scanned successfully! +10 points</div>';
      }
    }, 1500);
  });
}

// Rewards page functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('redeem-btn')) {
    alert('Reward redemption would be processed here in the full app!');
  }
});