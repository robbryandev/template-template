using Microsoft.EntityFrameworkCore;

namespace $name.Models
{
    public class $nameContext : DbContext
    {
        public DbSet<Example> Examples { get; set; }
        public $nameContext(DbContextOptions options) : base(options) { }
    }
}