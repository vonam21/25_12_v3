const express = require("express");
const mqtt = require('mqtt');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');


const client = mqtt.connect('mqtt://test.mosquitto.org');

var topic_ser
var message_ser = "none none none"
let values = [1,2,3]
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe vào chủ đề 'vonam' khi kết nối thành công
  client.subscribe('vonam', (err) => {
    if (!err) {
      console.log('Subscribed to vonam');
    }
  });
});

client.on('message', (topic, message) => {
    topic_ser = topic
    message_ser = message.toString();
    const mqttMessage = "32.4 27.5 4023"
    values = message_ser.split(' ');

// values sẽ là một mảng chứa các giá trị riêng biệt
    console.log(values);
  console.log(`Received message on topic ${topic}: ${message_ser}`);
});

client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

client.on('error', (err) => {
  console.error('Error:', err);
});

app.listen(3000, () => {
  console.log("This is Nam's web code");
  console.log("Port is 3000");
});

app.get("/", (req, res) => {
  console.log('This is the root');
  res.send('index.ejs');
});

app.get("/nam", (req, res) => {
  console.log('This is Nam');
  const nhietdo = values[0]
  const doam = values[1]
  const adc = values[2]
  res.render("index3.ejs",{nhietdo,doam,adc})
});

app.get("/user/:id/:ho_ten", (req, res) => {
  console.log('This is Nam1');
  const id = req.params.id;
  const ho_ten = req.params.ho_ten;
  res.send(`id is: ${id}, ho_ten is: ${ho_ten}`);
});



