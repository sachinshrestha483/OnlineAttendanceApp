using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ZoomAttendanceApp.Models;
using ZoomAttendanceApp.Models.ViewModels;

namespace ZoomAttendanceApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {

            _userManager = userManager;
            _signInManager = signInManager;

        }

        public IActionResult Register()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel obj)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = obj.Email, Email = obj.Email, Name=obj.Name, PhoneNumber=obj.Phone };

                var result = await _userManager.CreateAsync(user, obj.Password);


                if (result.Succeeded)
                {
                    // second PArameter for session cookie or the permanent cookie
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return RedirectToAction("index", "home");
                }

                foreach (var error in result.Errors)
                {
                    // Add All Additional Error To ....
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(obj);
        }

        [HttpPost]

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("index", "home");
        }

        public async Task<IActionResult> Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel obj, string returnUrl)
        {
            if (ModelState.IsValid)
            // if check box check then persitent cookie or Session Cookie...
            // fourth parameter is account locked in faliure
            {
                var result = await _signInManager.PasswordSignInAsync(obj.Email, obj.Password, obj.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    {
                        return LocalRedirect(returnUrl);
                    }

                    return RedirectToAction("index", "home");
                }


                ModelState.AddModelError("", "Invalid Login Attept");


                return View(obj);

            }

            return View(obj);
        }

        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }


    }
}
