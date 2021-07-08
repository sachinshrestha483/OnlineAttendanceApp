using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class Message
    {
        [Required]
        public string Body { get; set; }
        [Required]
        public string To { get; set; }

    }
}
