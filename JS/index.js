import { HOME } from "./home.js";
let home = new HOME();
import { DETAILS } from "./details.js";
let details = new DETAILS();
import { SEARCH } from "./search.js";
let search = new SEARCH();
import { CONTACT } from "./contact.js";
let contact = new CONTACT();
import { CATEGORY } from "./category.js";
let category = new CATEGORY();
import { AREA } from "./area.js";
let area = new AREA();
import { INGREDIENT } from "./ingredient.js";
let ingredient = new INGREDIENT();

///////////////////////// SideNav ////////////////////////

let navTabWidth = $(".nav-tab").innerWidth();
$(".side-nav-menu").animate({ left: `-${navTabWidth}` }, 500);
function closeSideNav() {
  $(".close-icon,#search,#category,#area,#ingredient,#contact").click(() => {
    $(".side-nav-menu").animate({ left: `-${navTabWidth}` }, 500);
    $(".links li").animate({ bottom: "-100px" }, 200);
    $(".open-icon").removeClass("d-none");
    $(".close-icon").addClass("d-none");
  });
}

function OpenSideNav() {
  $(".open-icon").click(() => {
    $(".side-nav-menu").animate({ left: `0px` }, 500);
    $(".links #search").animate({ bottom: "0" }, 400);
    $(".links #category").animate({ bottom: "0" }, 500);
    $(".links #area").animate({ bottom: "0" }, 600);
    $(".links #ingredient").animate({ bottom: "0" }, 700);
    $(".links #contact").animate({ bottom: "0" }, 800);

    $(".open-icon").addClass("d-none");
    $(".close-icon").removeClass("d-none");
  });
}
OpenSideNav();
closeSideNav();
