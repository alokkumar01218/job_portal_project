import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_CLIENT_NAME, 
  api_key: process.env.CLOUD_CLIENT_APIKEY, 
  api_secret: process.env.CLOUD_CLIENT_SECRET 
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

