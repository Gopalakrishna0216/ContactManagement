import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactResponse } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:7274'; // Replace with your actual API URL
  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/api/ContactDtls/getAll-contact-dtls`);
  }
  addContact(contact: Contact): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/ContactDtls/add-contact-dtls`, contact);
  }
  updateContact(contact: Contact): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/ContactDtls/update-contact-dtls`, contact);
  }
  deleteContact(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.apiUrl}/api/ContactDtls/delete-contact-dtls`,{}, { params });
  }
}
