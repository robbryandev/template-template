using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace $name.Models 
{
  public class $nameContext : IdentityDbContext<ApplicationUser>
  {
    // public DbSet<ClassName> ClassNames { get; set; }   CHANGE CLASS NAME!!!

    public $nameContext(DbContextOptions options) : base(options) { } 
  }
}
