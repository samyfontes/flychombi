// FlightCard.js
import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const FlightCard = ({ flight, onSelect }) => {
    return (
        <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={onSelect}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Vuelo de {flight.flight_origin} a {flight.flight_destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fecha: {flight.flight_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio: ${flight.flight_price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Disponibilidad: {flight.flight_availability}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Seleccionar
                </Button>
            </CardActions>
        </Card>
    );
}

export default FlightCard;
