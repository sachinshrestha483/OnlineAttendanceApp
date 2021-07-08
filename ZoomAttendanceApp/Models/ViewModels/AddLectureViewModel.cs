using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class AddLectureViewModel
    {

        public AddLectureViewModel()
        {
            presentStudents = new List<int>();
        }
        [Required]
        public string title { get; set; }
        public string Semester { get; set; }
        public string subjectId { get; set; }
        public string branchId { get; set; }
        public DateTime date { get; set; }
        public List<int> presentStudents { get; set; }

    }
}







