using ChatApp.Core.Entities;
using ChatApp.Core.Abstraction.Repositories;

namespace ChatApp.DAL
{
    class RoomRepository : BaseRepository<Room>, IRoomRepository
    {
        public RoomRepository(ChatAppContext context) : base(context)
        {
        }

        public ChatAppContext ChatAppContext
        {
            get { return _dbContext as ChatAppContext; }
        }
    }
}