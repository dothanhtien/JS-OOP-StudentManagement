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
  console.log(studentList);
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
