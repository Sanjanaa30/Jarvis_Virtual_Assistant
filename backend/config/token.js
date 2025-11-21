import jwt from 'jsonwebtoken';

const genToken = async (userId) => {
    // Implementation for generating a token (e.g., JWT) based on userId
    try{
        // Token generation logic here
        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '10d' });
        return token;
    }
    catch(error){
        console.log(error);
    }
}

export default genToken;