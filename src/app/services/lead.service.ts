import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeadData {
  name: string;
  businessName: string;
  suburb: string;
  phone: string;
  website?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  // Free Web3Forms endpoint
  private readonly submitUrl = 'https://web3forms.com/submit';
  
  // Placeholder API Key (to be replaced by the client/user in production)
  private readonly web3FormsAccessKey = 'YOUR_WEB3FORMS_ACCESS_KEY_HERE';

  constructor(private http: HttpClient) {}

  /**
   * Submit lead details to Web3Forms
   * @param data LeadData containing client details
   */
  submitLead(data: LeadData): Observable<any> {
    const payload = {
      access_key: this.web3FormsAccessKey,
      subject: `New Client Lead - ${data.businessName} (${data.suburb})`,
      from_name: 'Yarra Digital Website',
      name: data.name,
      business_name: data.businessName,
      suburb: data.suburb,
      phone: data.phone,
      website: data.website || 'No current website',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.submitUrl, payload, { headers });
  }
}
