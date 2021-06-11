var studentList = [];

var addStudent = function () {
  var id = document.querySelector("#txtId").value;
  var name = document.querySelector("#txtName").value;
  var gender = getGender();
  var math = +document.querySelector("#txtMath").value;
  var physics = +document.querySelector("#txtPhysics").value;
  var chemistry = +document.querySelector("#txtChemistry").value;

  if (!validateForm()) return;

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

var updateStudent = function () {
  var id = document.querySelector("#txtId").value;
  var name = document.querySelector("#txtName").value;
  var gender = getGender();
  var math = +document.querySelector("#txtMath").value;
  var physics = +document.querySelector("#txtPhysics").value;
  var chemistry = +document.querySelector("#txtChemistry").value;

  var index = findIndexById(id);

  studentList[index].name = name;
  studentList[index].gender = gender;
  studentList[index].math = math;
  studentList[index].physics = physics;
  studentList[index].chemistry = chemistry;

  storeData();
  renderStudentList();

  document.querySelector("#btnReset").click();
  document.querySelector("#txtId").removeAttribute("disabled");
  document.querySelector("#btnAdd").style.display = "inline-block";
  document.querySelector("#btnUpdate").style.display = "none";
  document.querySelector("#btnCancel").style.display = "none";
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
          <button 
            class="btn btn-primary btn-sm"
            onclick="fillStudentIntoForm('${studentList[i].id}')"
          >Update</button>
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

var fillStudentIntoForm = function (id) {
  var index = findIndexById(id);
  var studentIdElem = document.querySelector("#txtId");

  studentIdElem.value = studentList[index].id;
  document.querySelector("#txtName").value = studentList[index].name;
  studentList[index].gender === "male"
    ? (document.querySelector("#chkMale").checked = true)
    : (document.querySelector("#chkFemale").checked = true);
  document.querySelector("#txtMath").value = studentList[index].math;
  document.querySelector("#txtPhysics").value = studentList[index].physics;
  document.querySelector("#txtChemistry").value = studentList[index].chemistry;

  studentIdElem.setAttribute("disabled", true);
  document.querySelector("#btnAdd").style.display = "none";
  document.querySelector("#btnUpdate").style.display = "inline-block";
  document.querySelector("#btnCancel").style.display = "inline-block";
};

var handleCancelUpdate = function () {
  document.querySelector("#btnReset").click();
  document.querySelector("#txtId").removeAttribute("disabled");
  document.querySelector("#btnAdd").style.display = "inline-block";
  document.querySelector("#btnUpdate").style.display = "none";
  document.querySelector("#btnCancel").style.display = "none";
};

var validateForm = function () {
  var id = document.querySelector("#txtId").value;
  var name = document.querySelector("#txtName").value;
  var gender = getGender();
  var math = document.querySelector("#txtMath").value;
  var physics = document.querySelector("#txtPhysics").value;
  var chemistry = document.querySelector("#txtChemistry").value;
  var isValid = true;

  isValid &=
    checkRequired(id, "#errId") &&
    checkLength(id, 3, 8, "#errId") &&
    checkDuplicateId();

  isValid &=
    checkRequired(name, "#errName") &&
    checkLength(name, 2, 255, "#errName") &&
    checkLetters(name, "#errName");

  isValid = checkGenderRequired(gender);

  isValid &=
    checkRequired(math, "#errMath") &&
    checkNumber(math, "#errMath") &&
    checkValueOfNumber(+math, 0, 10, "#errMath");

  isValid &=
    checkRequired(physics, "#errPhysics") &&
    checkNumber(physics, "#errPhysics") &&
    checkValueOfNumber(+physics, 0, 10, "#errPhysics");

  isValid &=
    checkRequired(chemistry, "#errChemistry") &&
    checkNumber(chemistry, "#errChemistry") &&
    checkValueOfNumber(+chemistry, 0, 10, "#errChemistry");

  return isValid;
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

// VALIDATIONS
var checkRequired = function (value, selector) {
  var elem = document.querySelector(selector);

  if (value.length > 0) {
    elem.previousElementSibling.classList.remove("is-invalid");
    elem.innerHTML = "";
    return true;
  }

  elem.previousElementSibling.classList.add("is-invalid");
  elem.innerHTML = "This field is required";
  return false;
};

var checkGenderRequired = function (value) {
  var chkMale = document.querySelector("#chkMale");
  var chkFemale = document.querySelector("#chkFemale");
  var errElem = document.querySelector("#errGender");

  if (value.length > 0) {
    chkMale.style.borderColor = "rgba(0,0,0,.25)";
    chkFemale.style.borderColor = "rgba(0,0,0,.25)";
    errElem.innerHTML = "";
    return true;
  }

  chkMale.style.borderColor = "#dc3545";
  chkFemale.style.borderColor = "#dc3545";
  errElem.innerHTML = "Please select a gender";
  return false;
};

var checkLength = function (value, min, max, selector) {
  var elem = document.querySelector(selector);

  if (value.length >= min && value.length <= max) {
    elem.previousElementSibling.classList.remove("is-invalid");
    elem.innerHTML = "";
    return true;
  }

  elem.previousElementSibling.classList.add("is-invalid");
  elem.innerHTML = `The input value must be from ${min} to ${max} characters`;
  return false;
};

var checkLetters = function (value, selector) {
  var elem = document.querySelector(selector);
  var pattern = /^[a-zA-Z\s]+$/g;
  var isLetters = pattern.test(value);

  if (isLetters) {
    elem.previousElementSibling.classList.remove("is-invalid");
    elem.innerHTML = "";
    return true;
  }

  elem.previousElementSibling.classList.add("is-invalid");
  elem.innerHTML = "The input value must be letters";
  return false;
};

var checkNumber = function (value, selector) {
  var elem = document.querySelector(selector);
  var pattern = /^[0-9\-]+$/g;
  var isLetters = pattern.test(value);

  if (isLetters) {
    elem.previousElementSibling.classList.remove("is-invalid");
    elem.innerHTML = "";
    return true;
  }

  elem.previousElementSibling.classList.add("is-invalid");
  elem.innerHTML = "The input value must be a number";
  return false;
};

var checkValueOfNumber = function (value, min, max, selector) {
    var elem = document.querySelector(selector);
  
    if (value >= min && value <= max) {
      elem.previousElementSibling.classList.remove("is-invalid");
      elem.innerHTML = "";
      return true;
    }
  
    elem.previousElementSibling.classList.add("is-invalid");
    elem.innerHTML = `The input value must be from ${min} to ${max}`;
    return false;
  };

var checkDuplicateId = function () {
  var id = document.querySelector("#txtId").value;
  var idElem = document.querySelector("#errId");
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].id === id) {
      idElem.previousElementSibling.classList.add("is-invalid");
      idElem.innerHTML = "Student ID is duplicated";
      return false;
    }
  }

  idElem.previousElementSibling.classList.remove("is-invalid");
  idElem.innerHTML = "";
  return true;
};
