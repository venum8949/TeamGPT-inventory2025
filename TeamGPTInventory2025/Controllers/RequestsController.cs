using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamGPTInventory2025.Data;
using TeamGPTInventory2025.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        // GET: api/Requests/my  - returns requests for the authenticated user
        [HttpGet("my")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Request>>> GetMyRequests()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requests = await _context.Requests
                .Include(r => r.Equipment)
                .Where(r => r.RequestedBy == userId)
                .AsNoTracking()
                .ToListAsync();

            return Ok(requests);
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

        
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveRequest(int id)
        {
            
            var request = await _context.Requests
                                        .Include(r => r.Equipment)
                                        .FirstOrDefaultAsync(r => r.RequestId == id);
            
            if (request == null)
                return NotFound();

            if (request.Status != RequestStatus.Pending)
                return BadRequest("Only pending requests can be approved.");
            
            if (request.Equipment == null)
                return BadRequest("Associated equipment not found.");

            if (request.Equipment.Status == EquipmentStatus.Unavailable)
                return Conflict("The equipment is unavailable and cannot be approved.");


            request.Status = RequestStatus.Approved;
            request.ApprovedAt = DateTime.UtcNow;
            
            request.Equipment.Status = EquipmentStatus.Unavailable;
            _context.Entry(request.Equipment).State = EntityState.Modified;

            var otherPending = await _context.Requests
                                             .Where(r => r.EquipmentId == request.EquipmentId
                                                         && r.RequestId != request.RequestId
                                                         && r.Status == RequestStatus.Pending)
                                             .ToListAsync();

            foreach (var other in otherPending)
            {
                other.Status = RequestStatus.Rejected;
            }

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
        [HttpPut("{id}/return")]
        public async Task<IActionResult> ReturnRequest(int id, [FromQuery] Condition? condition = null)
        {
            var request = await _context.Requests
                .Include(r => r.Equipment)
                .FirstOrDefaultAsync(r => r.RequestId == id);

            if (request == null)
                return NotFound(new { message = "Request not found" });

            request.Status = RequestStatus.Returned;
            request.ReturnedAt = DateTime.UtcNow;

            // Update equipment status to Available
            request.Equipment.Status = EquipmentStatus.Available;

            // Update equipment condition if provided
            if (condition.HasValue)
            {
                request.Equipment.Condition = condition.Value;
            }

            await _context.SaveChangesAsync();
            return Ok(request);
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
