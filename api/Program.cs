var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:8081", "http://localhost:8080", "https://dev.menzel-fahrzeugtechnik.de", "https://menzel-fahrzeugtechnik.de", "app://.", "http://myIP:8080")
                            .AllowAnyMethod()
                            .AllowAnyMethod()
                            .WithExposedHeaders("content-disposition")
                            .AllowAnyHeader()
                            .AllowCredentials()
                            .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
                      });

});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();


app.MapControllers();

DatabaseService.dbInit();

app.Run();