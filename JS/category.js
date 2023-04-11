import { HOME } from "./home.js";
let home = new HOME();

export class CATEGORY {
  constructor() {
    this.displayCategories();
    this.previewCategoryPage();
    this.getCategoryAPi();
  }

  async getCategoriesAPI() {
    $(".loader").fadeIn(300);
    let categoriesAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let categoriesResponse = await categoriesAPI.json();
    $(".loader").fadeOut(300);
    let finalResponse = categoriesResponse.categories;
    return finalResponse;
  }

  async getCategoryAPi() {
    $(".loader").fadeIn(300);
    let categoryAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=beef`
    );
    let categoryResponse = await categoryAPI.json();
    $(".loader").fadeOut(300);
    let response = categoryResponse.meals;
    return response;
  }

  async displayCategories() {
    let container = ``;
    let mealsCategory = await this.getCategoriesAPI();
    for (let i = 0; i < mealsCategory.length; i++) {
      container += `
        <div class="col-md-3">
                <div data-category="${mealsCategory[i].strCategory}"  class="category position-relative overflow-hidden">
                  <img src="${mealsCategory[i].strCategoryThumb}" class="w-100" alt="" />
                  <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${mealsCategory[i].strCategory}</h3>
                    <p>
                    ${mealsCategory[i].strCategoryDescription}
                    </p>
                  </div>
                </div>
              </div>
        `;
    }
    $("#rowData").html(container);
    this.getMealCat();
  }

  async getOneCategoryAPI(category) {
    $(".loader").fadeIn(300);
    let fetchCategory = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    let response = await fetchCategory.json();
    $(".loader").fadeOut(300);
    let finalData = response.meals;
    return finalData;
  }

  getMealCat() {
    $(".category").click(async (e) => {
      let cat = e.currentTarget.getAttribute("data-category");
      let categoryMeals = await this.getOneCategoryAPI(cat);
      let cartona = ``;
      for (let i = 0; i < categoryMeals.length; i++) {
        cartona += `
        <div class="col-md-3">
        <div data-id="${categoryMeals[i].idMeal}" class="meal position-relative  rounded-2 overflow-hidden">
          <img src="${categoryMeals[i].strMealThumb}" class="w-100" alt="" />
          <div
            class="meal-layer position-absolute d-flex align-items-center text-black p-2"
          >
            <h3>${categoryMeals[i].strMeal}</h3>
          </div>
        </div>
        </div>
        `;
      }
      $("#rowData").fadeOut(500, () => {
        $("#categoryMeals").fadeIn(500).html(cartona);
        home.getMealId();
      });
    });
  }

  previewCategoryPage() {
    $(".links #category").click(() => {
      $("section").fadeOut(500, () => {
        $("#categories").fadeIn(500);
      });
    });
  }
}
