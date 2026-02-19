const titleEl = document.getElementById("recipeTitle");
const imageEl = document.getElementById("recipeImage");
const ingredientsEl = document.getElementById("ingredientsList");
const stepsEl = document.getElementById("stepsList");
const errorEl = document.getElementById("errorMessage");

const showError = (message) => {
  errorEl.textContent = message;
  errorEl.classList.remove("d-none");
};

const renderList = (container, items, fallback) => {
  container.innerHTML = "";
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = fallback;
    container.appendChild(li);
    return;
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
};

const loadRecipe = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showError("Missing recipe id.");
    return;
  }

  let res;
  try {
    res = await fetch(`/api/recipes/${id}`);
  } catch (err) {
    showError("Failed to load recipe.");
    return;
  }

  if (!res.ok) {
    showError("Recipe not found.");
    return;
  }

  const recipe = await res.json();

  titleEl.textContent = recipe.title || "Recipe";
  imageEl.src = recipe.imageUrl || "https://via.placeholder.com/800x500";
  imageEl.alt = recipe.title || "Recipe image";

  renderList(ingredientsEl, recipe.ingredients, "No ingredients listed.");
  renderList(stepsEl, recipe.steps, "No steps provided.");
};

loadRecipe();
