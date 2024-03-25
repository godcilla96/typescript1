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

// laddar in kurserna som sparats
window.onload = loadCourses;
function loadCourses(): void {
  let coursesData: string | null = localStorage.getItem(courseKey);
  if (coursesData) { 
    let courses: any[] = JSON.parse(coursesData);
    displayCourses(courses);
  }
}


function displayCourses(data: any[]): void {
  if (courseList) {
    courseList.innerHTML = "";
    console.table(data);
    for (let i = 0; i < data.length; i++) {
      courseList.innerHTML += `
      <div id="course${data[i].id}">
          <p contenteditable="true" oninput="toggleButton(${data[i].id}, 'name')">${data[i]['name']}</p>
          <p contenteditable="true" oninput="toggleButton(${data[i].id}, 'code')">${data[i]['code']}</p>
          <p contenteditable="true" oninput="toggleButton(${data[i].id}, 'progression')">${data[i]['progression']}</p>
          <p><a href="${data[i]['syllabus']}" target="_blank">Låtsaskursplan</a></p> <!-- Display syllabus URL as link -->
          <button onclick="deleteCourse(${data[i].id})">Radera</button>
          <button id="btn${data[i].id}" onclick="saveChanges(${data[i].id})" disabled>Spara</button>
      </div>`;
    }
  }
}

function addCourse(name: string, code: string, progression: string): void {
  // en liten fejk-kursplan
  const fakeSyllabusUrl: string = "https://example.com/syllabus";

  const coursesData: string | null = localStorage.getItem(courseKey);
  let courses: any[] = [];
  if (coursesData) {
      courses = JSON.parse(coursesData);
  }
  const existingCourse = courses.find(course => course.code === code);
  if (existingCourse) {
      alert("Kurskoden är redan sparad. Använd en annan kurskod.");
      return; // LÄGG EJ TILL EN KURSKOD SOM REDAN EXISTERAR
  }
  const id: number = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
  const newCourse = { id, name, code, progression, syllabus: fakeSyllabusUrl };
  courses.push(newCourse);
  localStorage.setItem(courseKey, JSON.stringify(courses));
  loadCourses();
}
/*
function saveChanges();
function addCourse();
*/