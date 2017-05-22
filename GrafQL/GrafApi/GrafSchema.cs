using GraphQL.Net;
using System;
using System.Linq;

namespace GrafApi
{
    public class GrafQL
    {
        private GrafQL()
        {
        }

        private static GraphQLSchema<GrafContext> _instance;

        public static GraphQL<GrafContext> Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = Build();
                }

                return new GraphQL<GrafContext>(_instance);
            }
        }

        private static GraphQLSchema<GrafContext> Build()
        {
            var schema = GraphQL<GrafContext>.CreateDefaultSchema(() => new GrafContext());
            schema.AddType<Graf>().AddAllFields();

            schema.AddListField("grafs", db => db.Grafs);
            schema.AddField("graf", new { id = Guid.Empty }, (db, args) => db.Grafs.Where(g => g.Id == args.id).FirstOrDefault());

            schema.Complete();

            return schema;
        }
    }
}