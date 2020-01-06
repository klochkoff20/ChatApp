namespace ChatApp.Core.Entities
{
    public class Room : IEntity<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
