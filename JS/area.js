import { HOME } from "./home.js";
let home = new HOME();

export class AREA {
  constructor() {
    this.displayArea();
    this.previewAreaPage();
    this.getArea();
  }

  async getAreaAPI() {
    $(".loader").fadeIn(300);
    let fetchArea = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let areaApi = await fetchArea.json();
    $(".loader").fadeOut(300);
    let AllAreas = areaApi.meals;
    return AllAreas;
  }
  async displayArea() {
    let container = ``;
    let data = await this.getAreaAPI();
    for (let i = 0; i < data.length; i++) {
      container += `
      <div class="col-md-3">
        <div class="area" data-area="${data[i].strArea}">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${data[i].strArea}</h3>
      </div>
      </div>
        `;
    }
    $("#areaData").html(container);
    this.getArea();
  }

  async getOneAreaAPI(area) {
    $(".loader").fadeIn(300);
    let wantedAreaAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let dataResponse = await wantedAreaAPI.json();
    $(".loader").fadeOut(300);
    let areaData = dataResponse.meals;
    return areaData;
  }

  getArea() {
    $(".area").click(async (e) => {
      let areaName = e.currentTarget.getAttribute("data-area");
      let areaMeals = await this.getOneAreaAPI(areaName);
      let container = ``;
      for (let i = 0; i < areaMeals.length; i++) {
        container += `
        <div class="col-md-3">
        <div data-id="${areaMeals[i].idMeal}" class="meal position-relative  rounded-2 overflow-hidden">
          <img src="${areaMeals[i].strMealThumb}" class="w-100" alt="" />
          <div
            class="meal-layer position-absolute d-flex align-items-center text-black p-2"
          >
            <h3>${areaMeals[i].strMeal}</h3>
          </div>
        </div>
        </div>
        `;
      }
      $("#areaData").fadeOut(500, () => {
        $("#areaMeals").fadeIn(500).html(container);
        home.getMealId();
      });
    });
  }

  previewAreaPage() {
    $(".links #area").click(() => {
      $("section").fadeOut(500, () => {
        $("#areas").fadeIn(500);
      });
    });
  }
}
