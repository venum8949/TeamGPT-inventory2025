using Microsoft.EntityFrameworkCore;
namespace TeamGPTInventory2025.Models

{
    public class SchoolInventory : DbContext
    {
        public SchoolInventory(DbContextOptions<SchoolInventory> options) : base(options)
        {
        }

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Request> Requests { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipment>().ToTable("Equipments");
            modelBuilder.Entity<Request>().ToTable("Requests");

            // ✅ Маркирай Report като keyless модел
            modelBuilder.Entity<Report>().HasNoKey();
        }

    }
}

