using System;
using System.Collections.Generic;
using System.Text;

namespace Project.GrateFulDonors.Core.Common
{
    public class GrateFulDonorsResponse : IGrateFulDonorsResponse
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Data = dataHoldDictionary;

            return this;
        }

        public GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message, object data)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Data = data;
            return this;
        }

        public GrateFulDonorsResponse GenerateResponseMessage(object data)
        {
            this.Data = data;
            return this;
        }

        public GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            return this;
        }

        public GrateFulDonorsResponse GenerateResponseMessage(object p1, string v, object p2)
        {
            throw new NotImplementedException();
        }
    }
}
