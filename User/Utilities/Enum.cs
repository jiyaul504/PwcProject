using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UserPWC.Utilities
{
    public class Enum
    {

        public enum UserRole
        {
            IsAdmin = 1,
            IsBSRegionalSPOC = 2,
            IsBSRegionalHead = 3,
            IsCBTSpoc = 4,
            IsHRRegionalSPOC = 5

        }

        public enum ContractType
        {

            [Display(Name = "Rent Contract")]
            RentContract = 1,

            [Display(Name = "Government Payment Contract")]
            GovernmentPaymentContract = 2,

            [Display(Name = "Government & Non-Government Payment Contract")]
            GovernmentNonGovernmentPaymentContract = 3,

            [Display(Name = "Misc. Expense Payment Contract")]
            MiscExpensePaymentContract = 4,

            [Display(Name = "Annual Maintenance Payment Contract")]
            AnnualMaintenancePaymentContract = 5,

            [Display(Name = "Manpower Contract")]
            ManpowerContract = 6,

            [Display(Name = "Goods Contract")]
            GoodsContract = 7,

            [Display(Name = "Service Contract")]
            ServiceContract = 8
        }

        public enum DemisedPremisesCarParking
        {
            Yes, No
        }
        public enum AdditionalCarParking
        {
            Yes, No
        }
        public enum Status
        {
            Draft = 1,
            Submitted = 2,
            Approved = 3,
            Rejected = 4,
            InEffect = 5,
            Revised = 6
        }
    }
}
