using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace TeamGPTInventory2025.Authentication
{
    public class SimplePasswordAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private const string StaticPassword = "authisthemagicwork";

        public SimplePasswordAuthHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Task.FromResult(AuthenticateResult.Fail("Missing Authorization header"));
            }

            var header = Request.Headers["Authorization"].ToString();

            var token = header.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)
                ? header.Substring("Bearer ".Length).Trim()
                : header.Trim();

            if (!string.Equals(token, StaticPassword, StringComparison.Ordinal))
            {
                return Task.FromResult(AuthenticateResult.Fail("Invalid token"));
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, "SimpleUser"),
                new Claim(ClaimTypes.Role, "Admin")
            };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}