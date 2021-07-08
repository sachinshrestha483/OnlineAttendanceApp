using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class Presence
    {
        public int id { get; set; }

        public lecture lecture { get; set; }

        public int lectureId { get; set; }

        public Student Student { get; set; }

        public int StudentId { get; set; }

    }
}
