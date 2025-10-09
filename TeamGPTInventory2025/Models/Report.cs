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

    // 📡 Endpoint-и за репорти
    public static class ReportEndpoints
    {
        public static void MapReportEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/Reports").WithTags("Reports");

            // 📈 Usage Report
            group.MapGet("/usage", async (SchoolInventory db) =>
            {
                var report = await db.Requests
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

                return TypedResults.Ok(report);
            })
            .WithName("GetUsageReport")
            .WithOpenApi();

            // 📜 History Report
            group.MapGet("/history", async (SchoolInventory db) =>
            {
                var report = await db.Requests
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

                return TypedResults.Ok(report);
            })
            .WithName("GetHistoryReport")
            .WithOpenApi();

            // 📤 Export Report (CSV-like string)
            group.MapGet("/export", async (SchoolInventory db) =>
            {
                var rows = await db.Requests
                    .Include(r => r.Equipment)
                    .Select(r => $"{r.Equipment.Name},{r.RequestedBy},{r.RequestedAt},{r.ApprovedAt},{r.ReturnedAt},{r.Status},{r.Notes}")
                    .ToListAsync();

                var csv = "Equipment,RequestedBy,RequestedAt,ApprovedAt,ReturnedAt,Status,Notes\n" + string.Join("\n", rows);
                return TypedResults.Text(csv, "text/csv");
            })
            .WithName("ExportReport")
            .WithOpenApi();
        }
    }
}
