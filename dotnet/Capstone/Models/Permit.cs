
using System.Diagnostics.Eventing.Reader;

namespace Capstone.Models
{
    public class Permit
    {
        public int PermitId { get; set; }
        public bool Active { get; set; } = true;
        public int CustomerId { get; set; }
        public string PermitAddress { get; set; }
        public string PermitType { get; set; }
        public bool Commercial { get; set; }
        public string PermitStatus { get; set; } = "Pending";
        public string CustomerDetails { get; set; }

    }

    public class PermitStatusDTO
    {
        public int PermitId { get; set; }
        public string PermitStatus { get; set; }

    }

    public class PermitIdInspectionIdDTO
    {
        public int PermitId { get; set; }
        public int InspectionId { get; set; }
    }
    public class PermitArchiveDTO
    {
        public int PermitId { get; set; }
        public string PermitAddress { get; set; }
        public string PermitType { get; set; }
        public bool Commercial { get; set; }
        public string PermitStatus { get; set; }
        public string CustomerDetails { get; set; }
        //public string InspectionType { get; set; }
    }

    public class PermitSearchDTO
    {
        public int PermitId { get; set; }
        public string PermitAddress { get; set; }
        public int CustomerId { get; set; }
        public string PermitType { get; set; }
    }

        //ADDED-----------------------------------------
        public class PermitCustomerEditDTO
        {
            public int PermitId { get; set; }
            public string PermitType { get; set; }
            public string PermitAddress { get; set; }
            public bool Commercial { get; set; }
            public string CustomerDetails { get; set; }
        }
        //END ADDED -----------------------------------
}

