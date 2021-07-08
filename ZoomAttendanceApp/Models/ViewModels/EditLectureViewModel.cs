using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class EditLectureViewModel
    {


        public int lectureId { get; set; }
        public List<int> absentStudentIds { get; set; }



    }
}
