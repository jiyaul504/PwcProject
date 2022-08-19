const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const nextBtnFour = document.querySelector(".next-3");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");

document.querySelector(".slide-2").style.display = "none";
document.querySelector(".slide-3").style.display = "none";
document.querySelector(".slide-4").style.display = "none";
document.querySelector(".slide-5").style.display = "none";

let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.width = "3%";
     document.querySelector(".slide-2").style.display = "block";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function(event){
  event.preventDefault();
        
  document.querySelector(".slide-3").style.display = "block";
  document.querySelector(".slide-2").style.width = "3%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function(event){
  event.preventDefault();
      document.querySelector(".slide-4").style.display = "block";
   document.querySelector(".slide-3").style.width = "3%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});


nextBtnFour.addEventListener("click", function(event){
  event.preventDefault();
      document.querySelector(".slide-5").style.display = "block";
   document.querySelector(".slide-4").style.width = "3%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});