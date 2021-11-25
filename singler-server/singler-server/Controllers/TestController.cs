using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using singler_server.Services;

namespace singler_server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> logger;
        private IServiceProvider _ServiceProvider;
        private IHubContext<CommunicateHub, ISingleRClient> _hubContext;
        public TestController(ILogger<TestController> logger, IServiceProvider serviceProvider, IHubContext<CommunicateHub, ISingleRClient> hubContext)
        {
            this.logger = logger;
            _ServiceProvider = serviceProvider;
            _hubContext = hubContext;
        }

        public void GetChangeClientMsg(string msg)
        {
            _hubContext.Clients.All.ChangeMessage(msg);
        }

        public void GetStartTimer()
        {
            var timeservice = _ServiceProvider.GetService<TimeService>();
            timeservice.StartTimer();
        }

        public void GetChangeBarData()
        {
            List<int> zaike = new List<int>();
            List<int> xinru = new List<int>();
            Random random = new Random();
            for (int i = 0; i < 31; i++)
            {
                zaike.Add(random.Next(20, 26));
                xinru.Add(random.Next(0, 4));
            }
            _hubContext.Clients.All.ChangeData(zaike, xinru);
        }
    }
}
