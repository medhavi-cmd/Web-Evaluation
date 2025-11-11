document.addEventListener('DOMContentLoaded', function () {
  async function loadFAQs() {
    try {
      const response = await fetch('faq-data.json');
      const data = await response.json();
      const faqContainer = document.getElementById('faqContainer');
      data.faqs.forEach(function (faq) {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML =
          '<div class="faq-question">' +
          '<span>' + faq.question + '</span>' +
          '<span class="faq-arrow">▼</span>' +
          '</div>' +
          '<div class="faq-answer">' +
          '<p>' + faq.answer + '</p>' +
          '</div>';
        faqContainer.appendChild(faqItem);
      });
      bindFaqToggles();
    } catch (error) {
      console.error('Error loading FAQ data:', error);
      document.getElementById('faqContainer').innerHTML = '<p style="color: white;">Unable to load FAQs. Please try again later.</p>';
    }
  }

  function bindFaqToggles() {
    var questions = document.querySelectorAll('.faq-question');
    questions.forEach(function (q) {
      q.addEventListener('click', function () {
        var faqItem = q.parentElement;
        var answer = faqItem.querySelector('.faq-answer');
        var arrow = q.querySelector('.faq-arrow');
        document.querySelectorAll('.faq-item').forEach(function (item) {
          if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            item.querySelector('.faq-arrow').style.transform = 'rotate(0deg)';
          }
        });
        faqItem.classList.toggle('active');
        if (faqItem.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          arrow.style.transform = 'rotate(180deg)';
        } else {
          answer.style.maxHeight = null;
          arrow.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  loadFAQs();
});

