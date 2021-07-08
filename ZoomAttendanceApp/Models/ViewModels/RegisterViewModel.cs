using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models.ViewModels
{
    public class RegisterViewModel
    {

        [Required]
       
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

       
        public string Phone { get; set; }


        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Password And Confirm Password Do Not Match")]
        public string ConfirmPassword { get; set; }



    }
}
