import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

// Configure MercadoPago with your access token
mercadopago.configure({
  access_token: "TEST-6443712233249582-070310-f14729f56558f0395c3be5d3598a0dd8-473949854"
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Server");
});

// Create preference route
app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://flychombi.web.app",
        failure: "https://flychombi.web.app",
        pending: "https://flychombi.web.app",
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences.create(preference);

    res.json({
      id: result.body.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

app.listen(port, () => {
  console.log(`El server esta corriendo en el puerto ${port}`);
});
