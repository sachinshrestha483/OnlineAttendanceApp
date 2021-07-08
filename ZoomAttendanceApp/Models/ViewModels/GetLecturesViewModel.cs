using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class GetLecturesViewModel
    {

        public GetLecturesViewModel()
        {
            List<Student> StudentsToBePresent = new List<Student>() { };
            List<Student> StudentPresent = new List<Student>() { };
            List<Student> StudentAbsent = new List<Student>() { };

        }

        public string Title { get; set; }
        public string LecturarName { get; set; }


        public int LectureId { get; set; }
        public List<Student>StudentsToBePresent { get; set; }

        public List<Student> StudentPresent { get; set; }

        public List<Student> StudentAbsent { get; set; }



        public DateTime date { get; set; }

        public  string subject { get; set; }


        public string semester { get; set; }


        public string branchName { get; set; }




    }
}
