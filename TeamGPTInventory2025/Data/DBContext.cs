using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Data
{
    public class SchoolInventory : IdentityDbContext<ApplicationUser>
    {
        public SchoolInventory(DbContextOptions<SchoolInventory> options)
            : base(options)
        {
        }

        // Use plural DbSet names to match usages across the codebase
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Request> Requests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // keep any custom configuration here
        }
    }
}