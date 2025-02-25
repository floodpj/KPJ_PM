﻿using System.Collections.Generic;
using Capstone.Models;

namespace Capstone.DAO
{
    public interface IUserDao
    {
        IList<User> GetUsers();
        User GetUserById(int id);
        User GetUserByUsername(string username);
        User CreateUser(string username, string password, string role, bool isEmployee, string email, bool active);
        Customer CreateCustomer(int userId, bool isContractor, string Address);
        //Customer GetCustomerById(int customerId);
        Customer GetCustomerById(int customerId);

        Customer GetCustomerByUserId(int userId);

        IList<int> GetAllCustomerIds();

        public string GetUserEmailByUserPermitId(int permitId); //ADDED

    }

}
