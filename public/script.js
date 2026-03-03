// public/script.js

const tooltip = document.getElementById("tooltip");

function showTooltip(text, x, y) {
  tooltip.textContent = text;
  tooltip.style.left = x + 12 + "px";
  tooltip.style.top = y + 12 + "px";
  tooltip.classList.remove("hidden");
}

function hideTooltip() {
  tooltip.classList.add("hidden");
  tooltip.textContent = "";
}

async function getIngredientInfo(id) {
  const res = await fetch(`/api/ingredients/${id}`);
  if (!res.ok) return "No info available.";
  const data = await res.json();
  return data.info || "No info available.";
}

document.querySelectorAll(".ingredient").forEach((li) => {
  let cached = null;

  li.addEventListener("mouseenter", async (e) => {
    const id = li.dataset.ingredientId;

    if (!cached) {
      cached = await getIngredientInfo(id);
    }

    showTooltip(cached, e.pageX, e.pageY);
  });

  li.addEventListener("mousemove", (e) => {
    if (!tooltip.classList.contains("hidden")) {
      tooltip.style.left = e.pageX + 12 + "px";
      tooltip.style.top = e.pageY + 12 + "px";
    }
  });

  li.addEventListener("mouseleave", () => {
    hideTooltip();
  });
});