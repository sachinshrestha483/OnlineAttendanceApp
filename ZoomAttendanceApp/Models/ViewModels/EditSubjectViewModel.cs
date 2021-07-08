using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class EditSubjectViewModel
    {

        public string Name { get; set; }


        public string BranchId { get; set; }

        //  public IEnumerable<SelectListItem> SemesterList { get; set; }

        
     
        public string SemesterId { get; set; }
        public int SubjectId { get; set; }

    }
}
