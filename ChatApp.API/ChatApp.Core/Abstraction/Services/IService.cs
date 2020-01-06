using System.Collections.Generic;

namespace ChatApp.Core.Abstraction.Services
{
    public interface IService<TEntity> where TEntity : class
    {
        ICollection<TEntity> GetAll();
        public TEntity GetById(int ID);
        public TEntity Insert(TEntity Order);
        public void Update(TEntity Order);
        public void Delete(int Id);
    }
}
