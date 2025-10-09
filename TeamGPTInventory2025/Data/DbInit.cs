using TeamGPTInventory2025.Models;

namespace TeamGPTInventory2025.Data
{
    public class DbInit
    {
        public static void Initialize(SchoolInventory context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Equipments.Any())
            {
                return;   // DB has been seeded
            }

            var equipment = new Equipment[]
            {
                new Equipment{Name="Dell Laptop",Type="Laptop",SerialNumber="DL12345",Condition=Condition.Excellent,Status=EquipmentStatus.Available,Location="Room 101",PhotoUrl="https://example.com/photos/dell_laptop.jpg"},
                new Equipment{Name="Epson Projector",Type="Projector",SerialNumber="EP67890",Condition=Condition.Good,Status=EquipmentStatus.UnderRepair,Location="Room 202",PhotoUrl="https://example.com/photos/epson_projector.jpg"},
                new Equipment{Name="HP Desktop",Type="Desktop",SerialNumber="HP54321",Condition=Condition.Fair,Status=EquipmentStatus.Available,Location="Library",PhotoUrl="https://example.com/photos/hp_desktop.jpg"},
                new Equipment{Name="Canon Camera",Type="Camera",SerialNumber="CC98765",Condition=Condition.Damaged,Status=EquipmentStatus.Unavailable,Location="Media Room",PhotoUrl="https://example.com/photos/canon_camera.jpg"}
            };
            foreach (Equipment s in equipment)
            {
                context.Equipments.Add(s);
            }
            context.SaveChanges();

            /*
            var requests = new Request[]
{
     new Request
    {
        EquipmentId = 1,
        RequestedBy = "student1",
        RequestedAt = DateTime.UtcNow.AddDays(-7),
        ApprovedAt = DateTime.UtcNow.AddDays(-6),
        ReturnedAt = DateTime.UtcNow.AddDays(-4),
        Status = RequestStatus.Returned,
        Notes = "Used for math presentation"
    },
    new Request
    {
        EquipmentId = 2,
        RequestedBy = "teacher1",
        RequestedAt = DateTime.UtcNow.AddDays(-5),
        ApprovedAt = DateTime.UtcNow.AddDays(-5),
        Status = RequestStatus.Approved,
        Notes = "Projector needed for class"
    },
    new Request
    {
        EquipmentId = 3,
        RequestedBy = "student2",
        RequestedAt = DateTime.UtcNow.AddDays(-2),
        Status = RequestStatus.Pending,
        Notes = "Requested for lab work"
    },
    new Request
    {
        EquipmentId = 4,
        RequestedBy = "admin1",
        RequestedAt = DateTime.UtcNow.AddDays(-10),
        ApprovedAt = DateTime.UtcNow.AddDays(-9),
        ReturnedAt = DateTime.UtcNow.AddDays(-8),
        Status = RequestStatus.Returned,
        Notes = "Camera used for school event"
    }
};

            foreach (Request r in requests)
            {
                context.Requests.Add(r); // ❗ Увери се, че DbSet е наречен Requests
            }
            context.SaveChanges();
            */


        }
    }
    }
