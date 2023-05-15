﻿using Dapper;
using Project.Core.Data;
using Project.GrateFulDonors.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Dapper
{
    public static class DonorRegistrationRepository
    {
        public static async Task<int> SaveDonor(this IRepositoryAsync<UserRegistrationInsertModel> repo, UserRegistrationInsertModel donorSaveModel, string configath, string directoryPath, string baseLink, string PasswordEncrypted)
        {
            using (var connection = repo.GetConnectionFactory().GetConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        DynamicParameters dynamicParametersGeneral = MapToDonorUserDetails(donorSaveModel, PasswordEncrypted);

                        await connection.QueryAsync<UserRegistrationInsertModel>("[Administration].[DonorTypeUserDetailsSave]",
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
                            DynamicParameters dynamicParametersdonor = MapToDonorDetails(donorSaveModel, userID);

                            await connection.QueryAsync<UserRegistrationInsertModel>("[Administration].[SaveDonorDetails]",
                            param: dynamicParametersdonor,
                            transaction: transaction,
                            commandType: CommandType.StoredProcedure);

                            var donorID = dynamicParametersdonor.Get<int>("DonorID");
                            if (donorID < 0)
                            {
                                transaction.Rollback();
                                return donorID;

                            }
                            else
                            {
                                if (donorSaveModel.Image != "")
                                {
                                    var LinkedPath = Path.Combine(configath, directoryPath);
                                    var fileName = "profile_picture";
                                    var uniq = Guid.NewGuid();
                                    var filePath = Path.Combine(LinkedPath, fileName + uniq.ToString() + ".jpg");
                                    var fileLink = baseLink + '/' + directoryPath + '/' + fileName + uniq.ToString() + ".jpg";
                                    string modifiedstream = "";
                                    modifiedstream = Regex.Replace(donorSaveModel.Image, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);

                                    byte[] bytes = Convert.FromBase64String(modifiedstream);

                                    if (!Directory.Exists(LinkedPath))
                                    {
                                        Directory.CreateDirectory(LinkedPath);
                                    }

                                    using (FileStream fs = System.IO.File.Create(filePath))
                                    {
                                        fs.Write(bytes, 0, bytes.Count());
                                    }
                                    DynamicParameters dynamicParametersdocument = MapToUserDocumentDetails(donorSaveModel, filePath, fileLink, userID);

                                    await connection.QueryAsync<UserRegistrationInsertModel>("[Administration].[SaveUserImage]",
                                    param: dynamicParametersdocument,
                                    transaction: transaction,
                                    commandType: CommandType.StoredProcedure);

                                    var userImageID = dynamicParametersdocument.Get<int>("UserImageID");
                                    if (userImageID < 0)
                                    {
                                        transaction.Rollback();
                                        return userImageID;

                                    }
                                }    
                                
                            }
                            transaction.Commit();
                            return userID;
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


        public static DynamicParameters MapToDonorUserDetails(UserRegistrationInsertModel model, string PasswordEncrypted)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            dynamicParameters.Add("UserID", 0, DbType.Int32, ParameterDirection.InputOutput);
            dynamicParameters.Add("UserName", model.FirstName, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("UserType", model.UserTypeID.ToString(), DbType.Int32, ParameterDirection.Input);
            dynamicParameters.Add("Email", model.Email == "" ? null : model.Email, DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("Password", PasswordEncrypted.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("VerifyStatus",1.ToString(), DbType.Int32, ParameterDirection.Input);

            return dynamicParameters;
        }

        public static DynamicParameters MapToDonorDetails(UserRegistrationInsertModel model, int userID)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            dynamicParameters.Add("DonorID", 0.ToString(), DbType.Int32, ParameterDirection.InputOutput);
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

        public static DynamicParameters MapToUserDocumentDetails(UserRegistrationInsertModel model, string filePath, string fileLink, int userID)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("UserImageID", 0.ToString(), DbType.Int32, ParameterDirection.InputOutput);
            dynamicParameters.Add("UserID", userID.ToString(), DbType.Int32, ParameterDirection.Input);
            dynamicParameters.Add("ImageURL", filePath.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("ImageLink", fileLink.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("Image", model.Image.ToString(), DbType.String, ParameterDirection.Input);
            dynamicParameters.Add("DocumentTypeID", 1.ToString(), DbType.Int32, ParameterDirection.Input);

            return dynamicParameters;
        }

    }
}
