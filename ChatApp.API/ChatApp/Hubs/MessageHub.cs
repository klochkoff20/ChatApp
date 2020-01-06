using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ChatApp.Models;
using System.Collections.Concurrent;

namespace ChatApp.Hubs
{
    public class MessageHub : Hub
    {
        internal static ConcurrentDictionary<string, int> UserCount = new ConcurrentDictionary<string, int>();

        public async Task SendMessageToAll(Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToGroup(string group, Message message)
        {
            await Clients.Group(group).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }

        public async Task JoinGroup(string group)
        {
            if (UserCount.ContainsKey(group))
                UserCount[group]++;
            else
                UserCount.TryAdd(group, 1);

            await Groups.AddToGroupAsync(Context.ConnectionId, group);
            await Clients.Group(group).SendAsync("UserCount", UserCount[group]);
        }

        public async Task LeaveGroup(string group)
        {
            UserCount[group]--;

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            await Clients.Group(group).SendAsync("UserCount", UserCount[group]);
        }
    }
}
