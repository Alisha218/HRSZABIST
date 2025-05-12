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



// 40) Employees with location and country details
app.get('/employees/location-country', async (req, res) => {
    try {
        const query = `
            SELECT e.*, l.*, c.country_name 
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 41) Job history with employee details
app.get('/job-history/employee', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, e.email 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 42) Employees with their job history
app.get('/employees/job-history', async (req, res) => {
    try {
        const query = `
            SELECT e.*, jh.start_date, jh.end_date, jh.job_id, jh.department_id 
            FROM employees e
            LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 43) Employees with job history and department names
app.get('/employees/history-department', async (req, res) => {
    try {
        const query = `
            SELECT e.*, jh.*, d.department_name 
            FROM employees e
            LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
            LEFT JOIN departments d ON jh.department_id = d.department_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 44) Employees with job history, department, and location
app.get('/employees/history-dept-location', async (req, res) => {
    try {
        const query = `
            SELECT e.*, jh.*, d.department_name, l.* 
            FROM employees e
            LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
            LEFT JOIN departments d ON jh.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 45) Employees with job history and country names
app.get('/employees/history-country', async (req, res) => {
    try {
        const query = `
            SELECT e.*, jh.*, c.country_name 
            FROM employees e
            LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
            LEFT JOIN departments d ON jh.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
            LEFT JOIN countries c ON l.country_id = c.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 46) Job history with employee and department details
app.get('/job-history/employee-dept', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, d.department_name 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN departments d ON jh.department_id = d.department_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 47) Job history with employee and job details
app.get('/job-history/employee-job', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, j.job_title 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 48) Job history with employee, job, and department
app.get('/job-history/employee-job-dept', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, j.job_title, d.department_name 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 49) Job history with employee, job, and location
app.get('/job-history/employee-job-location', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, j.job_title, l.* 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 50) Job history with employee, job, and country
app.get('/job-history/employee-job-country', async (req, res) => {
    try {
        const query = `
            SELECT jh.*, e.first_name, e.last_name, j.job_title, c.country_name 
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// 51) Regions with countries and locations
app.get('/regions/countries-locations', async (req, res) => {
    try {
        const query = `
            SELECT r.region_name, c.country_name, l.city, l.street_address
            FROM regions r
            JOIN countries c ON r.region_id = c.region_id
            JOIN locations l ON c.country_id = l.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 52) Countries with regions and locations
app.get('/countries/regions-locations', async (req, res) => {
    try {
        const query = `
            SELECT c.country_name, r.region_name, l.city, l.postal_code
            FROM countries c
            JOIN regions r ON c.region_id = r.region_id
            JOIN locations l ON c.country_id = l.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 53) Locations with countries and regions
app.get('/locations/countries-regions', async (req, res) => {
    try {
        const query = `
            SELECT l.*, c.country_name, r.region_name
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 54) Departments with employees and locations
app.get('/departments/employees-locations', async (req, res) => {
    try {
        const query = `
            SELECT d.department_name, e.first_name, e.last_name, l.city
            FROM departments d
            LEFT JOIN employees e ON d.department_id = e.department_id
            JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 55) Employees with departments, locations, and countries
app.get('/employees/dept-location-country', async (req, res) => {
    try {
        const query = `
            SELECT e.*, d.department_name, l.city, c.country_name
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
            LEFT JOIN countries c ON l.country_id = c.country_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 56) Employees with managers, departments, and locations
app.get('/employees/manager-dept-location', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, 
                   m.first_name as manager_first, m.last_name as manager_last,
                   d.department_name, l.city
            FROM employees e
            LEFT JOIN employees m ON e.manager_id = m.employee_id
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 57) Employees with job titles, departments, and locations
app.get('/employees/job-dept-location', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, j.job_title, 
                   d.department_name, l.city
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 58) Employees with job titles, departments, and managers
app.get('/employees/job-dept-manager', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, j.job_title, 
                   d.department_name, 
                   m.first_name as manager_first, m.last_name as manager_last
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 59) Employees with job titles, departments, managers, and locations
app.get('/employees/job-dept-manager-location', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, j.job_title, 
                   d.department_name, 
                   m.first_name as manager_first, m.last_name as manager_last,
                   l.city
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id
            LEFT JOIN locations l ON d.location_id = l.location_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 60) Countries in Region 1
app.get('/countries/region1', async (req, res) => {
    try {
        const query = `
            SELECT country_name 
            FROM countries 
            WHERE region_id = 1
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 61) Departments in cities starting with 'N'
app.get('/departments/city-N', async (req, res) => {
    try {
        const query = `
            SELECT d.department_name, l.city
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city LIKE 'N%'
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 62) Employees in departments managed by employees with commission > 0.15
app.get('/employees/high-commission-managers', async (req, res) => {
    try {
        const query = `
            SELECT e.*
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN employees m ON d.manager_id = m.employee_id
            WHERE m.commission_pct > 0.15
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 63) Job titles of managers
app.get('/jobs/managers', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT j.job_title
            FROM jobs j
            JOIN employees e ON j.job_id = e.job_id
            JOIN departments d ON e.employee_id = d.manager_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 64) Postal codes in Asia region
app.get('/locations/asia-postal', async (req, res) => {
    try {
        const query = `
            SELECT l.postal_code
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
            WHERE r.region_name = 'Asia'
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 65) Departments with employees having below-average commission
app.get('/departments/low-commission', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT d.department_name
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            WHERE e.commission_pct < (SELECT AVG(commission_pct) FROM employees)
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 66) Employees with above-average salary in their department
app.get('/employees/high-salary-dept', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.salary > (
                SELECT AVG(salary) 
                FROM employees 
                WHERE department_id = e.department_id
            )
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 67) Employees without department assignment
app.get('/employees/no-department', async (req, res) => {
    try {
        const query = `
            SELECT employee_id, first_name, last_name
            FROM employees
            WHERE department_id IS NULL
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 68) Employees with multiple job positions
app.get('/employees/multiple-jobs', async (req, res) => {
    try {
        const query = `
            SELECT e.first_name, e.last_name
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            GROUP BY e.employee_id, e.first_name, e.last_name
            HAVING COUNT(*) > 1
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 69) Employee count by department
app.get('/departments/employee-count', async (req, res) => {
    try {
        const query = `
            SELECT d.department_name, COUNT(e.employee_id) as employee_count
            FROM departments d
            LEFT JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_name
            ORDER BY employee_count DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 70) Total salary by job title
app.get('/jobs/total-salary', async (req, res) => {
    try {
        const query = `
            SELECT j.job_title, SUM(e.salary) as total_salary
            FROM jobs j
            JOIN employees e ON j.job_id = e.job_id
            GROUP BY j.job_title
            ORDER BY total_salary DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/employees/toronto', async (req, res) => {
    try {
        const query = `
            SELECT e.employee_id, e.first_name || ' ' || e.last_name as full_name,
                   e.salary, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city = 'Toronto'
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 71) Get the average commission percentage for each department.
app.get('/departments/avg-commission', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, AVG(e.commission_pct) as avg_commission
            FROM departments d JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_name HAVING AVG(e.commission_pct) IS NOT NULL`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 72) Retrieve the maximum salary in each country.
app.get('/countries/max-salary', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, MAX(e.salary) as max_salary
            FROM countries c
            JOIN locations l ON c.country_id = l.country_id
            JOIN departments d ON l.location_id = d.location_id
            JOIN employees e ON d.department_id = e.department_id
            GROUP BY c.country_name`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 73) Display employees who contain a letter z to their first name and also display their last name, department, city, and state province.
app.get('/employees/name-z', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, d.department_name, l.city, l.state_province
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN locations l ON d.location_id = l.location_id
            WHERE e.first_name LIKE '%z%'`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 74) Display the job title, department name, full name (first and last name) of the employee, and starting date for all jobs that started between Jan 1, 1993 and Aug 31, 1997.
app.get('/jobs/history-1993-1997', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, d.department_name, 
                   e.first_name || ' ' || e.last_name as full_name,
                   jh.start_date
            FROM job_history jh
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN departments d ON jh.department_id = d.department_id
            WHERE jh.start_date BETWEEN '1993-01-01' AND '1997-08-31'`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 75) Display the country name, city, and number of departments where at least 2 employees are working.
app.get('/countries/dept-with-employees', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, l.city, COUNT(d.department_id) as dept_count
            FROM countries c
            JOIN locations l ON c.country_id = l.country_id
            JOIN departments d ON l.location_id = d.location_id
            WHERE (SELECT COUNT(*) FROM employees e WHERE e.department_id = d.department_id) >= 2
            GROUP BY c.country_name, l.city`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 76) Display full name (first and last name), job title, and starting and ending date of last jobs for employees who worked without a commission percentage.
app.get('/employees/no-commission-last-job', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name as full_name,
                   j.job_title, jh.start_date, jh.end_date
            FROM employees e
            JOIN (SELECT employee_id, MAX(end_date) as last_end_date FROM job_history GROUP BY employee_id) last_job 
              ON e.employee_id = last_job.employee_id
            JOIN job_history jh ON e.employee_id = jh.employee_id AND last_job.last_end_date = jh.end_date
            JOIN jobs j ON jh.job_id = j.job_id
            WHERE e.commission_pct IS NULL OR e.commission_pct = 0`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 77) Display the full name (first and last name) of the employee with ID and name of the country where they are working.
app.get('/employees/current-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name || ' ' || e.last_name as full_name,
                   c.country_name as country
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 78) Display the name (first name and last name), salary, and department ID for employees who earn the smallest salary of any department.
app.get('/employees/min-dept-salary', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name as full_name,
                   e.salary, e.department_id
            FROM employees e
            WHERE e.salary = (SELECT MIN(salary) FROM employees WHERE department_id = e.department_id)`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 79) Display all information for employees who earn the third highest salary.
app.get('/employees/third-highest-salary', async (req, res) => {
    try {
        const result = await pool.query(`
            WITH ranked_salaries AS (
                SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) as rank FROM employees
            )
            SELECT * FROM ranked_salaries WHERE rank = 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 80) Display employee name (first name and last name), employee ID, and job title for all employees whose department location is Toronto.
app.get('/employees/toronto', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name || ' ' || e.last_name as full_name,
                   e.salary, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city = 'Toronto'`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





app.get('/country',async(req,res)=>{       
    try {
       const result = await pool.query('select * from countries');
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});






