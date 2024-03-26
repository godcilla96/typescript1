// lite variabler
var courseKey = "courses";
var courses = [];
var coursesData = localStorage.getItem(courseKey);
if (coursesData) {
    courses = JSON.parse(coursesData);
}
var addBtnEl = document.getElementById("addBtn");
var nameEl = document.getElementById("coursename");
var codeEl = document.getElementById("coursecode");
var progEl = document.getElementById("progression");
var courseList = document.querySelector(".courses");
// lägg till kurs
if (addBtnEl) {
    addBtnEl.addEventListener("click", function (event) {
        event.preventDefault();
        if (nameEl && codeEl && progEl) {
            var name_1 = nameEl.value.trim();
            var code = codeEl.value.trim();
            var progression = progEl.value.trim();
            if (name_1 && code && progression) {
                addCourse(name_1, code, progression);
            }
            else {
                // det går ej lägga till en kurs om inte alla fält är ifyllda
                alert("Vänligen fyll i alla fält.");
                console.error("Fyll i alla fält");
            }
        }
    });
}
// laddar in kurserna som sparats i localStorage
window.onload = loadCourses;
function loadCourses() {
    var coursesData = localStorage.getItem(courseKey);
    if (coursesData) {
        var courses_1 = JSON.parse(coursesData);
        displayCourses(courses_1);
    }
}
function displayCourses(data) {
    if (courseList) {
        courseList.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            courseList.innerHTML += "\n      <div id=\"course".concat(data[i].id, "\">\n          <h3 contenteditable=\"true\" oninput=\"toggleButton(").concat(data[i].id, ", 'name')\">").concat(data[i]['name'], "</h3>\n          <p contenteditable=\"true\" oninput=\"toggleButton(").concat(data[i].id, ", 'code')\">").concat(data[i]['code'], "</p>\n          <p contenteditable=\"true\" oninput=\"toggleButton(").concat(data[i].id, ", 'progression')\">").concat(data[i]['progression'], "</p>\n          <p><a href=\"").concat(data[i]['syllabus'], "\" target=\"_blank\">L\u00E5tsaskursplan</a></p> \n          <button class=\"deleteBtn\" data-id=\"").concat(data[i].id, "\">Radera</button>\n          <button id=\"btn").concat(data[i].id, "\" onclick=\"saveChanges(").concat(data[i].id, ")\" disabled>Spara</button>\n      </div>");
        }
        var deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var courseId = button.getAttribute('data-id');
                if (courseId) {
                    deleteCourse(parseInt(courseId));
                }
            });
        });
    }
}
function addCourse(name, code, progression) {
    // en liten fejk-kursplan
    var fakeSyllabusUrl = "https://example.com/syllabus";
    var coursesData = localStorage.getItem(courseKey);
    var courses = [];
    if (coursesData) {
        courses = JSON.parse(coursesData);
    }
    // LÄGG EJ TILL EN KURSKOD SOM REDAN EXISTERAR
    var codeExists = false;
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].code === code) {
            codeExists = true;
            break;
        }
    }
    if (codeExists) {
        alert("Kurskoden är redan sparad. Använd en annan kurskod.");
        return;
    }
    var id = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
    var newCourse = { id: id, name: name, code: code, progression: progression, syllabus: fakeSyllabusUrl };
    courses.push(newCourse);
    localStorage.setItem(courseKey, JSON.stringify(courses));
    loadCourses();
}
// en liten boolean-funktion för progressionen
function isValidProgression(progression) {
    return progression === "A" || progression === "B" || progression === "C";
}
// knappen för att spara
function toggleButton(id) {
    var buttonEl = document.getElementById("btn" + id);
    if (buttonEl) {
        buttonEl.removeAttribute("disabled");
    }
}
function saveChanges(id) {
    var nameEl = document.querySelector("#course" + id + " p:first-child");
    var codeEl = document.querySelector("#course" + id + " p:nth-child(2)");
    var progEl = document.querySelector("#course" + id + " p:nth-child(3)");
    if (nameEl && codeEl && progEl) {
        var name_2 = nameEl.textContent || '';
        var code_1 = codeEl.textContent || '';
        var progression = progEl.textContent || '';
        // sparar endast om progressionen uppfyller kraven
        if (!isValidProgression(progression)) {
            alert("Ogiltig progression. Progressionen måste vara 'A', 'B', eller 'C'.");
            window.location.reload();
            return;
        }
        var coursesData_1 = localStorage.getItem(courseKey);
        if (coursesData_1) {
            var courses_2 = JSON.parse(coursesData_1);
            // kollar så att kurskoden är unik vid ändring av data
            var codeExists = courses_2.some(function (course) { return course.code === code_1 && course.id !== id; });
            if (codeExists) {
                alert("Kurskoden är redan sparad. Använd en annan kurskod.");
                window.location.reload();
                return;
            }
            var index = -1;
            for (var i = 0; i < courses_2.length; i++) {
                if (courses_2[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                courses_2[index].name = name_2;
                courses_2[index].code = code_1;
                courses_2[index].progression = progression;
                localStorage.setItem(courseKey, JSON.stringify(courses_2));
                loadCourses();
            }
        }
    }
}
// ta bort kurs från localstorage
function deleteCourse(id) {
    var confirmDelete = confirm("Är du säker på att du vill radera denna kurs?");
    if (confirmDelete) {
        var coursesData_2 = localStorage.getItem(courseKey);
        if (coursesData_2) {
            var courses_3 = JSON.parse(coursesData_2);
            courses_3 = courses_3.filter(function (course) { return course.id !== id; });
            localStorage.setItem(courseKey, JSON.stringify(courses_3));
            loadCourses();
        }
    }
}
