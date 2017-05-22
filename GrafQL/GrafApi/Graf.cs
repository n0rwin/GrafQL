using System;

namespace GrafApi
{
    public class Graf
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public string Vid { get; set; }
        public string Description { get; set; }

        public Graf Superior { get; set; }
    }
}
