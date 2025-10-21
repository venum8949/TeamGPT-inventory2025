using System.ComponentModel.DataAnnotations;

namespace TeamGPTInventory2025.Models
{
    public class RequestDto
    {
        [Required]
        public int EquipmentId { get; set; }

        // User asked for "note"
        public string? Note { get; set; }
    }
}