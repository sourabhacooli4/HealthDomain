using Health.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Health.api
{
    [RoutePrefix("/api/Contact")]
    public class ContactController : ApiController
    {
        HealthCareEntities dbContext = null;

        public ContactController()
        {
            // create instance of an object
            dbContext = new HealthCareEntities();
        }


        #region SaveContact defination
        [ResponseType(typeof(tblcontact))]
        [HttpPost]
        public HttpResponseMessage SaveContact(tblcontact acontact)
        {
            int result = 0;
            try
            {
                dbContext.tblcontacts.Add(acontact);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        #endregion

        #region UpdateContact defination
        [ResponseType(typeof(tblcontact))]
        [HttpPut]
        public HttpResponseMessage UpdateContact(tblcontact acontact)
        {
            int result = 0;
            try
            {
                dbContext.tblcontacts.Attach(acontact);
                dbContext.Entry(acontact).State = EntityState.Modified;
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        #endregion

        #region DeleteContact defination
        [ResponseType(typeof(tblcontact))]
        [HttpDelete]
        public HttpResponseMessage DeleteContact(int ID)
        {
            int result = 0;
            try
            {
                var contact = dbContext.tblcontacts.Where(x => x.ID == ID).FirstOrDefault();
                dbContext.tblcontacts.Attach(contact);
                dbContext.tblcontacts.Remove(contact);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        #endregion

        #region GetContacts defination
        [ResponseType(typeof(tblcontact))]
        [HttpGet]
        public List<tblcontact> GetContacts()
        {
            List<tblcontact> contacts = null;
            try
            {
                contacts = dbContext.tblcontacts.ToList();
            }
            catch (Exception e)
            {
                contacts = null;
            }

            return contacts;
        }
        #endregion
    }
}
