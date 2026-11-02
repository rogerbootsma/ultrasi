const stars = document.querySelector('#stars');
const range = document.querySelector('#ultra-range');
const caption = document.querySelector('#study-caption');
if (stars && range && caption) {
  for (let i = 0; i < 57; i += 1) {
    const star = document.createElement('span');
    star.className = i % 13 === 0 ? 'star cross' : 'star';
    star.style.left = `${2 + ((i * 43.71) % 94)}%`;
    star.style.top = `${13 + ((i * 27.33) % 73)}%`;
    if (i % 13 === 0) star.textContent = '✦';
    else {
      const size = 1 + (i % 4) * 0.45;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
    }
    star.style.setProperty('--drift-duration', `${7 + (i % 7) * 1.7}s`);
    star.style.setProperty('--twinkle-duration', `${2.4 + (i % 5) * 0.6}s`);
    star.style.setProperty('--star-delay', `${-(i % 11) * 0.87}s`);
    stars.append(star);
  }
  const updateStudy = () => {
    const value = Number(range.value);
    caption.textContent = value < 34 ? 'Every possibility begins with a world.' : value < 70 ? 'An encounter. An experience. A new connection.' : 'A little cosmic optimism. A whole world to explore.';
    range.setAttribute('aria-valuetext', `${value} percent of the star bar. Decorative illustration.`);
    stars.style.opacity = String(0.4 + value * 0.006);
  };
  range.addEventListener('input', updateStudy);
  document.querySelector('#reset-study')?.addEventListener('click', () => {
    range.value = '100';
    updateStudy();
  });
  updateStudy();
}

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const status = document.querySelector('#enquiry-status');
  const draft = document.querySelector('#email-draft');
  const draftText = document.querySelector('#email-draft-text');
  const gmail = document.querySelector('#open-gmail');
  const app = document.querySelector('#open-email-app');
  const prepare = () => {
    if (!enquiryForm.reportValidity()) return null;
    const data = new FormData(enquiryForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const interest = String(data.get('interest') || 'Research');
    if (!name || !message) {
      status.textContent = 'Please include your name and a few words about your idea.';
      return null;
    }
    const subject = `Ultrasi enquiry: ${interest}`;
    const body = `Hello Metaversal Arts,\n\n${message}\n\nArea of interest: ${interest}\n\nFrom: ${name}\nEmail: ${email}`;
    const text = `To: contact@metaversalarts.io\nSubject: ${subject}\n\n${body}`;
    draftText.value = text;
    gmail.href = 'https://mail.google.com/mail/?' + new URLSearchParams({view: 'cm', fs: '1', to: 'contact@metaversalarts.io', su: subject, body});
    app.href = 'mailto:contact@metaversalarts.io?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    draft.hidden = false;
    status.textContent = '';
    return text;
  };
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (prepare()) document.querySelector('#email-draft-title').focus();
  });
  const copy = async () => {
    const text = prepare();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Email copied. Paste it into your email service and send when ready.';
    } catch {
      draftText.focus();
      draftText.select();
      status.textContent = 'Your draft is selected. Use your device’s Copy command, then paste it into your email service.';
    }
  };
  document.querySelector('#copy-enquiry').addEventListener('click', copy);
  document.querySelector('#copy-draft').addEventListener('click', copy);
  app.addEventListener('click', () => {
    status.textContent = 'If no email app opens, use Open Gmail or copy your draft. Nothing has been sent yet.';
  });
  enquiryForm.addEventListener('input', event => {
    if (event.target === draftText || draft.hidden) return;
    draft.hidden = true;
    draftText.value = '';
    gmail.href = 'https://mail.google.com/mail/';
    app.href = 'mailto:contact@metaversalarts.io';
    status.textContent = 'Your details changed. Prepare the email again to update your draft.';
  });
  enquiryForm.hidden = false;
}
