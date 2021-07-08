using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class AddStudentViewModel
    {
        public string name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string phoneNumber { get; set; }
        public string Semester { get; set; }
        public string Branch { get; set; }
        public string EnrollementNumber { get; set; }


        public string  branchName { get; set; }



    }
}
