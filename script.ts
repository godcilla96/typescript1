// lite variabler
let courseKey: string = "courses";
let courses: any[] = [];
const coursesData: string | null = localStorage.getItem(courseKey);
if (coursesData) {
    courses = JSON.parse(coursesData);
}
let addBtnEl: HTMLElement | null = document.getElementById("addBtn");
let nameEl: HTMLInputElement | null = document.getElementById("coursename") as HTMLInputElement;
let codeEl: HTMLInputElement | null = document.getElementById("coursecode") as HTMLInputElement;
let progEl: HTMLSelectElement | null = document.getElementById("progression") as HTMLSelectElement;
let courseList: HTMLElement | null = document.querySelector(".courses");

if (addBtnEl) {
  addBtnEl.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault();
      if (nameEl && codeEl && progEl) {
          const name: string = nameEl.value.trim();
          const code: string = codeEl.value.trim();
          const progression: string = progEl.value.trim();
          if (name && code && progression) {
              addCourse(name, code, progression);
          } else {
              console.error("Please fill in all fields.");
          }
      }
  });
}
