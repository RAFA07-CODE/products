import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(colors.cyan.bold(`Server is running on port ${port}`));
    console.log(colors.green.bold('Press CTRL + C to stop the server'));
    console.log(colors.yellow.bold('Visit http://localhost:4000/api/products to see the products API'));
    
})