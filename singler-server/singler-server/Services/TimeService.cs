using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System.Timers;

namespace singler_server.Services
{
    public class TimeService
    {
        Timer Timer;
        IHubContext<CommunicateHub, ISingleRClient> _hubContext;
        public TimeService()
        {
            // 初始化定时器
            Timer = new System.Timers.Timer(1000 * 5);
            Timer.AutoReset = true;
            Timer.Enabled = false;
            Timer.Elapsed += ChangeChatMessage;
            Timer.Elapsed += ChangeBarData;
            _hubContext = ServiceProviderHelper.ServiceProvider.GetService<IHubContext<CommunicateHub, ISingleRClient>>();
        }

        public void StartTimer()
        {
            Timer.Start();
        }

        public void StopTimer()
        {
            Timer.Stop();
            Timer.Close();
        }

        private void ChangeChatMessage(Object source, ElapsedEventArgs e)
        {
            String strs = "abcdefghijkmnpqrstuvwxyz23456789";
            int num = 10;
            Random random = new Random();
            string res = string.Empty;
            for (int i = 0; i < num; i++)
            {
                res += strs[random.Next(1, strs.Length)].ToString();
            }
            res = e.SignalTime.ToString("yyyy-MM-dd HH:mm:ss") + "：" + res;
            _hubContext.Clients.All.ChangeMessage(res);
        }

        private void ChangeBarData(Object source, ElapsedEventArgs e)
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
