using System;
using ChatApp.Core.Abstraction;
using ChatApp.Core.Abstraction.Repositories;

namespace ChatApp.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private ChatAppContext _context;
        private IRoomRepository _roomRepository;

        public UnitOfWork(ChatAppContext context)
        {
            _context = context;
        }
 
        public IRoomRepository Rooms
        { 
            get
            {
                return _roomRepository ??= new RoomRepository(_context);
            }
        }
       
        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
                _context = null;
            }

            GC.SuppressFinalize(this);
        }
    }
}
