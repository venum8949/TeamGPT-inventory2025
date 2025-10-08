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


public static class RequestEndpoints
{
    public static void MapRequestEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Request").WithTags(nameof(Request));

        group.MapGet("/", async (SchoolInventory db) =>
        {
            return await db.Requests.Include(r => r.Equipment).ToListAsync();
        })
        .WithName("GetAllRequests")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Request>, NotFound>> (int id, SchoolInventory db) =>
        {
            return await db.Requests.Include(r => r.Equipment)
                .FirstOrDefaultAsync(r => r.RequestId == id)
                is Request request
                    ? TypedResults.Ok(request)
                    : TypedResults.NotFound();
        })
        .WithName("GetRequestById")
        .WithOpenApi();

        group.MapPost("/", async (Request request, SchoolInventory db) =>
        {
            request.RequestedAt = DateTime.UtcNow;
            request.Status = RequestStatus.Pending;

            db.Requests.Add(request);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Request/{request.RequestId}", request);
        })
        .WithName("CreateRequest")
        .WithOpenApi();

        group.MapPut("/{id}/approve", async Task<Results<Ok, NotFound>> (int id, SchoolInventory db) =>
        {
            var request = await db.Requests.FindAsync(id);
            if (request == null) return TypedResults.NotFound();

            request.Status = RequestStatus.Approved;
            request.ApprovedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
            return TypedResults.Ok();
        })
        .WithName("ApproveRequest")
        .WithOpenApi();

        group.MapPut("/{id}/reject", async Task<Results<Ok, NotFound>> (int id, SchoolInventory db) =>
        {
            var request = await db.Requests.FindAsync(id);
            if (request == null) return TypedResults.NotFound();

            request.Status = RequestStatus.Rejected;
            await db.SaveChangesAsync();
            return TypedResults.Ok();
        })
        .WithName("RejectRequest")
        .WithOpenApi();

        group.MapPut("/{id}/return", async Task<Results<Ok, NotFound>> (int id, SchoolInventory db) =>
        {
            var request = await db.Requests.FindAsync(id);
            if (request == null) return TypedResults.NotFound();

            request.Status = RequestStatus.Returned;
            request.ReturnedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
            return TypedResults.Ok();
        })
        .WithName("ReturnRequest")
        .WithOpenApi();
    }
}

