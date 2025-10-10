using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TeamGPTInventory2025.Models
{
    public class SchoolInventory : IdentityDbContext<ApplicationUser>
    {
        public SchoolInventory(DbContextOptions<SchoolInventory> options) : base(options)
        {
        }

        public DbSet<Equipment> Equipments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Identity
            modelBuilder.Entity<Equipment>().ToTable("Equipment");
        }
    }
}
