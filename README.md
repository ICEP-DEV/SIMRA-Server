# SImra-server

# Server connection
(localdb)\MSSQLLocalDB

# installation/ setup environment
* mvc newtons
* install : Microsoft.AspNetCore.Mvc.NewtonsoftJson

# Enable Cors
public void ConfigureServices(IServiceCollection services)
{
  // Enable CORS
  services.AddCors(c => {
    c.AddPolicy("AllowOrigin", options=> options.AllowAnyOrigin().AllowAnyMethod()
    .AllowAnyHeader());
  });

  //JSON Serializer
  // install : Microsoft.AspNetCore.Mvc.NewtonsoftJson
  // import Newtonsoft.Json.Serialization;
  service.AddControllersWithViews()
  .AddNewtonsoftJson(options =>
  options.SerializerSettings.ReferenceLoopHandling=Newtonsoft
  .Json.ReferenceLoopHandling.Ignore)
  .AddNewtonsoftJson(options.SerializerSettings.ContractResolver
  = new DefaultContractResolver());

  service.AddControllers();
}
