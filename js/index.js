var studentList = [];

var addStudent = function () {
  var id = document.querySelector("#txtId").value;
  var name = document.querySelector("#txtName").value;
  var gender = getGender();
  var math = +document.querySelector("#txtMath").value;
  var physics = +document.querySelector("#txtPhysics").value;
  var chemistry = +document.querySelector("#txtChemistry").value;

  var newStudent = new Student(id, name, gender, math, physics, chemistry);
  studentList.push(newStudent);
  storeData();
  renderStudentList();

  // clear form
  document.querySelector("#btnReset").click();
};

var deleteStudent = function (id) {
  var index = findIndexById(id);
  studentList.splice(index, 1);
  storeData();
  renderStudentList();
};

var renderStudentList = function () {
  var content = "";

  if (!studentList.length) {
    content =
      '<tr><td colspan="7" class="fst-italic">There are no students to display.</td></tr>';
  }

  for (var i = 0; i < studentList.length; i++) {
    content += `
      <tr>
        <th scope="row">${studentList[i].id}</th>
        <td>${studentList[i].name}</td>
        <td class="gender ${studentList[i].gender}">
          <i class="fas fa-mars text-primary"></i>
          <i class="fas fa-venus text-info"></i>
        </td>
        <td>${studentList[i].math}</td>
        <td>${studentList[i].physics}</td>
        <td>${studentList[i].chemistry}</td>
        <td>
          <button class="btn btn-primary btn-sm">Update</button>
          <button 
            class="btn btn-danger btn-sm" 
            onclick="deleteStudent('${studentList[i].id}')"
          >Delete</button>
        </td>
      </tr>
    `;
  }

  document.querySelector("#studentList").innerHTML = content;
};

var getGender = function () {
  var genderRadios = document.getElementsByName("genderRadios");

  for (var i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      return genderRadios[i].value;
    }
  }

  return "";
};

var findIndexById = function (id) {
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].id === id) {
      return i;
    }
  }

  return -1;
};

var storeData = function () {
  localStorage.setItem("studentList", JSON.stringify(studentList));
};

var fetchData = function () {
  var studentJSON = localStorage.getItem("studentList");
  
  if (studentJSON) {
    studentList = JSON.parse(studentJSON);
  }

  renderStudentList();
};

fetchData();
