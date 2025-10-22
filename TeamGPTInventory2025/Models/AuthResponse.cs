using System;
using System.Collections.Generic;

namespace TeamGPTInventory2025.Models
{
    public record RegisterResponse(string Message);

    public record LoginResponse(
        string AccessToken,
        DateTime Expires,
        IList<string> Roles
    );
}