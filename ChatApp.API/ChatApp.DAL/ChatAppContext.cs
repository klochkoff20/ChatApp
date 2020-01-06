using Microsoft.EntityFrameworkCore;
using ChatApp.Core.Entities;

namespace ChatApp.DAL
{
    public class ChatAppContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }

        //public ChatAppContext() :base()
        //{
        //}

        public ChatAppContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>(entity =>
            {
                entity.Property(entity => entity.Id).ValueGeneratedOnAdd();
                entity.Property(entity => entity.Name).HasColumnType("NVARCHAR(50)")
                                                      .IsRequired();
                entity.Property(entity => entity.Description).HasColumnType("NVARCHAR(256)");
            });
        }
    }
}
