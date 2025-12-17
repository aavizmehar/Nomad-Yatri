export interface Program {
  programId: number;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  location?: string;
  duration?: string;
  programImages?: string[];
  maxVolunteers?: number;
  volunteersCount?: number;
  
  // Added these missing fields to match your UI and Backend logic
  isActive: boolean; 
  impactHours?: number;
  hostId: number;

  // This matches your Sequelize "include" logic
  Host?: {
    name?: string;
    propertyName?: string;
    hostRating?: number;
    location?: string;
  };
}