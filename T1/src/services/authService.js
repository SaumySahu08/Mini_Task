import { use } from 'react'
import api from './api'

export const registerUser=(userdata)=>{
    return api.post("/register",userdata)
}

export const login=(userdata)=>{
    return api.post("/auth/login",userdata)
}

// export const getDetails=()=>{
//     api.get("/user",{token:`${localStorage.getItem("token")}`  })
// }

export const getDetails = () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
        // If no token is found, return a rejected promise.
        // The calling component (Dashboard) will catch this.
        console.error("No authentication token found in localStorage.");
        return Promise.reject(new Error("No token found"));
    }

    // Make the GET request, sending the token in the Authorization header
    return api.get("/users", {
        headers: {
            'Authorization': `Bearer ${token}` // Standard Bearer token format
        }
    });
};

export const getProducts = ()=>{
    const token = localStorage.getItem("token"); 

    if (!token) {        
        console.error("No authentication token found in localStorage.");
        return Promise.reject(new Error("No token found"));
    }

    return api.get("/products",{
         headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
};