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
using System.Net.Mail;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userAPIController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public userAPIController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select userID, userName, userSurName, userEMail, userPassword from
                            dbo.userAPI
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
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
        public JsonResult Post(userAPI uA)
        {
            if (EMailControl(uA.userEMail))
            {
                string query = @"
                           insert into dbo.userAPI
                           values (@userName, @userSurName, @userEMail, @userPassword)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@userName", uA.userName);
                        myCommand.Parameters.AddWithValue("@userSurName", uA.userSurName);
                        myCommand.Parameters.AddWithValue("@userEMail", uA.userEMail);
                        myCommand.Parameters.AddWithValue("@userPassword", uA.userPassword);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Basariyla Eklendi.");
            }
            else
                return new JsonResult("Mevcut ya da hatali bir email girdiniz.");
        }


        [HttpPut]
        public JsonResult Put(userAPI uA)
        {
            string query = @"
                           update dbo.userAPI
                           set userName= @userName, userSurName= @userSurName, userEMail= @userEMail,
                            userPassword= @userPassword
                            where userID=@userID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@userID", uA.userID);
                    myCommand.Parameters.AddWithValue("@userName", uA.userName);
                    myCommand.Parameters.AddWithValue("@userSurName", uA.userSurName);
                    myCommand.Parameters.AddWithValue("@userEMail", uA.userEMail);
                    myCommand.Parameters.AddWithValue("@userPassword", uA.userPassword);
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
                           delete from dbo.userAPI
                            where userID=@userID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@userID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Basariyla Silindi.");
        }

        [HttpPatch]
        public JsonResult Patch(userAPI uA)
        {
            string query = "SELECT *FROM userAPI WHERE userEMail='" + uA.userEMail +
                "' and userPassword='" + uA.userPassword + "'";

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
        public bool EMailControl(string EMail)
        {
            bool control = true;
            string query = @"
                            select * from
                            dbo.userAPI
                            where userEMail=@userEMail
                            ";

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlCommand myCommand = new SqlCommand(query, myCon);
                myCommand.Parameters.AddWithValue("@userEMail", EMail);

                using (var reader = myCommand.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        control = false;
                     
                    }
                }
                myCon.Close();
            }
            try
            {
                MailAddress m = new MailAddress(EMail);
                if(control)
                  control = true;
            }
            catch
            {
                control = false;
            }
            return control;
        }
    
    } 
}
