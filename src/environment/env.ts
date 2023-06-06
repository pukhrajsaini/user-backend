export interface Environment {
    dbUrl: string;
    jwtSecret?: string;
    jwtExpiresIn?: string;
  }
  
  export function env(): Environment {
    return {
      dbUrl: process.env.DB_URL,
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      
    };
  
  }
  