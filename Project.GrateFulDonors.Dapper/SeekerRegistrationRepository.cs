using Dapper;
using Project.Core.Data;
using Project.GrateFulDonors.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Dapper
{
    public static class SeekerRegistrationRepository
    {
        public static async Task<int> SaveSeeker(this IRepositoryAsync<UserRegistrationInsertModel> repo, UserRegistrationInsertModel donorSaveModel, string configath, string directoryPath, string baseLink, string PasswordEncrypted)
        {
            using (var connection = repo.GetConnectionFactory().GetConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        DynamicParameters dynamicParametersGeneral = MapToSeekerUserDetails(donorSaveModel, PasswordEncrypted);

                        await connection.QueryAsync<UserRegistrationInsertModel>("[Administration].[SeekerTypeUserDetailsSave]",
                        param: dynamicParametersGeneral,
                        transaction: transaction,
                        commandType: CommandType.StoredProcedure);

                        var userID = dynamicParametersGeneral.Get<int>("UserID");

                        if (userID < 0)
                        {
                            transaction.Rollback();
                            return userID;
                        }
                        else
                        {
                            DynamicParameters dynamicParametersSeeker = MapToSeekerDetails(donorSaveModel, userID);

                            await connection.QueryAsync<UserRegistrationInsertModel>("[Administration].[SaveSeekerDetails]",
                            param: dynamicParametersSeeker,
                            transaction: transaction,
                            commandType: CommandType.StoredProcedure);

                            var seekerID = dynamicParametersSeeker.Get<int>("SeekerID");
                            if (seekerID < 0)
                            {
                                transaction.Rollback();
                                return seekerID;

                            }
                            transaction.Commit();
                            return userID;
                            //foreach (var festival in farmerSaveModel.Festival)
                            //{
                            //    DynamicParameters dynamicParametersFestival = MapToFestivalDetails(festival, farmerID, farmerSaveModel);

                            //    await connection.QueryAsync<FarmerCollectonCenterMappingModel>("[FMS].[SaveFarmerFestivalDetails]",
                            //    param: dynamicParametersFestival,
                            //    transaction: transaction,
                            //    commandType: CommandType.StoredProcedure);

                            //    var festivslID = dynamicParametersFestival.Get<int>("Result");
                            //    if (festivslID < 0)
                            //    {
                            //        transaction.Rollback();
                            //        return festivslID;

                            //    }
                            //}
                            //    foreach (var item in farmerSaveModel.FarmerDocumentSaveModels)
                            //    {
                            //        var LinkedPath = Path.Combine(configath, directoryPath);
                            //        var fileName = item.FileName.Remove(item.FileName.Length - 4, 4);
                            //        var uniq = Guid.NewGuid();
                            //        var filePath = Path.Combine(LinkedPath, fileName + uniq.ToString() + ".jpg");
                            //        var fileLink = baseLink + '/' + directoryPath + '/' + fileName + uniq.ToString() + ".jpg";
                            //        string modifiedstream = "";
                            //        int CreatedBy = farmerSaveModel.CreatedBy;
                            //        modifiedstream = Regex.Replace(item.Image, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);

                            //        byte[] bytes = Convert.FromBase64String(modifiedstream);

                            //        if (!Directory.Exists(LinkedPath))
                            //        {
                            //            Directory.CreateDirectory(LinkedPath);
                            //        }

                            //        using (FileStream fs = System.IO.File.Create(filePath))
                            //        {
                            //            fs.Write(bytes, 0, bytes.Count());
                            //        }
                            //        DynamicParameters dynamicParametersdocument = MapToFarmerDocumentDetails(item, filePath, fileLink, CreatedBy, farmerID);

                            //        await connection.QueryAsync<FarmerCollectonCenterMappingModel>("[FMS].[FarmerDocumentSave]",
                            //        param: dynamicParametersdocument,
                            //        transaction: transaction,
                            //        commandType: CommandType.StoredProcedure);

                            //        var farmerDocumentID = dynamicParametersdocument.Get<int>("FarmerDocumentID");
                            //        if (farmerDocumentID < 0)
                            //        {
                            //            transaction.Rollback();
                            //            return farmerDocumentID;

                            //        }
                            //    }
                            //    transaction.Commit();
                            //    return farmerID;
                            //}
                        }
                    }
                    catch (Exception exception)
                    {
                        transaction.Rollback();
                        throw exception;
                    }
                }
            }

        }


        public static DynamicParameters MapToSeekerUserDetails(UserRegistrationInsertModel model, string PasswordEncrypted)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            dynamicParameters.Add("UserID", 0, DbType.Int32, ParameterDirection.InputOutput);
            dynamicParameters.Add("UserName", model.FirstName, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("UserType", model.UserTypeID.ToString(), DbType.Int32, ParameterDirection.Input);
            dynamicParameters.Add("Email", model.Email == "" ? null : model.Email, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("Password", PasswordEncrypted.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("VerifyStatus", 1.ToString(), DbType.Int32, ParameterDirection.Input);

            return dynamicParameters;
        }

        public static DynamicParameters MapToSeekerDetails(UserRegistrationInsertModel model, int userID)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            dynamicParameters.Add("SeekerID", 0.ToString(), DbType.Int32, ParameterDirection.InputOutput);
            dynamicParameters.Add("UserID", userID.ToString(), DbType.Int32, ParameterDirection.Input);
            dynamicParameters.Add("NIC", model.Nic.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("FirstName", model.FirstName, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("LastName", model.LastName, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("Gender", model.Gender, DbType.Int32, ParameterDirection.Input);
            dynamicParameters.Add("DOB", model.Dob, DbType.DateTime, ParameterDirection.Input);
            dynamicParameters.Add("Address", model.Address, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("DonationTypeID", model.DonationTypeID.ToString(), DbType.Int32, ParameterDirection.Input);

            return dynamicParameters;
        }
    }
}
