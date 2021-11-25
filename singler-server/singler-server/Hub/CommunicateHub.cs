using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using singler_server.Services;
using Microsoft.Extensions.Logging;

namespace singler_server
{
    public class CommunicateHub : Hub<ISingleRClient>
    {
        private readonly ILogger logger;
        private IServiceProvider _ServiceProvider;
        public CommunicateHub(IServiceProvider serviceProvider, ILogger<CommunicateHub> logger)
        {
            _ServiceProvider = serviceProvider;
            this.logger = logger;
        }

        public Task ReceiveMessage(string msg)
        {
            return Clients.All.ReceiveMessage(msg);
        }

        public override Task OnConnectedAsync()
        {
            var testService = _ServiceProvider.GetService<ITestService>();
            var res = testService.GetRandomValues();
            logger.LogInformation("TestService.GetRandomValues：" + string.Join('，', res));
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public Task ChangeMessage(string msg)
        {
            return Clients.All.ChangeMessage(msg);
        }

        public Task ChangeData(List<int> zaike, List<int> xinru)
        {
            return Clients.All.ChangeData(zaike, xinru);
        }
    }
}
