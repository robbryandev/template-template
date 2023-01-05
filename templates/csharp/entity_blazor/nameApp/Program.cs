using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using $name.Models;
using Microsoft.Extensions.DependencyInjection;

namespace $name
{
  class Program
  {
    static void Main(string[] args)
    {
      WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
      
      builder.Services.AddServerSideBlazor();
      builder.Services.AddControllersWithViews();

      builder.Services.AddDbContext<$nameContext>(
        dbContextOptions => dbContextOptions
        .UseMySql(
            builder.Configuration["ConnectionStrings:DefaultConnection"], ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"])
        )
    );

      WebApplication app = builder.Build();

      app.UseDeveloperExceptionPage();

      app.UseStaticFiles();

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
          endpoints.MapControllerRoute(
              name: "default",
              pattern: "{controller=Home}/{action=Index}/{id?}");
          endpoints.MapBlazorHub();
      });

      app.Run();
    }
  }
}
