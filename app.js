const buttons = [...document.querySelectorAll(".filter-button")];
const cards = [...document.querySelectorAll(".prompt-card")];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});
