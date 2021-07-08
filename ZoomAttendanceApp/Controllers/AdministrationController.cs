using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;

namespace ZoomAttendanceApp.Controllers
{
    public class AdministrationController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;



        public AdministrationController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public IActionResult CreateRole()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> CreateRole(CreateRoleViewModel obj)
        {
            if (ModelState.IsValid)
            {
                IdentityRole identityRole = new IdentityRole
                {
                    Name = obj.RoleName
                };
                var result = await _roleManager.CreateAsync(identityRole);

                if (result.Succeeded)
                {
                    return RedirectToAction("index", "home");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(obj);
        }

        [HttpGet]
        public IActionResult ListRoles()
        {
            var roles = _roleManager.Roles;
            return View(roles);
        }

        public async Task<IActionResult> EditRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            if (role != null)
            {
                var users = _userManager.Users.ToList();


                var userNames = new List<string>();

                foreach (var user in users)
                {
                    if (await _userManager.IsInRoleAsync(user, role.Name))
                    {
                        userNames.Add(user.UserName);
                    }
                }

                var obj = new EditRoleViewModel
                {
                    Id = role.Id,
                    RoleName = role.Name,
                    Users = userNames

                };




                return View(obj);
            }
            return NotFound();

        }
        [HttpPost]
        public async Task<IActionResult> EditRole(EditRoleViewModel obj)
        {
            if (ModelState.IsValid)
            {
                var role = await _roleManager.FindByIdAsync(obj.Id);
                if (role == null)
                {
                    ModelState.AddModelError("", "Wrong Id Get Passed");
                    return View(obj);
                }
                role.Name = obj.RoleName;
                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(ListRoles));
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(obj);
        }




        [HttpPost]
        public async Task<IActionResult> EditUser(EditUserViewModel obj)
        {
            var user = await _userManager.FindByIdAsync(obj.Id);

            if (user == null)
            {

                return View();
            }
            else
            {
                user.Email = obj.Email;
                user.Name = obj.Name;

                var result = await _userManager.UpdateAsync(user);


                if (result.Succeeded)
                {
                    return RedirectToAction("ListUsers");

                }


                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                    return View(obj);
                }

            }



            return View(obj);
        }

        public async Task<IActionResult> ManageUserRoles(string userId)
        {
            //   ViewBag.userId = userId+"kkk";
            //ViewBag.userId = "kkk";

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return RedirectToAction(nameof(EditUser));
            }

            var model = new List<UserRolesViewModel>();

            foreach (var item in _roleManager.Roles)
            {
                var roleVm = new UserRolesViewModel
                {
                    RoleId = item.Id,
                    RoleName = item.Name,
                };
                if (await _userManager.IsInRoleAsync(user, roleVm.RoleName))
                {
                    roleVm.IsSelected = true;
                }
                else
                {
                    roleVm.IsSelected = false;

                }

                model.Add(roleVm);

            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> ManageUserRoles(List<UserRolesViewModel> model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);


            if (user == null)
            {
                return RedirectToAction("ManageUserRoles", new { userId = userId });
            }


            var roles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRolesAsync(user, roles);


            foreach (var item in model)
            {
                if (item.IsSelected)
                {
                    var op = await _userManager.AddToRoleAsync(user, item.RoleName);
                    if (!op.Succeeded)
                    {
                        foreach (var error in op.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                        return View(model);
                    }
                }

            }




            return View(model);

        }


        [HttpGet]
        public IActionResult ListUsers()
        {
            var users = _userManager.Users;
            return View(users);
        }

        //Edit Users in Role.........
        public async Task<IActionResult> EditUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {

                return RedirectToAction(nameof(ListUsers));
            }

            var userRoles = await _userManager.GetRolesAsync(user);


            var model = new EditUserViewModel
            {
                Id = user.Id,
                Roles = userRoles,
                Email = user.Email,
               Name=user.Name,


            };


            return View(model);
        }


      


    }
}
