const express = require('express');
const cors = require('cors');
const pool  = require('./db');
require('dotenv').config();



const app= express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Sucesfully on PORT ${PORT}`);
})


app.get('/',async(req,res)=>{
     try {
        res.json('WELCOME TO HR API');
     }catch(err){
res.status(500).json({Error:err.message});
     }
});



app.get('/emp',async(req,res)=>{       
    try {
       const result = await pool.query('select * from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/totalemployee',async(req,res)=>{       
    try {
       const result = await pool.query('select count(employee_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/totalcountry',async(req,res)=>{       
    try {
       const result = await pool.query('select count(country_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/totalregions',async(req,res)=>{       
    try {
       const result = await pool.query('select count(region_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/totaljobs',async(req,res)=>{       
    try {
       const result = await pool.query('select count(job_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/totallocations',async(req,res)=>{       
    try {
       const result = await pool.query('select count(location_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/totaldepartments',async(req,res)=>{       
    try {
       const result = await pool.query('select count(department_id) from employees');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});













