using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZoomAttendanceApp.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {


        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Student> Students { get; set; }

        public DbSet<lecture> lectures { get; set; }

       public DbSet<Presence> Presences { get; set; }



    }
}
