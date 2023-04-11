import { DETAILS } from "./details.js";
let Details = new DETAILS();
export class HOME {
  constructor() {
    this.displayMeals();
    this.getMealId();
  }

  async getHomeMeals() {
    $(".loader").fadeIn(300);
    let mealsAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );

    let response = await mealsAPI.json();
    $(".loader").fadeOut(300);
    let allData = response.meals;
    return allData;
  }

  async displayMeals() {
    let container = ``;
    let ApiData = await this.getHomeMeals();
    for (let i = 0; i < ApiData.length; i++) {
      container += `
  <div class="col-md-3">
  <div data-id="${ApiData[i].idMeal}" class="meal position-relative  rounded-2 overflow-hidden">
    <img src="${ApiData[i].strMealThumb}" class="w-100" alt="" />
    <div
      class="meal-layer position-absolute d-flex align-items-center text-black p-2"
    >
      <h3>${ApiData[i].strMeal}</h3>
    </div>
  </div>
  </div>
  `;
    }
    $(".mealsRow").append(container);
    this.getMealId();
  }

  getMealId() {
    $(".meal").click((e) => {
      let id = e.currentTarget.getAttribute("data-id");
      Details.displayDetails(id);
      $("section").fadeOut(500, () => {
        $("#details").fadeIn(500);
      });
    });
  }
}
