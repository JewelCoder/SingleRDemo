using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace singler_server.Services
{
    public class TestService : ITestService
    {
        public List<string> GetRandomValues()
        {
            string str = "abcdefghijklmnopqrstuvwxyz1234567890";
            List<string> list = new List<string>();
            Random random = new Random();
            for (int i = 0; i < 3; i++)
            {
                String s = string.Empty;
                for (int j = 0; j < 7; j++)
                    s += str[random.Next(0, 36)];
                list.Add(s);
            }
            return list;
        }
    }
}
