
export interface UserState {
        firstName: string;
        lastName?: string;
        aboutUs?: string;
        email: string;
        age?: number;
        gender?: 'Male' | 'Female' | 'Others';
        password: string;
        skills?: string[];
        imageUrl?: string;
      
}
