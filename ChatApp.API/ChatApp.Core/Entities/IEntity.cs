namespace ChatApp.Core.Entities
{
    public interface IEntity<T>
    {
        public T Id { get; set; }
    }
}
