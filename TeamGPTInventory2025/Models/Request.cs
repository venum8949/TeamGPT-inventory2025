using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Models
{
    public class Request
    {
        public int RequestId { get; set; }

        [Required]
        public int EquipmentId { get; set; }

        [ForeignKey("EquipmentId")]
        public Equipment Equipment { get; set; }

        [Required]
        public string RequestedBy { get; set; } // Може да е UserId или име

        [Required]
        public DateTime RequestedAt { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public DateTime? ReturnedAt { get; set; }

        public RequestStatus Status { get; set; }

        public string Notes { get; set; }
    }

    public enum RequestStatus
    {
        Pending = 1,
        Approved = 2,
        Rejected = 3,
        Returned = 4
    }
}
