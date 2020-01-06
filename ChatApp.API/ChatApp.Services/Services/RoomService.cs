using System;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using ChatApp.Core.Abstraction;
using ChatApp.Core.Abstraction.Services;
using ChatApp.Core.Dto;
using ChatApp.Core.Entities;

namespace ChatApp.Services
{
    public class RoomService : IRoomService
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public RoomService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ICollection<RoomDto> GetAll()
        {
            var roomList = _unitOfWork.Rooms.GetAll().ToList();
            var roomDtoList = _mapper.Map(roomList, new List<RoomDto>());
            return roomDtoList;
        }

        public RoomDto GetById(int Id)
        {
            var item = _unitOfWork.Rooms.GetById(Id);

            if (item == null)
                throw new Exception();

            var dto = new RoomDto();
            _mapper.Map(item, dto);
            return dto;
        }

        public RoomDto Insert(RoomDto roomDto)
        {
            var room = new Room();
            _mapper.Map(roomDto, room);

            _unitOfWork.Rooms.Insert(room);
            _unitOfWork.Complete();

            return roomDto;
        }

        public void Update(RoomDto roomDto)
        {
            var room = new Room();
            _mapper.Map(roomDto, room);

            _unitOfWork.Rooms.Update(room);
            _unitOfWork.Complete();
        }

        public void Delete(int Id)
        {
            var temp = _unitOfWork.Rooms.GetById(Id);
            _unitOfWork.Rooms.Remove(temp);
            _unitOfWork.Complete();
        }
    }
}
