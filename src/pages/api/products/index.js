import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
   },
};

export default async function handler(req, res) {
  
  await dbConnect();
  

  if (req.method === 'POST') {
    try {
      const form = formidable({
        keepExtensions: true,
        multiples: false,
      });   
      
      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      if (!files.image) {
        return res.status(400).json({ message: 'No image provided' });
      }
      const file = files.image[0];
      const filePath = file.filepath || file.image?.path;
      if (!filePath) throw new Error("File path not found");

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      });

      const product = new Product({
        name: fields.name[0],
        category: fields.category[0],
        description: fields.description[0],
        price: parseFloat(fields.price[0]), // Ensure price is a number
        imageUrl: result.secure_url,
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message || 'Something went wrong' });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 }); // Get all products, newest first
      res.status(200).json(products);
    } catch (error) {
      console.error("Error in /api/products GET:", error);
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
