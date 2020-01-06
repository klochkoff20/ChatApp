using AutoMapper;
using ChatApp.Core.Dto;
using ChatApp.Core.Entities;

namespace ChatApp.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RoomDto, Room>().ReverseMap();
        }
    }
}
