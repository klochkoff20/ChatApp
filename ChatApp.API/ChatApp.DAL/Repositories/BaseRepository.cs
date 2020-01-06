using System.Linq;
using Microsoft.EntityFrameworkCore;
using ChatApp.Core.Abstraction.Repositories;

namespace ChatApp.DAL
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly ChatAppContext _dbContext;

        public BaseRepository(ChatAppContext context)
        {
            _dbContext = context;
        }

        public TEntity GetById(int Id)
        {
            return _dbContext.Set<TEntity>().Find(Id);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsQueryable();
        }

        public void Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
        }

        public void Update(TEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Remove(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }
    }
}
