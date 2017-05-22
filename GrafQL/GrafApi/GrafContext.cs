using System.Data.Entity;

namespace GrafApi
{
    public class GrafContext : DbContext
    {
        public GrafContext()
            : base(@"Server=DESKTOP-3D501NF\SQLEXPRESS;Database=grafqldb;Trusted_Connection=True;")
        {
        }

        public DbSet<Graf> Grafs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);            
        }
    }
}
