using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;
using static System.Net.WebRequestMethods;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            //Your code here;
            //var result =await _awsService.GetObjectFromName(id, "myBucket");
            var str = string.IsNullOrEmpty(_tempFolder) ? id : $"{_tempFolder?.TrimEnd('/')} {id}";


            //var url = await _awsService.GetStaticUrl(id, "khiljee");
            var url = await _awsService.GetPresignedUrlObject(str, "khiljee");

            return url;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;

            var str = string.IsNullOrEmpty(_tempFolder) ? file.FileName : $"{_tempFolder?.TrimEnd('/')} {file.FileName}";
            string bucket = "khiljee";
            var stream = file.OpenReadStream();
           var result = await _awsService.PutFileToS3(str, stream, bucket );
            if (result)
            {
                return file.FileName;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
           var result= await _awsService.RemoveFileFromS3(id, "khiljee");
            return result;
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
