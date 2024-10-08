// Function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Function to load Google Analytics
function loadGoogleAnalytics() {
  const GOOGLE_ANALYTICS_ID = 'PLACEHOLDER_GA_ID';

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GOOGLE_ANALYTICS_ID);
}

// Check for consent
const consentGiven = getCookie('analytics_consent');

if (consentGiven === 'true') {
  loadGoogleAnalytics();
} else if (consentGiven === null) {
  // If consent hasn't been given or denied, ask for consent
  const consent = confirm('This website uses Google Analytics to improve user experience. Do you consent to the use of cookies for analytics purposes?');
  if (consent) {
    setCookie('analytics_consent', 'true', 365); // Set consent cookie for 1 year
    loadGoogleAnalytics();
  } else {
    setCookie('analytics_consent', 'false', 365);
  }
}