using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace TeamGPTInventory2025.Models
{
    // 📊 Модел за репорт
    public class Report
    {
        public string EquipmentName { get; set; }
        public string RequestedBy { get; set; }
        public DateTime RequestedAt { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public DateTime? ReturnedAt { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
    }
}