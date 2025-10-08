using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly SchoolInventory _context;

        public ReportController(SchoolInventory context)
        {
            _context = context;
        }

        // 📈 Usage Report – всички заявки с оборудване
        [HttpGet("usage")]
        public async Task<ActionResult<IEnumerable<Report>>> GetUsageReport()
        {
            var report = await _context.Requests
                .Include(r => r.Equipment)
                .Select(r => new Report
                {
                    EquipmentName = r.Equipment.Name,
                    RequestedBy = r.RequestedBy,
                    RequestedAt = r.RequestedAt,
                    ApprovedAt = r.ApprovedAt,
                    ReturnedAt = r.ReturnedAt,
                    Status = r.Status.ToString(),
                    Notes = r.Notes
                })
                .ToListAsync();

            return Ok(report);
        }

        // 📜 History Report – заявки подредени по дата
        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<Report>>> GetHistoryReport()
        {
            var report = await _context.Requests
                .Include(r => r.Equipment)
                .OrderByDescending(r => r.RequestedAt)
                .Select(r => new Report
                {
                    EquipmentName = r.Equipment.Name,
                    RequestedBy = r.RequestedBy,
                    RequestedAt = r.RequestedAt,
                    ApprovedAt = r.ApprovedAt,
                    ReturnedAt = r.ReturnedAt,
                    Status = r.Status.ToString(),
                    Notes = r.Notes
                })
                .ToListAsync();

            return Ok(report);
        }

        // 📤 Export Report – CSV текст за изтегляне
        [HttpGet("export")]
        public async Task<IActionResult> ExportReport()
        {
            var rows = await _context.Requests
                .Include(r => r.Equipment)
                .Select(r => $"{r.Equipment.Name},{r.RequestedBy},{r.RequestedAt},{r.ApprovedAt},{r.ReturnedAt},{r.Status},{r.Notes}")
                .ToListAsync();

            var csv = "Equipment,RequestedBy,RequestedAt,ApprovedAt,ReturnedAt,Status,Notes\n" + string.Join("\n", rows);
            return Content(csv, "text/csv");
        }
    }
}
