import { HOME } from "./home.js";
let home = new HOME();

export class INGREDIENT {
  constructor() {
    this.displayIngredients();
    this.previewAreaPage();
  }

  async getIngredientAPI() {
    $(".loader").fadeIn(300);
    let fetchIngredient = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let IngredientApi = await fetchIngredient.json();
    $(".loader").fadeOut(300);
    let AllIngredients = IngredientApi.meals;
    return AllIngredients;
  }

  async displayIngredients() {
    let container = ``;
    let data = await this.getIngredientAPI();
    for (let i = 0; i < 20; i++) {
      container += `
      <div class="col-md-3">
      <div class="mealIngredient" data-ingredient="${data[i].strIngredient}">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${data[i].strIngredient}</h3>
        <p> ${data[i].strDescription.slice(0, 100)} </p>
      </div>
    </div>
        `;
    }
    $("#ingredientData").html(container);
    this.getMealIngredient();
  }

  async getOneIngredientApi(ing) {
    $(".loader").fadeIn(300);
    let fetchIngredient = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
    );
    let response = await fetchIngredient.json();
    $(".loader").fadeOut(300);
    let finalData = response.meals;
    return finalData;
  }

  getMealIngredient() {
    $(".mealIngredient").click(async (e) => {
      let container = ``;
      let ing = e.currentTarget.getAttribute("data-ingredient");
      let ingredientMeal = await this.getOneIngredientApi(ing);
      for (let i = 0; i < ingredientMeal.length; i++) {
        container += `
        <div class="col-md-3">
        <div data-id="${ingredientMeal[i].idMeal}" class="meal position-relative  rounded-2 overflow-hidden">
          <img src="${ingredientMeal[i].strMealThumb}" class="w-100" alt="" />
          <div
            class="meal-layer position-absolute d-flex align-items-center text-black p-2"
          >
            <h3>${ingredientMeal[i].strMeal}</h3>
          </div>
        </div>
        </div>
        `;
      }
      $("#ingredientData").fadeOut(500, () => {
        $("#ingredientMeals").fadeIn(500).html(container);
        home.getMealId();
      });
    });
  }
  previewAreaPage() {
    $(".links #ingredient").click(() => {
      $("section").fadeOut(500, () => {
        $("#ingredients").fadeIn(500);
      });
    });
  }
}
