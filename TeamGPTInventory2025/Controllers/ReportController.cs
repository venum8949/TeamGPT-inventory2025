using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGPTInventory2025.Data;
using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class ReportController : ControllerBase
    {
        private readonly SchoolInventory _context;

        public ReportController(SchoolInventory context)
        {
            _context = context;
        }

        // 📈 Usage Report – всички заявки с оборудване
        [HttpGet("usage")]
        public async Task<ActionResult<UsageReportDto>> GetUsageReport(DateTime? from = null, DateTime? to = null, int topItems = 5, int topUsers = 5)
        {
            var fromDate = from ?? DateTime.UtcNow.AddMonths(-1);
            var toDate = to ?? DateTime.UtcNow;

            // Load requests within range with equipment
            var requests = await _context.Requests
                .AsNoTracking()
                .Include(r => r.Equipment)
                .Where(r => r.RequestedAt >= fromDate && r.RequestedAt <= toDate)
                .ToListAsync();

            var equipments = await _context.Equipments
                .AsNoTracking()
                .ToListAsync();

            var totalRequests = requests.Count;
            var approvedRequests = requests.Count(r => r.Status == RequestStatus.Approved);
            var rejectedRequests = requests.Count(r => r.Status == RequestStatus.Rejected);
            var pendingRequests = requests.Count(r => r.Status == RequestStatus.Pending);

            // Group by equipment type
            var usageByType = equipments
                .GroupBy(e => string.IsNullOrWhiteSpace(e.Type) ? "Unknown" : e.Type)
                .Select(g =>
                {
                    var equipmentIds = g.Select(e => e.EquipmentId).ToHashSet();
                    var requestsForType = requests.Where(r => equipmentIds.Contains(r.EquipmentId)).ToList();

                    var borrowCount = requestsForType.Count;
                    var inUse = requestsForType.Count(r => r.Status == RequestStatus.Approved && r.ReturnedAt == null);
                    var available = g.Count() - inUse;

                    // determine statuses from Equipment.Status if available
                    var underRepair = g.Count(e => e.Status == EquipmentStatus.UnderRepair);
                    // EquipmentStatus does not define 'Retired' in this project; treat 'Unavailable' as not in active use
                    var retired = g.Count(e => e.Status == EquipmentStatus.Unavailable);

                    return new UsageByTypeDto
                    {
                        Type = g.Key,
                        BorrowCount = borrowCount,
                        TotalCount = g.Count(),
                        Available = available < 0 ? 0 : available,
                        InUse = inUse,
                        UnderRepair = underRepair,
                        Retired = retired
                    };
                })
                .OrderByDescending(x => x.BorrowCount)
                .ToList();

            // Most borrowed items (by equipment)
            var mostBorrowedItems = requests
                .GroupBy(r => new { r.EquipmentId, r.Equipment.Name })
                .Select(g => new MostBorrowedItemDto
                {
                    ItemId = g.Key.EquipmentId,
                    Name = g.Key.Name,
                    BorrowCount = g.Count()
                })
                .OrderByDescending(x => x.BorrowCount)
                .Take(topItems)
                .ToList();

            // Active users by RequestedBy (RequestedBy may be user id or name)
            var activeUsers = requests
                .GroupBy(r => r.RequestedBy)
                .Select(g => new ActiveUserDto
                {
                    // try parse numeric user id
                    UserId = int.TryParse(g.Key, out var id) ? id as int? : null,
                    Name = g.Key,
                    BorrowCount = g.Count()
                })
                .OrderByDescending(x => x.BorrowCount)
                .Take(topUsers)
                .ToList();

            // optional metrics: average borrow duration and overdue
            var completedRequestsWithReturn = requests.Where(r => r.ApprovedAt != null && r.ReturnedAt != null).ToList();
            double? avgDays = null;
            if (completedRequestsWithReturn.Any())
            {
                avgDays = completedRequestsWithReturn.Average(r => (r.ReturnedAt.Value - r.ApprovedAt.Value).TotalDays);
            }

            var overdueCount = requests.Count(r => r.Status == RequestStatus.Approved && r.ReturnedAt == null && r.ApprovedAt != null && (DateTime.UtcNow - r.ApprovedAt.Value).TotalDays > 30);

            var dto = new UsageReportDto
            {
                TimeRange = $"{fromDate:yyyy-MM-dd} to {toDate:yyyy-MM-dd}",
                TotalRequests = totalRequests,
                ApprovedRequests = approvedRequests,
                RejectedRequests = rejectedRequests,
                PendingRequests = pendingRequests,
                UsageByType = usageByType,
                MostBorrowedItems = mostBorrowedItems,
                ActiveUsers = activeUsers,
                AverageBorrowDays = avgDays,
                OverdueCount = overdueCount
            };

            return Ok(dto);
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
