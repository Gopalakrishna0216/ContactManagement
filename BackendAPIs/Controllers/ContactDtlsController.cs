using KnilaAssessMent_APIs.Iservices;
using KnilaAssessMent_APIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnilaAssessMent_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactDtlsController : ControllerBase
    {
        private readonly IContactService _Service;
        public ContactDtlsController(IContactService service)
        {
            _Service = service;
        }
        [HttpGet("getAll-contact-dtls")]
        public async Task<IActionResult> GetAllContactDtls()
        {
            var result = await _Service.GetAllContactDtls();
            return Ok(result);
        }
        [HttpPost("add-contact-dtls")]
        public async Task<IActionResult> InsertContactDtls(ContactBindModel model)
        {
            var result = await _Service.InsertContactDtls(model);
            return Ok(result);
        }
        [HttpPost("update-contact-dtls")]
        public async Task<IActionResult> UpdateContactDtls(UpdateBindModel model)
        {
            var result = await _Service.UpdateContactDtls(model);
            return Ok(result);
        }
        [HttpPost("delete-contact-dtls")]
        public async Task<IActionResult> UpdateContactDtls([FromQuery] long id)
        {
            var result = await _Service.DeleteContactDtls(id);
            return Ok(result);
        }
    }
}
