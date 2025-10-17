const courseList = document.getElementById("course-list");
const openAddCourseModal = document.getElementById("open-add-course-modal");
const courseModal = document.getElementById("course-modal");
const courseForm = document.getElementById("course-form");
const courseNameInput = document.getElementById("course-name");
const courseDescriptionInput = document.getElementById("course-description");
const courseIdInput = document.getElementById("course-id");
class Course {
  //Khởi tạo
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  //render giao diện
  render() {
    return `
        <tr>
            <td>${this.id}</td>
            <td>${this.name}</td>
            <td>${this.description}</td>
            <td>
                 <button class="action-button edit-button" data-id="${this.id}">
                    <i class="fas fa-edit"></i>
                 </button>   
                <button class="action-button delete-button" data-id="${this.id}">
                    <i class="fas fa-trash-alt"></i>
                 </button>   
            </td>
        </tr>  
        `;
  }
}
//Show dữ liệu khóa học
if (courseList) {
  fetch("http://localhost:3000/courses")
    .then((response) => response.json())
    .then((courses) => {
      let html = "";
      // console.log(courses);
      courses.forEach((item) => {
        const course = new Course(item.id, item.name, item.description);
        html += course.render();
      });
      courseList.innerHTML = html;
    });
}
//Hiện Modal thêm khóa học lên
if (openAddCourseModal) {
  openAddCourseModal.addEventListener("click", () => {
    courseModal.style.display = "block";
  });
  courseForm.addEventListener("submit", (event) => {
    event.preventDefault(); //ngăn việc load trang
    if (courseForm.getAttribute("data=mode") === "edit") {
      //chức năng sửa dữ liệu
      const updateCourse = {
        id: co,
        name: courseNameInput.value,
        description: courseDescriptionInput.value,
      };
    } else {
    }
    const newCourse = {
      id: Date.now().toString(),
      name: courseNameInput.value,
      description: courseDescriptionInput.value,
    };
    //Hàm post để thêm dữ liệu lên server
    fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    }).catch((error) => console.error("Lỗi: ", error));
  });
}

// bấm nút sữa hiện modal sữa xài chùng model thêm
if (courseList) {
  courseList.addEventListener("click", (Event) => {
    if (Event.target.closest(".edit-button")) {
      const button = Event.target.closest(".edit-button");
      const id = button.getAttribute("data-id");
      console.log(button);
      console.log(id);
      // thêm thuộc tính để form chuyển thành form edit
      courseForm.setAttribute("data-mode", "edit");
      fetch("http://localhost:3000/courses")
        .then((response) => response.json())
        .then((course) => {
          console.log(course);
          courseIdInput.value = course.id;
          courseNameInput.value = course.name;
          courseDescriptionInput.value = course.description;
          courseModal.style.display = "block";
        });
    }
  });
}

// xóa kháo học
if (courseList) {
  courseList.addEventListener("click", (Event) => {
    if (Event.target.closest(".delete-button")) {
      const button = Event.target.closest(".delete-button");
      const id = button.getAttribute("data-id");
      if (confirm("bạn có chắc muốn xóa khóa học này ko")) {
        fetch(`http://localhost:3000/courses/${id}`, {
          method: "DELETE",
        }).catch((error) => console.error("Lỗi: ", error));
      }
    }
  });
}
// đóng modal khi bấm ra ngoài
window.addEventListener("click", (Event) => {
  if (Event.target == courseModal) {
    courseModal.style.display = "none";
    courseForm.removeAttribute("data-mode"); //xóa chế độ sữa
    courseForm.reset();
  }
});
