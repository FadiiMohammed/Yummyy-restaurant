export class DETAILS {
  constructor() {
    this.getDetailsAPI();
    this.displayDetails();
  }

  async getDetailsAPI(id) {
    $(".loader").fadeIn(300);
    let detailsApi =
      await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}
      `);
    let detailResponse = await detailsApi.json();
    $(".loader").fadeOut(300);
    let details = detailResponse.meals;
    return details;
  }

  async displayDetails(mealID) {
    let mealDetail = await this.getDetailsAPI(mealID);
    let meal = mealDetail[0];
    console.log(meal);
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
      }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) {
      tags = [];
    }

    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
      tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let container = `
    <div class="col-md-4 text-white">
    <img src="${meal.strMealThumb}" class="w-100 rounded-3 m-2" alt="meal Photo" />
    <h2>${meal.strMeal}</h2>
  </div>
  <div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>
     ${meal.strInstructions}
    </p>
    <h3><span>Area: </span>${meal.strArea}</h3>
    <h3><span>Category: </span>${meal.strCategory}</h3>
    <h3>Recipes:</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">
  ${ingredients}
    
    </ul>
    <h3>Tags:</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">
     ${tagsStr}
    </ul>
    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
  </div>
    `;
    $("#details .row").html(container);
  }
}
