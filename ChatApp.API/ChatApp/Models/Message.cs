using System;

namespace ChatApp.Models
{
    public class Message
    {
        public string SenderId { get; set; }
        public string NickName { get; set; }
        public bool FromOwner { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
    }
}
