export interface Contact 
{
    isActive: any;
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface ContactResponse {
    success: boolean;
    contactDetails: Contact[];
}