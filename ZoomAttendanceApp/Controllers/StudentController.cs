using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;
using static ZoomAttendanceApp.Models.Subject;

namespace ZoomAttendanceApp.Controllers
{
    public class StudentController : Controller
    {

        public ApplicationDbContext _db;


        public StudentController( ApplicationDbContext db)
        {
            _db = db;
        }


        public IActionResult Index()
        {
            return View();
        }



        public IActionResult GetStudents()
        {
            var student = _db.Students.ToList();


            foreach (var item in student)
            {

                var branch = _db.Branches.FirstOrDefault(b => b.id == item.BranchId);
                item.BranchName = branch.BranchName;


                item.SemesterName = item.Semester.ToString();

            }

            return Ok(student);
        }


        public IActionResult SearchStudents()
        {
            return View();
        }


        [HttpPost]
        public IActionResult UpdateStudent(EditStudentViewModel obj)
        {


            var stu = _db.Students.FirstOrDefault(s => s.EnrollementId == obj.EnrollementNumber);


            if (stu != null&&stu.Id!=obj.id)
            {
                return BadRequest();
            }





            Student student = _db.Students.FirstOrDefault(s => s.Id == obj.id);


            if(student==null)
            {
                return BadRequest();
            }




            if (obj.Branch != null)
            {


                var branchId = (int)Int64.Parse(obj.Branch);

                var branch = _db.Branches.FirstOrDefault(b => b.id == branchId);


                if (branch == null)
                {
                    return BadRequest();
                }


                student.BranchId = branchId;

            }

            if(obj.Semester!=null)
            {
                Semesters semester = (Semesters)Enum.Parse(typeof(Semesters), obj.Semester);
                obj.Semester = semester.ToString();
                student.Semester = (Student.Semesters)semester;

            }

            student.Name = obj.name;
            student.PhoneNumber = obj.phoneNumber;
            student.Email = obj.Email;
            student.EnrollementId = obj.EnrollementNumber;
           


            _db.Students.Update(student);
            _db.SaveChanges();






            



            return Ok();
        }



        [HttpPost]
        public IActionResult AddStudent(AddStudentViewModel obj)
        {


            if (ModelState.IsValid) {


                var stu = _db.Students.FirstOrDefault(s => s.EnrollementId == obj.EnrollementNumber);


                if(stu!=null)
                {
                    return BadRequest();
                }

                


                int branchId = (int)Int64.Parse(obj.Branch);


                var branch = _db.Branches.FirstOrDefault(b => b.id == branchId);


                if (branch == null)
                {
                    return BadRequest();
                }



                Semesters semester = (Semesters)Enum.Parse(typeof(Semesters), obj.Semester);

                var student = new Student() { Name = obj.name,  BranchId = branch.id, Email = obj.Email, EnrollementId = obj.EnrollementNumber, PhoneNumber = obj.phoneNumber, Semester = (Student.Semesters)semester };

                _db.Students.Add(student);

                _db.SaveChanges();


                return Ok();


               }



            return BadRequest();


        }






    }
}
