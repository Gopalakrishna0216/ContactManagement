using Dapper;
using KnilaAssessMent_APIs.Iservices;
using KnilaAssessMent_APIs.Models;
using System.Data;
using System.Reflection;

namespace KnilaAssessMent_APIs.Services
{
    public class ContactServices : IContactService
    {
        private readonly IDbConnection _connection;
        public ContactServices(IDbConnection dbConnection)
        {
            _connection = dbConnection;
        }

        public async Task<object> GetAllContactDtls()
        {
            try
            {
                _connection.Open();
                var parameter = new DynamicParameters();
                var result = await _connection.QueryAsync<ContactViewModel>("[spContacttbl_GET_GetAllContactDtls]", param: null,
                    commandType: CommandType.StoredProcedure);
                return new
                {
                    Success = true,
                    ContactDetails = result
                };
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                _connection.Close();
            }
        }
        public async Task<object> InsertContactDtls(ContactBindModel model)
        {
            try
            {
                _connection.Open();
                var parameter = new DynamicParameters(model);
                var result = await _connection.ExecuteAsync("[spContactTbl_POST_ContactTables]", param: parameter,
                    commandType: CommandType.StoredProcedure);
                if (result != 0)
                {
                    return new
                    {
                        Success = true,
                        RowsAffected = result,
                        Message = "Contact Dtls Added successfully"
                    };
                }
                return new
                {
                    Success = false,
                    RowsAffected = result,
                    Message = "Not added dtls!"
                };
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                _connection.Close();
            }
        }

        public async Task<object> UpdateContactDtls(UpdateBindModel model)
        {
            try
            {
                _connection.Open();
                var parameter = new DynamicParameters(model);
                var result = await _connection.ExecuteAsync("[spContactTbl_UPDATE_ContactTables]", param: parameter,
                    commandType: CommandType.StoredProcedure);
                if (result != 0)
                {
                    return new
                    {
                        Success = true,
                        RowsAffected = result,
                        Message = "Updated successfully"
                    };
                }
                return new
                {
                    Success = false,
                    RowsAffected = result,
                    Message = "Not Updated dtls!"
                };
            }
            catch (Exception)
            {

                throw;
            }
            finally { _connection.Close(); }
        }
        public async Task<object> DeleteContactDtls(long id)
        {
            try
            {
                _connection.Open();
                var parameter = new DynamicParameters();
                parameter.Add("@id", id);
                //parameter.Add("@isActive", isActive);
                var result = await _connection.ExecuteAsync("[spContactTbl_DELETE_DeleteContactById]", param: parameter,
                    commandType: CommandType.StoredProcedure);
                if (result != 0)
                {
                    return new
                    {
                        Success = true,
                        RowsAffected = result,
                        Message = "Deleted successfully"
                    };
                }
                return new
                {
                    Success = false,
                    RowsAffected = result,
                    Message = "Not deleted dtls!"
                };
            }
            catch (Exception)
            {

                throw;
            }
            finally { _connection.Close(); }
        }
    }
}
