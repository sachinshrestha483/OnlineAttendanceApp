using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class Student
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public Semesters Semester { get; set; }

      public enum Semesters
        {
            Select,
            I,
            II,
            III,
            IV,
            V,
            VI,
            VII,
            VIII,
        }




        public int BranchId { get; set; }


        public Branch Branch { get; set; }

        public string EnrollementId { get; set; }



        public string Temp { get; set; }


        [NotMapped]

        public string BranchName { get; set; }

        [NotMapped]

        public string SemesterName { get; set; }


    }
}
