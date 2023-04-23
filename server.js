const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
// Upload Endpoint

app.get('/ping', (req) =>
{
    return "Pong"
});

app.post('/upload', async (req, res) => {
  console.log('Request received')
  if (req.files === null) {
    return  res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  if (file.name.includes('.csv')){
  file.mv(`${__dirname}/snalyzer/public/uploads/data.csv`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/data.csv` });
  });
}else{
  file.mv(`${__dirname}/snalyzer/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });

}
});

app.listen(5000, () => console.log('Server Started...'));