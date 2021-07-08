using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class Subject
    {
        public int id { get; set; }
        public string name { get; set; }


        //public int StandardId { get; set; }
        //public Standard Standard { get; set; }

        public int BranchId { get; set; }
        public Branch Branch { get; set; }

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



    }
}
