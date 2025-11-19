document.addEventListener('DOMContentLoaded', function () {

class FAQItem {
    constructor(id, question, answer) {
      this.id = id;
      this.question = question;
      this.answer = answer;
      this.expanded = false;
    }

  render() {
    return `
      <div class="faq-item" data-id="${this.id}">
        <div class="faq-question">
          <span>${this.question}</span>
          <span class="faq-arrow">▼</span>
        </div>

        <div class="faq-answer">
          <p>${this.answer}</p>
        </div>
      </div>
    `;
  }
  }



  let faqObjects = [];

  async function loadFAQs() {
    const res = await fetch("/faq-data.json");
    const data = await res.json();
    faqObjects = data.faqs.map(f => new FAQItem(f.id, f.question, f.answer));

    renderFAQ();
  }



  function renderFAQ() {
    const container = document.getElementById("faqContainer");
    container.innerHTML = faqObjects.map(f => f.render()).join("");

    applyAnimations();
  }



  document.getElementById("faqContainer").addEventListener("click", function (e) {

    const questionDiv = e.target.closest(".faq-question");
    if (!questionDiv) return;

    const faqItemDiv = questionDiv.parentElement;
    const id = faqItemDiv.dataset.id;

    const faqObj = faqObjects.find(f => f.id == id);

    // collapse all others
    faqObjects.forEach(obj => {
      if (obj.id != id) obj.expanded = false;
    });

    faqObj.expanded = !faqObj.expanded;

    renderFAQ();
  });



  function applyAnimations() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const id = item.dataset.id;
      const obj = faqObjects.find(f => f.id == id);
      const ans = item.querySelector(".faq-answer");
      const arrow = item.querySelector(".faq-arrow");

      if (obj.expanded) {
        item.classList.add("active");
        ans.style.maxHeight = ans.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
      } else {
        item.classList.remove("active");
        ans.style.maxHeight = null;
        arrow.style.transform = "rotate(0deg)";
      }
    });
  }



  loadFAQs();

});
