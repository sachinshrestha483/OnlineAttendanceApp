using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;

namespace ZoomAttendanceApp.Controllers
{
    public class BranchController : Controller
    {
        private readonly  ApplicationDbContext _db;
        public BranchController(ApplicationDbContext db)
       {
            _db = db;
        }
        public IActionResult Index()
        {

            return View();
        }


        public IActionResult getBranches()
        {

            var branches = _db.Branches.ToList();

            return Ok(branches);

        }


        [HttpPost]
        public IActionResult AddBranch(AddBranchviewModel obj)
        {




            if (ModelState.IsValid)
            {


                var br = _db.Branches.FirstOrDefault(b => b.BranchName == obj.Name);


                if(br!=null)
                {
                    return Ok();
                }




                var branch = new Branch() { BranchName=obj.Name };

                _db.Add(branch);
                _db.SaveChanges();
                return Ok(branch);

            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPost]
        public IActionResult EditBranch(EditBranchViewModel obj)
        {

            var br = _db.Branches.FirstOrDefault(b => b.BranchName == obj.branchName);


            if (br != null&&br.id!=obj.id)
            {
                return BadRequest();
            }



            var branch = _db.Branches.FirstOrDefault(b => b.id == obj.id);

            if(branch==null)
            {
                return BadRequest();
            }

            branch.BranchName = obj.branchName;

            _db.Branches.Update(branch);

            _db.SaveChanges();


            return Ok();


        }


    }
}
