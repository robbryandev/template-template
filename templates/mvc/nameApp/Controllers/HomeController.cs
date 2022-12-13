using Microsoft.AspNetCore.Mvc;
using $nameApp.Models;

namespace $nameApp.Controllers
{
  public class HomeController : Controller
  {
    [Route("/")]
    public ActionResult Index() {
      return View();
    }
  }
}