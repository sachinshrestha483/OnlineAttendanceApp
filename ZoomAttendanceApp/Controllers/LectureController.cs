using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;
using ZoomAttendanceApp.utility;
using static ZoomAttendanceApp.Models.Student;

namespace ZoomAttendanceApp.Controllers
{
    public class LectureController : Controller
    {

        private readonly ApplicationDbContext _db;
        private TwilioSettings _twilioOptions { get; set; }

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LectureController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<TwilioSettings> twilioOptions)
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _twilioOptions = twilioOptions.Value;

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddLecture(AddLectureViewModel obj)
        {

            if(ModelState.IsValid)
            {

                int branchId = (int)Int64.Parse(obj.branchId);
                int subjectId = (int)Int64.Parse(obj.subjectId);


                var subject = _db.Subjects.FirstOrDefault(s => s.id == subjectId);

                var branch = _db.Branches.FirstOrDefault(b => b.id == branchId);

                if(subject==null)
                {
                    return BadRequest();
                }

                if(branch==null)
                {
                    return BadRequest();
                }

                Semesters semester = (Semesters)Enum.Parse(typeof(Semesters), obj.Semester);



                ApplicationUser usr = await _userManager.GetUserAsync(HttpContext.User);

                if(usr==null)
                {
                    return BadRequest();
                }






                var lecture = new lecture() 
                {
                     LectureDate=obj.date,
                      SubjectId=subject.id,
                       Topic=obj.title,
                        ApplicationUserId=usr.Id,
                         
                         

                
                
                
                };

                _db.lectures.Add(lecture);


                _db.SaveChanges();


                var studentIds = obj.presentStudents;







                var presences = new List<Presence>() { };

                foreach (var item in studentIds)
                {


                    var student = _db.Students.FirstOrDefault(s => s.Id == item);

                    if (student == null)
                    {
                        studentIds.Remove(item);
                    }
                    else
                    {
                        presences.Add(new Presence { lectureId = lecture.Id, StudentId = student.Id });

                    }





                }












                _db.Presences.AddRange(presences);


                _db.SaveChanges();











                var presentes = new List<Student>() { };

                foreach (var item in studentIds)
                {


                    var student = _db.Students.FirstOrDefault(s => s.Id == item);

                    if (student == null)
                    {
                        studentIds.Remove(item);
                    }
                    else
                    {
                        presentes.Add(student);

                    }





                }


                var absentes = new List<Student>() { };

                var AllStudent = _db.Students.Where(s => s.Semester == (Semesters)semester && s.BranchId == branch.id).ToList();


                foreach (var item1 in AllStudent)
                {
                 
                    if(presentes.FirstOrDefault(p=>p.Id==item1.Id)==null)
                    {
                        absentes.Add(item1);
                    }

                }


               


                foreach (var item in absentes)
                {
                    TwilioClient.Init(_twilioOptions.AccountSid, _twilioOptions.AuthToken);
                    try
                    {
                        var mesage = MessageResource.Create(
                            body: "hi " + item.Name + " you  have Not Attended Today lecture on " + lecture.Topic + " in " + subject.name+" if You have then contact Respected Faculty ",
                            from: new Twilio.Types.PhoneNumber(_twilioOptions.PhoneNumber),
                            to: new Twilio.Types.PhoneNumber("+91"+item.PhoneNumber)


                            );
                    }
                    catch
                    {
                       // return Content("kjkj");

                    }

                }









                return Ok();

            }
            return BadRequest();


        }




        public IActionResult ShowLecture()
        {

            return View();
        }


        public async Task<IActionResult>GetAllLecture()
        {

            var lectures = _db.lectures.ToList();


            var obj = new List<GetLecturesViewModel>() { };

            foreach (var item in lectures)
            {


                var presentStudent = _db.Presences.Where(p => p.lectureId == item.Id).Select(t=>t.Student).ToList();

                //&& s.BranchId == item.Subject.BranchId
                var semester = _db.Subjects.FirstOrDefault(s=>s.id==item.SubjectId).Semester;
                var subject = _db.Subjects.FirstOrDefault(s => s.id == item.SubjectId);
                var branch = _db.Branches.FirstOrDefault(b => b.id == subject.BranchId);


                var applicationUser = _db.ApplicationUsers.FirstOrDefault(a => a.Id == item.ApplicationUserId);

                var AllStudent = _db.Students.Where(s => s.Semester == (Semesters)semester && s.BranchId==branch.id ).ToList();

                var absentes = new List<Student>(){ };

               

                foreach (var item1 in AllStudent)
                {
                    if (presentStudent.FirstOrDefault(p=>p.Id==item1.Id)==null)
                    {
                        absentes.Add(item1);
                    }
                }



                obj.Add(new GetLecturesViewModel { Title=item.Topic, date=item.LectureDate, 
                    LecturarName=applicationUser.Name ,  
                    subject=subject.name,
                    semester=semester.ToString(),
                     StudentPresent=presentStudent,
                      StudentsToBePresent=AllStudent,
                       branchName=branch.BranchName,
                        StudentAbsent =absentes,
                         LectureId=item.Id,
                          









                });

            }




            return Ok(obj);
        }




        [HttpPost]

        public IActionResult EditLecture(EditLectureViewModel obj)
        {

            var lecture = _db.lectures.FirstOrDefault(l => l.Id == obj.lectureId);

            if(lecture==null)
            {
                return BadRequest();
            }


            var students = new List<Student>();

            foreach (var item in obj.absentStudentIds)
            {

                var studen = _db.Students.FirstOrDefault(s => s.Id == item);

                students.Add(studen);

            }


            var pre = new List<Presence>() ;


            foreach (var item in students)
            {

                pre.Add(new Presence { StudentId = item.Id, lectureId = lecture.Id });


            }

            _db.Presences.AddRange(pre);

            _db.SaveChanges();



            return Ok();
        }






        public IActionResult Report()
        {



            return View();
        }




    }
}
