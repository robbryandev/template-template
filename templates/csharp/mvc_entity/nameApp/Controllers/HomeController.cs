using Microsoft.AspNetCore.Mvc;
using $name.Models;

namespace $name.Controllers
{
  public class HomeController : Controller
  {
    [HttpGet("/")]
    public ActionResult Index() {
      return View();
    }
  }
}