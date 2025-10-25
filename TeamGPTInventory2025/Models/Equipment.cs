using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Models
{
    public class Equipment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EquipmentId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Type { get; set; }

        public string SerialNumber { get; set; }

        // 1️⃣ Equipment condition enumeration
        public Condition Condition { get; set; }

        // 2️⃣ Equipment status enumeration
        public EquipmentStatus Status { get; set; }

        // 3️⃣ Location as free text (e.g., "Room 204", "Library")
        public string? Location { get; set; }

        public string? PhotoUrl { get; set; }

        // Navigation property
        // public ICollection<Request> Requests { get; set; }
    }

    // --- ENUM DEFINITIONS BELOW ---

    // Represents the physical condition of the equipment
    public enum Condition
    {
        Excellent = 1,
        Good = 2,
        Fair = 3,
        Damaged = 4,
    }

    // Represents the availability or operational status
    public enum EquipmentStatus
    {
        Available = 1,
        Unavailable = 2,
        UnderRepair = 3,
        Retired = 4,
    }
}