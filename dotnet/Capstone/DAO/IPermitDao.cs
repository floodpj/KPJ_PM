using System.Collections.Generic;
using Capstone.Models;

namespace Capstone.DAO
{
    public interface IPermitDao
    {
        public Permit GetPermitById(int permitId);
        public Permit CreatePermit(Permit permit);
        public List<Permit> ListPermits();
        public List<Permit> GetPermitsByCustomerId(int customerId);

        public Permit UpdatePermit(PermitStatusDTO permitStatusDTO);
        public int OpenClosePermit(int permitId);
        public List<PermitIdInspectionIdDTO> GetAllInspectionsAndPermits();
        public List<PermitArchiveDTO> GetAllInactivePermitsAndInspections();
        public Permit UpdatePermitCustomer(PermitCustomerEditDTO updatedPermitDTO);
        public string BuildSqlSearchString(PermitSearchDTO permitSearchDTO);
        public List<Permit> FilterPermits(PermitSearchDTO permitSearchDTO);


    }
}

