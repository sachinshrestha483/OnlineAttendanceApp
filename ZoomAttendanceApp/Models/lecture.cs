using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class lecture
    {
        public int Id { get; set; }

        public string Topic{get; set; }

        public Subject Subject { get; set; }

        public int SubjectId { get; set; }


        public DateTime LectureDate { get; set; }



        public ApplicationUser ApplicationUser { get; set; }
        public string ApplicationUserId { get; set; }



    }
}
