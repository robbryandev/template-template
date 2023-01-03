using Microsoft.AspNetCore.Mvc;
using $name.Models;

namespace $name.Controllers
{
  public class HomeController : Controller
  {
    private readonly $nameContext _db;
    public HomeController($nameContext db)
    {
      _db = db;
    }
    
    [HttpGet("/")]
    public ActionResult Index() {
      return View();
    }
  }
}