using System;
using System.Collections.Generic;
using System.Text;

namespace Project.GrateFulDonors.Core.Common
{
    public interface IGrateFulDonorsResponse
    {
        GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary);
        GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message, object data);
        GrateFulDonorsResponse GenerateResponseMessage(string statusCode, string message);
        GrateFulDonorsResponse GenerateResponseMessage(object data);
    }
}
