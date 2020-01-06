using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ChatApp.Core.Dto;
using ChatApp.Core.Abstraction.Services;

namespace ChatApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomController : ControllerBase
    {
        private IRoomService _Service;

        public RoomController(IRoomService service)
        {
            _Service = service;
        }

        [HttpGet]
        public ActionResult<List<RoomDto>> Get()
        {
                return Ok(_Service.GetAll());
        }

        [HttpGet("{Id}")]
        public ActionResult<RoomDto> GetById(int id)
        {
            try
            {
                return _Service.GetById(id);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<RoomDto> Insert([FromBody]RoomDto room)
        {
            try
            {
                _Service.Insert(room);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody]RoomDto room)
        {
            try
            {
                _Service.Update(room);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _Service.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
