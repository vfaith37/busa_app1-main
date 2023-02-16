import axios from 'axios';
// import { setupCache } from 'axios-cache-adapter';

// Create a cache adapter with a TTL of 5 minutes
// const cache = setupCache({
//   maxAge: 5 * 60 * 1000,
// });

export default axios.create(
    { baseURL: 'https://code-6z3x.onrender.com/api' , 
    // adapter: cache.adapter,
},
    

    );
