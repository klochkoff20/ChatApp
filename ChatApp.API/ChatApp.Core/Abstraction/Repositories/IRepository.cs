using System.Linq;

namespace ChatApp.Core.Abstraction.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity GetById(int Id);
        IQueryable<TEntity> GetAll();
        void Insert(TEntity Entity);
        void Update(TEntity entity);
        void Remove(TEntity entity);
    }
}
