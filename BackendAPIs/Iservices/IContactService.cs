using KnilaAssessMent_APIs.Models;

namespace KnilaAssessMent_APIs.Iservices
{
    public interface IContactService
    {
        Task<object> GetAllContactDtls();
        Task<object> InsertContactDtls(ContactBindModel model);
        Task<object> UpdateContactDtls(UpdateBindModel mode);
        Task<object> DeleteContactDtls(long id);
    }
}
