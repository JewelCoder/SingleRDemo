using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using singler_server.Services;

namespace singler_server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private IServiceProvider _ServiceProvider;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,IServiceProvider serviceProvider)
        {
            _logger = logger;
            _ServiceProvider = serviceProvider;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var weatherForcastService = _ServiceProvider.GetService<IWeatherForecastService>();
            return weatherForcastService.GetForecasts();
        }
    }
}
