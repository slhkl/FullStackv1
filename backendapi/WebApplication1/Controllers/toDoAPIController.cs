using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Mail;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class toDoAPIController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public toDoAPIController(IConfiguration configuration,IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select toDoID, toDoText, userEMail
                            from
                            dbo.toDoAPI
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(toDoAPI td )
        {
            SendEMail("Yapilacak yeni bir isiniz var!!", td.toDoText, td.userEMail);

            string query = @"
                           insert into dbo.ToDoAPI
                           (toDoText,userEMail)
                    values (@toDoText,@userEMail)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@toDoText", td.toDoText);
                    myCommand.Parameters.AddWithValue("@userEMail", td.userEMail);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Basariyla Eklendi.");
        }


        [HttpPut]
        public JsonResult Put(toDoAPI td)
        {
            string query = @"
                           update dbo.toDoAPI
                           set toDoText= @toDoText,
                            userEMail=@userEMail
                            where toDoID=@toDoID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@toDoID", td.toDoID);
                    myCommand.Parameters.AddWithValue("@toDoText", td.toDoText);
                    myCommand.Parameters.AddWithValue("@userEMail", td.userEMail);
                    SendEMail("Mevcut isinizde bir guncelleme mevcut!!", td.toDoText, td.userEMail);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Basariyla Guncellendi.");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.toDoAPI
                            where toDoID=@ToDoID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@toDoID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Basariyla Silindi.");
        }

        public void SendEMail(string konu, string icerik, string email)
        {
            if (EMailControl(email))
            {
                MailMessage ePosta = new MailMessage();
                ePosta.From = new MailAddress("slhkl.mail@gmail.com");

                ePosta.To.Add(email);

                ePosta.Subject = konu;

                ePosta.Body = icerik;

                SmtpClient smtp = new SmtpClient();

                smtp.Credentials = new System.Net.NetworkCredential("slhkl.mail@gmail.com", "123123saas");
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                object userState = ePosta;

                smtp.SendAsync(ePosta, (object)ePosta);
            }

        }
        public static bool EMailControl(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
