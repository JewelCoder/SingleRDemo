using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace singler_server
{
    public interface ISingleRClient
    {
        Task ReceiveMessage(string msg);

        Task ChangeMessage(string msg);

        Task ChangeData(List<int> zaike, List<int> xinru);
    }
}
