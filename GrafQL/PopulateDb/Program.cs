using GrafQL;
using GrafQL.Domain;
using Newtonsoft.Json.Linq;
using System;
using System.IO;

namespace PopulateDb
{
    class Program
    {
        static void Main(string[] args)
        {
            var resDirectoryPath = @"D:\projects\GrafQL\res";

            var resDirectories = Directory.GetDirectories(resDirectoryPath);

            using (var ctxt = new GrafContext())
            {
                foreach (var resDir in resDirectories)
                {
                    var json = JObject.Parse(File.ReadAllText(resDir + "\\data.json"));

                    var dbEntry = new Graf
                    {
                        Id = Guid.NewGuid(),
                        Name = json.GetValue("name").Value<string>(),
                        Img = json.GetValue("img").Value<string>(),
                        Description = json.GetValue("description").Value<string>()
                    };

                    ctxt.Grafs.Add(dbEntry);
                }

                ctxt.SaveChanges();
            }
        }
    }
}