import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';

export default function Calculatrice() {
    // les states
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/calculate/', { expression: inputValue });
            setResult(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleButtonClick = (value) => {
        setInputValue(prevValue => prevValue + ' ' + value);
    };

    const clearInput = () => {
        setInputValue('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit}>

                <Card>
                    <Typography variant="h4" >
                        NPI Calculator</Typography>
                    <CardActionArea>

                        <CardMedia
                            component="img"
                            height="140"
                            image="calculatrice.jpg" 
                            alt="Calculator"
                        />
                        <Typography variant="h4" gutterBottom>
                            Result : {result != '' && result} </Typography>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} margin={2}>
                                    <TextField
                                        disabled
                                        label="Enter a value"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                </Grid>

                                <Grid container spacing={1}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value, index) => (
                                        <Grid item xs={4} key={index}>
                                            <Button type="button" variant="contained" color="primary" onClick={() => handleButtonClick(value)}>
                                                {value}
                                            </Button>
                                        </Grid>
                                    ))}

                                    <Grid item xs={4}>
                                        <Button type="button" variant="contained" color="primary" onClick={() => handleButtonClick('/')}>
                                            /
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button type="button" variant="contained" color="primary" onClick={() => handleButtonClick('*')}>
                                            *
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button type="button" variant="contained" color="primary" onClick={() => handleButtonClick('-')}>
                                            -
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button type="button" variant="contained" color="primary" onClick={() => handleButtonClick('+')}>
                                            +
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button type="button" variant="contained" color="primary" onClick={clearInput}>
                                            Clear
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Validate
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </form>
        </div>
    );
}
