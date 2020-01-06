using System;
using ChatApp.Core.Abstraction.Repositories;

namespace ChatApp.Core.Abstraction
{
    public interface IUnitOfWork : IDisposable
    {
        IRoomRepository Rooms { get; }
       
        int Complete();
    }
}
