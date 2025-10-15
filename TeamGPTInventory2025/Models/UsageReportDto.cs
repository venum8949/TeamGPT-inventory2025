using System;
using System.Collections.Generic;

namespace TeamGPTInventory2025.Models
{
    public class UsageReportDto
    {
        public string TimeRange { get; set; }
        public int TotalRequests { get; set; }
        public int ApprovedRequests { get; set; }
        public int RejectedRequests { get; set; }
        public int PendingRequests { get; set; }

        public List<UsageByTypeDto> UsageByType { get; set; } = new();
        public List<MostBorrowedItemDto> MostBorrowedItems { get; set; } = new();
        public List<ActiveUserDto> ActiveUsers { get; set; } = new();

        // optional
        public double? AverageBorrowDays { get; set; }
        public int OverdueCount { get; set; }
    }

    public class UsageByTypeDto
    {
        public string Type { get; set; }
        public int BorrowCount { get; set; }
        public int TotalCount { get; set; }
        public int Available { get; set; }
        public int InUse { get; set; }
        public int UnderRepair { get; set; }
        public int Retired { get; set; }
    }

    public class MostBorrowedItemDto
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public int BorrowCount { get; set; }
    }

    public class ActiveUserDto
    {
        public int? UserId { get; set; }
        public string Name { get; set; }
        public int BorrowCount { get; set; }
    }
}
