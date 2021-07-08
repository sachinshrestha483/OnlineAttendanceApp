using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;
using static ZoomAttendanceApp.Models.Student;

namespace ZoomAttendanceApp.Controllers
{
    public class subjectController : Controller
    {
        private readonly ApplicationDbContext _db;



        public subjectController(ApplicationDbContext db)
        {
            _db =db;
        }


       

        public IActionResult Index()
        {


            var subjectVm = new SubjectViewModel() {

                BranchList = _db.Branches.Select(i => new SelectListItem {
                    Text = i.BranchName,
                    Value = i.id.ToString(),
                }),

               


            };

            return View(subjectVm);
        }





        public IActionResult Getsubjects()
        {
            var subjects = _db.Subjects.ToList();

            return Ok(subjects);
        }


        [HttpPost]
       public IActionResult EditSubject(SubjectViewModel obj)
        {


            var sub = _db.Subjects.FirstOrDefault(s => s.name == obj.Name);

            if (sub != null&&sub.id!=obj.SubjectId)
            {
                return BadRequest();
            }



            if (obj.BranchId=="")
            {
                
            }


            var subject = _db.Subjects.FirstOrDefault(s => s.id == obj.SubjectId);


            if(subject==null)
            {
                return BadRequest();
            }




            subject.name = obj.Name;

            if (obj.BranchId != null)
            {
                int branchId = (int)Int64.Parse(obj.BranchId);
                var branch = _db.Branches.FirstOrDefault(b => b.id == branchId);

                subject.BranchId = branchId;
            }

            if(obj.SemesterId!=null)
            {
                Semesters semester = (Semesters)Enum.Parse(typeof(Semesters), obj.SemesterId);  

                subject.Semester = (Subject.Semesters)semester;
            }



           _db.Subjects.Update(subject);


            _db.SaveChanges();

            return Ok();

        }



        [HttpPost]
        public IActionResult AddSubject(SubjectViewModel obj)
        {


            var sub = _db.Subjects.FirstOrDefault(s => s.name==obj.Name);

            if(sub!=null)
            {
                return BadRequest();
            }



            int branchId=(int) Int64.Parse(obj.BranchId);

            var branch = _db.Branches.FirstOrDefault(b => b.id == branchId);


            if(branch==null)
            {
                return BadRequest();
            }

            //var subject = new Subject();

            Semesters semester = (Semesters)Enum.Parse(typeof(Semesters), obj.SemesterId);


              var subject = new Subject { name=obj.Name, BranchId= branch.id, Semester = (Subject.Semesters)semester,   };

            _db.Subjects.Add(subject);

            _db.SaveChanges();
             
            return Ok();
        }

    }
}
