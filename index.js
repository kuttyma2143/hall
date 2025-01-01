
const express = require("express");
const bodyParser = require("body-parser");
const { format } = require("date-fns");


const app = express();

app.use(bodyParser.json());

const PORT = 1900

const rooms = [
    {
        roomName: "Auditorium",
        roomId: "01",
        seats: 100,
        amenities: "wifi,projector,AC",
        price: 1500,
    },
    {
        roomName: "Banquet",
        roomId: "02",
        seats: 150,
        amenities: "speaker,projector,AC",
        price: 2000,
    },
    {
        roomName: "Conference ",
        roomId: "03",
        seats: 75,
        amenities: "wifi,projector,AC,tables",
        price: 1250,
    },
];

const bookings = [
    {
      bookingId: 1,
      customerName: "ravi",
      roomId: "K1",
      date: format(new Date("09-12-2024"), "dd-MMM-yyyy"),
      start: "08:00",
      end: "09:00",
      status: "confirmed",
    },
    {
      bookingId: 2,
      customerName: "velan",
      roomId: "R2",
      date: format(new Date("1-14-2025"), "dd-MMM-yyyy"),
      start: "08:00",
      end: "09:00",
      status: "waiting for confirmation",
    },
    {
      bookingId: 3,
      customerName: "raja",
      roomId: "S1",
      date: format(new Date("01-12-2025"), "dd-MMM-yyyy"),
      start: "08:00",
      end: "09:00",
      status: "confirmed",
    },
  ];
  let customers = [
    { name: 'Rahim',
     bookings: [ 
        {
            customer: 'rahim',
            bookingDate: '202500101',
            startTime: '12:00pm',
            endTime: '11:59am',
            bookingID: '3',
            roomId: 'K1',
            status: 'booked',
            booked_On: '1/1/2025'
          }
      ] }
];

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Hall Booking App</h1>")
})
// all rooms details in the postman api
app.get("/rooms", (req, res) => {
    res.send(rooms)

})
// creating new rooms in the postman api

app.post("/createrooms", (req, res) => {
    const { roomName, seats, amenities, price } = req.body;
    const room = { roomName, roomId: rooms.length + 1, seats, amenities, price };
    rooms.push(room);
    res.status(201).json({ message: "room added sucessfully" });

})
//  all booking data views
app.get("/bookings", (req, res) => {
    res.json(bookings);
  });


  app.post("/viewbookings", (req, res) => {
    const { customerName, date, start, end, roomId, status } = req.body;
    const bookingFilter = bookings.find(
      (room) => room.date == date && room.roomId == roomId && room.start == start
    );
    if (bookingFilter) {
      return res.status(404).json({ message: "Room already booked" });
    }
    let roomIdVerify = rooms.map((room) => (room = room.roomId));
    if (!roomIdVerify.includes(roomId)) {
      return res
        .status(404)
        .json({ message: "Requested room N/A, Kinldy check Other rooms" });
    }
    const booking = {
      bookingId: bookings.length + 1,
      customerName,
      date,
      start,
      end,
      roomId,
      status,
    };
    bookings.push(booking);
    res.status(201).json({ message: "booked sucessfully" });
  });
  
  app.get('/customers', (req, res) => {
    const customerBookings = customers.map(customer => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map(booking => {
        const { roomId, bookingDate, startTime, endTime,status } = booking;
        return { name, roomId, bookingDate, startTime, endTime,status };
      });
     
      return customerDetails;
    })
   
    res.json(customerBookings);
  });

app.listen(PORT, () => console.log("server is running on port", PORT)

)