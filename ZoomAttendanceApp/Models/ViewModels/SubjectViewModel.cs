using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static ZoomAttendanceApp.Models.Student;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class SubjectViewModel
    {
        public string Name { get; set; }

        public IEnumerable<SelectListItem> BranchList { get; set; }

        [Required]
        public string BranchId { get; set; }

      //  public IEnumerable<SelectListItem> SemesterList { get; set; }

        [Required]
        public Semesters Semester { get; set; }

        public string SemesterId { get; set; }
        public int SubjectId { get; set; }

    }
}
