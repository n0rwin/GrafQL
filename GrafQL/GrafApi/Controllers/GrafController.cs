using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GrafApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [Route("api/graf")]
    public class GrafController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get(string query)
        {
            using (var ctxt = new GrafContext())
            {
                var dict = GrafQL.Instance.ExecuteQuery(query);
                return Ok(JsonConvert.SerializeObject(dict));
            }
        }
    }
}
