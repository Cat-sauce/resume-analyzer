import cloudinary                           #database for backend
import cloudinary.api                       #interacting with Cloudinary's Admin AP
import cloudinary.uploader                  #uploading assets

cloudinary.config(
    cloud_name='',                          #here upload your cloud name
    api_key='',                             #here upload your api key
    api_secret='',                          #here upload your api secret (confidentil)
    secure=True
)
