﻿using System.Collections.Generic;
using Capstone.Models;

namespace Capstone.DAO
{
    public interface IPermitDao
    {
        public Permit GetPermitById(int permitId);
        public Permit CreatePermit(Permit permit);

    }
}
