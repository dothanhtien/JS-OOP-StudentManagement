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
  renderStudentList();
};

var renderStudentList = function () {
  var content = "";

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
          <button class="btn btn-danger btn-sm">Delete</button>
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
