﻿using Capstone.DAO;
using Capstone.Exceptions;
using Capstone.Models;
using Capstone.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Capstone.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly ITokenGenerator tokenGenerator;
        private readonly IPasswordHasher passwordHasher;
        private readonly IUserDao userDao;

        public AdminController(
            ITokenGenerator tokenGenerator,
            IPasswordHasher passwordHasher,
            IUserDao userDao
            )
        {
            this.tokenGenerator = tokenGenerator;
            this.passwordHasher = passwordHasher;
            this.userDao = userDao;

        }

        //POST /admin/login
        [HttpPost("login")]
        public IActionResult Authenticate(LoginUser userParam)
        {
            // Default to bad username/password message
            IActionResult result = Unauthorized(new { message = "Username or password is incorrect." });

            User user;
            // Get the user by username
            try
            {
                user = userDao.GetUserByUsername(userParam.Username);
            }
            catch (DaoException)
            {
                // return default Unauthorized message instead of indicating a specific error
                return result;
            }

            // If we found a user and the password hash matches
            if (user != null && passwordHasher.VerifyHashMatch(user.PasswordHash, userParam.Password, user.Salt))
            {
                // Create an authentication token
                string token = tokenGenerator.GenerateToken(user.UserId, user.Username, user.Role);

                // Create a ReturnUser object to return to the client
                LoginResponse retUser = new LoginResponse() { User = new ReturnUser() { UserId = user.UserId, Username = user.Username, Role = user.Role}, Token = token };

                // Switch to 200 OK
                result = Ok(retUser);
            }

            return result;
        }

        //POST /admin/register
        [HttpPost("register")]
        public IActionResult Register(RegisterUser userParam)
        {
            // Default generic error message
            const string ErrorMessage = "An error occurred and user was not created.";

            IActionResult result = BadRequest(new { message = ErrorMessage });

            // is username already taken?
            try
            {
                User existingUser = userDao.GetUserByUsername(userParam.Username);
                if (existingUser != null)
                {
                    return Conflict(new { message = "Username already taken. Please choose a different username." });
                }
            }
            catch (DaoException)
            {
                return StatusCode(500, ErrorMessage);
            }

            // create new user
            User newUser;
            try
            {
                newUser = userDao.CreateUser(userParam.Username, userParam.Password, userParam.Role, userParam.IsEmployee, userParam.Email, userParam.Active);
                
                //newCustomer = userDao.CreateCustomer(newUser.UserId, Contractor, customerTo.Address);
            }
            catch (DaoException)
            {
                return StatusCode(500, ErrorMessage);
            }

            if (newUser != null)
            {
                // Create a ReturnUser object to return to the client
                ReturnUser returnUser = new ReturnUser() { UserId = newUser.UserId, Username = newUser.Username, Role = newUser.Role };

                result = Ok(returnUser);
            }

            return result;
        }

        //GET /admin/whoami
        [HttpGet("whoami")]
        public ActionResult<string> WhoAmI()
        {
            string result = User.Identity.Name;
            if (result == null)
            {
                return "No token provided.";
            }
            else
            {
                return result;
            }
        }

        //GET /admin/role
        [HttpGet("role")]
        public ActionResult<string> GetRole()
        {
            User currentUser = new User();
            string userName = User.Identity.Name;
            currentUser = userDao.GetUserByUsername(userName);

            return Ok(currentUser.Role);
        }

        [HttpGet("user")]
        public ActionResult<User> GetUser()
        {
            User currentUser = new User();
            string userName = User.Identity.Name;
            currentUser = userDao.GetUserByUsername(userName);

            return Ok(currentUser);
        }

        //GET /admin
        [HttpGet]
        public ActionResult<string> Ready()
        {
            int userCount = userDao.GetUsers().Count;
            return Ok($"Server is ready with {userCount} user(s).");
        }

        //GET /admin/confirm
        [Authorize]
        [HttpGet("confirm")]
        public ActionResult<string> Confirm()
        {
            
            return Ok($"A valid token was received.");
        }

        //GET /admin/confirmadmin
        [Authorize(Roles ="admin")]
        [HttpGet("confirmadmin")]
        public ActionResult<string> ConfirmAdmin()
        {

            return Ok($"A valid admin token was received.");
        }
    }
}
