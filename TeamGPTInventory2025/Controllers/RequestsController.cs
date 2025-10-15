using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGPTInventory2025.Data;
using TeamGPTInventory2025.Models;
using System.Text.Json;

namespace TeamGPTInventory2025.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly SchoolInventory _context;

        public RequestsController(SchoolInventory context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _context.Requests.Include(r => r.Equipment).ToListAsync();
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests.Include(r => r.Equipment)
                                                 .FirstOrDefaultAsync(r => r.RequestId == id);

            if (request == null)
                return NotFound();

            return request;
        }

        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            request.RequestedAt = DateTime.UtcNow;
            request.Status = RequestStatus.Pending;

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRequest), new { id = request.RequestId }, request);
        }

        // PUT: api/Requests/5/approve
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.Status = RequestStatus.Approved;
            request.ApprovedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/Requests/5/reject
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.Status = RequestStatus.Rejected;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/Requests/5/return
        // Accepts optional JSON body: { "condition": "Good" } or { "condition": 2 }
        [HttpPut("{id}/return")]
        public async Task<IActionResult> ReturnRequest(int id, [FromBody] JsonElement? body = null)
        {
            var request = await _context.Requests
                .Include(r => r.Equipment)
                .FirstOrDefaultAsync(r => r.RequestId == id);

            if (request == null)
                return NotFound(new { message = "Няма намерен предмет" });

            request.Status = RequestStatus.Returned;
            request.ReturnedAt = DateTime.UtcNow;

            // Ensure equipment entity is available
            var equipment = request.Equipment ?? await _context.Equipments.FindAsync(request.EquipmentId);
            if (equipment != null)
            {
                // Update equipment status back to Available
                equipment.Status = EquipmentStatus.Available;

                // If caller provided a 'condition' in the JSON body, try to parse and update
                if (body.HasValue && body.Value.ValueKind == JsonValueKind.Object &&
                    body.Value.TryGetProperty("condition", out var condProp))
                {
                    // Try parse as string first
                    if (condProp.ValueKind == JsonValueKind.String)
                    {
                        var condStr = condProp.GetString();
                        if (!string.IsNullOrWhiteSpace(condStr) && Enum.TryParse<Condition>(condStr, true, out var parsed))
                        {
                            equipment.Condition = parsed;
                        }
                    }
                    else if (condProp.ValueKind == JsonValueKind.Number)
                    {
                        if (condProp.TryGetInt32(out var condInt) && Enum.IsDefined(typeof(Condition), condInt))
                        {
                            equipment.Condition = (Condition)condInt;
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return Ok();
        }


        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
                return NotFound();

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.RequestId == id);
        }
    }
}
