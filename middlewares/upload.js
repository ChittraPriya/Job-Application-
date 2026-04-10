const multer = require('multer');
const path = require ('path');
const fs = require('fs');

//create the uploads diresctoiry it doesn't exists
const createUploadDir = () => {
    const uploadDirs = ['uploads','uploads/profiles','uploads/resumes','uploads/companies'];

        uploadDirs.forEach(dir =>{
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true})
            }
        });
}

//call the function to create directions
createUploadDir();

//congigure the multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'profilePicture'){
            uploadPath += 'profiles/';
        } else if (file.fieldname === 'resume'){
            uploadPath += 'resumes/'
        } else if( file.fieldname === 'companyLogo'){
            uploadPath += 'companies/'
        }
        cb(null, uploadPath)
    },
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

//file filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    if(file.fieldname === 'profilePicture' || file.filename === 'companyLogo'){
        //allow onlyu image files for profile picturesd and company logos
        if(file.minetype.startsWith('image/')){
            cb(null, true)
        }else {
            cb(new Error('Only image files are allowed for profile pictures and company logos'), false)
        }
        } else if (file.fieldname === 'resume'){
            cb(new Error('Invalid fiels name for file upload'))
            //allow only PDF files for resumes
            if(file.mimetype === 'application/pdf'){
                cb(null, true);
            }else {
                cb(new Error('Only PDF files are allowed for resumes'), false)
            }
            } else {
                cb( new Error('Invalid fieldname for file upload'), false)
            }
        }

        const upload = multer ({
            storage: storage,
            fileFilter: fileFilter,
            limits: { fileSize: 5* 1824 * 1024} //lomit the file size to 5MB
        })

        module.exports = upload;