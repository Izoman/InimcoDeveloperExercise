using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;

namespace InimcoDeveloperExercise.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FullObjectController : ControllerBase
    {
        private readonly ILogger<FullObjectController> _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FullObjectController(ILogger<FullObjectController> logger, IWebHostEnvironment hostEnvironment)
        {
            _logger = logger;
            _hostingEnvironment = hostEnvironment;
        }

        [HttpPost]
        
        public IActionResult SaveFullObjectToFile(FullObject fullObject)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            string path = Path.Combine(contentRootPath, "fullObject.json");

            System.IO.File.WriteAllText(path, fullObject.ToString());
            return Ok(fullObject);
        }

        [HttpGet]
        public IEnumerable<FullObject> Get()
        {
            List<FullObject> list = new List<FullObject>();
            list.Add(new FullObject());
            return list;
        }
    }
}
