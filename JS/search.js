import { HOME } from "./home.js";
let home = new HOME();
export class SEARCH {
  constructor() {
    $("#searchByName").keyup((e) => {
      let inputValue = $(e.target).val();
      this.displaySearchByName(inputValue);
    });
    $("#searchByLetter").keyup((e) => {
      let inputLetter = $(e.target).val();
      this.displaySearchByFirstLetter(inputLetter);
    });
    this.previewSearchPage();
  }

  async searchByNameAPI(value) {
    $(".loader").fadeIn(300);
    let Api =
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}
    `);
    let response = await Api.json();
    $(".loader").fadeOut(300);
    let searchByName = response.meals;
    return searchByName;
  }

  async searchByFirstLetterAPI(val) {
    $(".loader").fadeIn(300);
    val == "" ? (val = "a") : "";
    let fetchApi = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`
    );
    let finalResponse = await fetchApi.json();
    $(".loader").fadeOut(300);
    let searchByFirstLetter = finalResponse.meals;
    return searchByFirstLetter;
  }

  async displaySearchByName(value) {
    let container = ``;
    let ApiData = await this.searchByNameAPI(value);
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
    $(".searchRow").html(container, 1000);
    home.getMealId();
  }

  async displaySearchByFirstLetter(val) {
    let container = ``;
    let ApiData = await this.searchByFirstLetterAPI(val);
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
    $(".searchRow").html(container);
    home.getMealId();
  }

  previewSearchPage() {
    $(".links #search").click(() => {
      $("section").fadeOut(500, () => {
        $("#searches").fadeIn(500);
      });
    });
  }
}
